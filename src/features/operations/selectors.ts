import { RootState } from "@core/store/store";
import {OperationWithCard} from "@features/operations/types";

export const getOperations = (state: RootState) => state.operations.list;

export const getOperationsWithCards = (state: RootState): Array<OperationWithCard> => {
    return state.operations.list.map((op) => {
        return {
            ...op,
            card: state.cards.list.find(c => c.id === op.cardId),
        }
    })
}
