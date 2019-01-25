import GridItem from '../src/models/GridItem';

export const newGrid = () =>
    [...new Array<GridItem>(9)].map(
        (_, i) => new GridItem(Math.floor(i / 3), i % 3)
    );
