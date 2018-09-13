import { GridItem } from "../typings/types";

export const createGrid = (size: number): GridItem[][] => {
    const result: GridItem[][] = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!result[i]) {
                result[i] = [];
            }
            result[i][j] = {
                id: `${i}_${j}`,
                player: null
            };
        }
    }
    return result;
};
