import * as React from "react";
import querystring from "querystring";
import Clipboard from "react-clipboard.js";
import Button, { Size } from "../Button";
import style from "./Share.css";

import copyToClipboard from "../../assets/icons/001-paper.svg";
import facebook from "../../assets/icons/002-facebook.svg";
import messenger from "../../assets/icons/003-messenger.svg";
import whatsapp from "../../assets/icons/004-whatsapp.svg";
import email from "../../assets/icons/005-message.svg";

interface IProps {
    title: string;
    url: string;
}

interface IState {
    active: boolean;
    native: boolean;
}

interface IHrefFuncArgs {
    shareUrl: string;
    text: string;
}

const links = {
    facebook: {
        icon: facebook,
        href: ({ shareUrl, text }: IHrefFuncArgs) =>
            `https://facebook.com/sharer/sharer.php?${new URLSearchParams({
                u: shareUrl,
                quote: text
            }).toString()}`
    },
    whatsapp: {
        icon: whatsapp,
        href: ({ shareUrl, text }: IHrefFuncArgs) =>
            `https://api.whatsapp.com/send?${querystring.stringify({
                text: text + "\n\n" + shareUrl
            })}`
    },
    messenger: {
        icon: messenger,
        href: ({ shareUrl, text }: IHrefFuncArgs) =>
            `https://facebook.com/dialog/send?${new URLSearchParams({
                link: shareUrl,
                app_id: 576699156169689,
                redirect_uri: shareUrl
            }).toString()}`
    },
    email: {
        icon: email,
        href: ({ shareUrl, text }: IHrefFuncArgs) =>
            `mailto:?${querystring.stringify({
                subject: text,
                body: text + "\n\n" + shareUrl
            })}`
    },
    copyToClipboard: {
        icon: copyToClipboard
    }
};

export default class Share extends React.Component<IProps, IState> {
    public state = {
        active: false,
        native: !!navigator.share
    };

    constructor(props: IProps) {
        super(props);
        this.toggleActive = this.toggleActive.bind(this);
        this.renderNativeShare = this.renderNativeShare.bind(this);
        this.onShareButtonClick = this.onShareButtonClick.bind(this);
    }

    public render() {
        if (this.state.active) {
            return this.state.native
                ? this.renderNativeShare()
                : this.renderFallbackShare();
        } else {
            return (
                <Button
                    size={Size.SMALL}
                    className={style.inviteButton}
                    onClick={this.toggleActive}
                >
                    Invite
                </Button>
            );
        }
    }

    private renderNativeShare() {
        navigator.share({
            title: this.props.title,
            text: this.props.title,
            url: this.props.url
        });

        this.toggleActive();
        return null;
    }

    private renderFallbackShare() {
        return (
            <div className={style.shareIconContainer}>
                <span>Invite another player with</span>
                {Object.entries(links).map(([key, link]) => {
                    if (key === "copyToClipboard") {
                        return (
                            <Clipboard
                                className={style.shareButton}
                                key={key}
                                onClick={() => false}
                                data-clipboard-text={this.props.url}
                            >
                                <img
                                    className={style.shareIcon}
                                    src={link.icon}
                                />
                            </Clipboard>
                        );
                    }

                    return (
                        <button
                            className={style.shareButton}
                            key={key}
                            onClick={() => this.onShareButtonClick(link)}
                        >
                            <img className={style.shareIcon} src={link.icon} />
                        </button>
                    );
                })}
            </div>
        );
    }

    private onShareButtonClick(link) {
        const href = link.href({
            shareUrl: this.props.url,
            text: this.props.title
        });

        window.open(href);
        this.toggleActive();
    }

    private toggleActive() {
        this.setState(state => ({
            ...state,
            active: !state.active
        }));
    }
}
