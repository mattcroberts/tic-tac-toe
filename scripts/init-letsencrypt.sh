#!/bin/bash

# Modified from https://github.com/wmnnd/nginx-certbot

domains=( irix.dev www.irix.dev irix.software www.irix.software )

compose_file_path=$1
rsa_key_size=4096
data_path="certbot"
email="hello@irix.dev" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits


if [ -d "$data_path/conf/live/" ]; then
  read -p "Existing data found. Continue and replace existing certificates? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Removing old certificate for all domains (irix.dev) ..."
docker-compose -f $compose_file_path run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/irix.dev && \
  rm -Rf /etc/letsencrypt/archive/irix.dev && \
  rm -Rf /etc/letsencrypt/renewal/irix.dev.conf" certbot
echo


echo "### Creating dummy certificate for all domains (irix.dev) ..."
path="/etc/letsencrypt/live/irix.dev"
mkdir -p "$data_path/conf/live/irix.dev"
docker-compose -f $compose_file_path run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:1024 -days 1\
    -keyout "$path/privkey.pem" \
    -out "$path/fullchain.pem" \
    -subj '/CN=localhost'" certbot
echo

echo "### Starting nginx ..."
docker-compose -f $compose_file_path up --force-recreate -d nginx
echo


echo "### Removing dummy certificate for all domains (irix.dev) ..."
docker-compose -f $compose_file_path run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/irix.dev" certbot
echo


echo "### Requesting Let's Encrypt certificates ..."

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

compose_args="certbot certonly --webroot -w /var/www/certbot $staging_arg $email_arg"

for domain in "${domains[@]}"; do
  compose_args+=" -d $domain"
done

compose_args+=" --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal"

docker-compose -f $compose_file_path run --rm --entrypoint "$compose_args" certbot

echo "### Reloading nginx ..."
docker-compose -f $compose_file_path exec nginx nginx -s reload