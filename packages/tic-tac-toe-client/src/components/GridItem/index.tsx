import classnames from "classnames";
import * as React from "react";

import {
    GridItem as IGridItem,
    Symbol as ISymbol
} from "../../../typings/types";

import style from "./GridItem.css";
import getPlayerSymbol from "../../utils/playerMap";

interface IGridItemProps {
    colN: number;
    rowN: number;
    position: {
        top: boolean;
        bottom: boolean;
        left: boolean;
        right: boolean;
    };
    itemState: IGridItem;
    isFinished: boolean;
    onItemClick: (x: number, y: number) => void;
}

class GridItem extends React.PureComponent<IGridItemProps, any> {
    constructor(props: IGridItemProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    public render() {
        const {
            position,
            itemState: { player }
        } = this.props;

        return (
            <div
                className={classnames(
                    {
                        [style.finished]: this.props.isFinished
                    },
                    {
                        [style.naught]:
                            player && player.symbol === ISymbol.NAUGHT,
                        [style.cross]: player && player.symbol === ISymbol.CROSS
                    },
                    {
                        [style.root]: true,
                        [style.top]: position.top,
                        [style.bottom]: position.bottom,
                        [style.left]: position.left,
                        [style.right]: position.right
                    }
                )}
                onClick={this.onClick}
            >
                <span>
                    {this.props.itemState.player ? (
                        getPlayerSymbol(this.props.itemState.player.symbol)
                    ) : (
                        <>&nbsp;</>
                    )}
                </span>
            </div>
        );
    }
    private onClick() {
        this.props.onItemClick(this.props.colN, this.props.rowN);
    }
}

export default GridItem;
