import * as React from "react";

import { GridItem as TGridItem } from "../../../typings/types";

import style from "./GridItem.css";

interface IGridItemProps {
    colN: number;
    rowN: number;
    itemState: TGridItem;
    onItemClick: (player: string | null, x: number, y: number) => void;
}

class GridItem extends React.PureComponent<IGridItemProps, any> {
    constructor(props: IGridItemProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    public render() {
        return (
            <div className={style.GridItem} onClick={this.onClick}>
                {this.props.itemState.player}
            </div>
        );
    }
    private onClick() {
        this.props.onItemClick(
            this.props.itemState.player ? this.props.itemState.player : null,
            this.props.colN,
            this.props.rowN
        );
    }
}

export default GridItem;
