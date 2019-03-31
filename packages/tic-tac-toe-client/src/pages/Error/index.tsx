import * as React from "react";
import style from "./Error.css";

interface IProps {
    message: string;
}
export default class ErrorPage extends React.Component<
    IProps,
    { hasError: boolean }
> {
    private static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    constructor(props: IProps) {
        super(props);
        this.state = { hasError: false };
    }

    public componentDidCatch(error: Error, info: any) {
        console.log(error, info);
    }

    public render() {
        if (this.state.hasError || this.props.message) {
            return (
                <div className={style.root}>
                    <h1>Unfortunately there has been an error</h1>
                    {this.props.message ? (
                        <pre>{this.props.message}</pre>
                    ) : null}
                </div>
            );
        }

        return this.props.children;
    }
}
