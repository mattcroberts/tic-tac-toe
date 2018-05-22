import * as React from "react";

import "./GridItem.css";

export interface IItemState {
    player: string;
}
interface IGridItemProps {
    colN: number;
    rowN: number;
    itemState: IItemState;
    onItemClick: (player: string, x: number, y: number) => void;
}

class GridItem extends React.PureComponent<IGridItemProps, any> {
    constructor(props: IGridItemProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    public render() {
        return (
            <div className="GridItem" onClick={this.onClick}>
                {this.props.itemState.player}
            </div>
        );
    }
    private onClick() {
        this.props.onItemClick(
            this.props.itemState.player,
            this.props.colN,
            this.props.rowN
        );
    }
}

export default GridItem;
