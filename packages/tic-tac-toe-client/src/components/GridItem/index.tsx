import classnames from "classnames";
import * as React from "react";

import { GridItem as TGridItem } from "../../../typings/types";

import style from "./GridItem.css";

interface IGridItemProps {
    colN: number;
    rowN: number;
    position: {
        top: boolean;
        bottom: boolean;
        left: boolean;
        right: boolean;
    };
    itemState: TGridItem;
    onItemClick: (x: number, y: number) => void;
}

class GridItem extends React.PureComponent<IGridItemProps, any> {
    constructor(props: IGridItemProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    public render() {
        const { position } = this.props;
        return (
            <div
                className={classnames({
                    [style.root]: true,
                    [style.top]: position.top,
                    [style.bottom]: position.bottom,
                    [style.left]: position.left,
                    [style.right]: position.right
                })}
                onClick={this.onClick}
            >
                {this.props.itemState.player}
            </div>
        );
    }
    private onClick() {
        this.props.onItemClick(this.props.colN, this.props.rowN);
    }
}

export default GridItem;
