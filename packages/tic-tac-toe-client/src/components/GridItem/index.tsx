import classnames from "classnames";
import * as React from "react";

import { GridItem as TGridItem, Player } from "../../../typings/types";

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
    itemState: TGridItem;
    isFinished: boolean;
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
                className={classnames(
                    {
                        [style.finished]: this.props.isFinished
                    },
                    {
                        [style.naught]:
                            this.props.itemState.player === Player.NAUGHT,
                        [style.cross]:
                            this.props.itemState.player === Player.CROSS
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
                        getPlayerSymbol(this.props.itemState.player)
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
