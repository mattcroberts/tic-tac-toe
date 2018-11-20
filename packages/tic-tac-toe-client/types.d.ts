declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.css";
declare module "*.graphql";

declare var process: {
    env: {
        API_URI?: string;
        WS_URI: string;
    };
};
