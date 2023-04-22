import {Timestamp} from "firebase/firestore";
import {CardsAPI} from "@features/cards/types";

export enum OperationCategory {
    food = 'food',
    avto = 'avto',
    transfers = 'transfers',
    house = 'house',
    other = 'other',
}

export interface OperationAPI {
    id: string;
    name: string;
    value: number;
    cardId: string;
    created: Timestamp;

    date: string;

    category: OperationCategory;
}

export type OperationWithCard = OperationAPI & {
    card?: CardsAPI;
}
