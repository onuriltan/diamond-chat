import { IGenre } from "../models/interfaces/music/IGenre";

export class SortService {

    public quickSort = (array: Array<IGenre>, left: number = 0, right: number = array.length - 1) => {
        let index;

        if (array.length > 1) {
            index = this.partition(array, left, right);

            if (left < index - 1) {
                this.quickSort(array, left, index - 1);
            }

            if (index < right) {
                this.quickSort(array, index, right);
            }
        }

        return array.reverse();
    };

    private partition = (array: Array<IGenre>, left: number = 0, right: number = array.length - 1) => {
        const pivot = array[Math.floor((right + left) / 2)];
        let i = left;
        let j = right;

        while (i <= j) {
            while (array[i].count < pivot.count) {
                i++;
            }

            while (array[j].count > pivot.count) {
                j--;
            }

            if (i <= j) {
                [array[i], array[j]] = [array[j], array[i]];
                i++;
                j--;
            }
        }

        return i;
    }

}
