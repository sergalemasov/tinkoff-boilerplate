import { RootState } from "@core/store/store";
import {CardsAPI} from "@features/cards/types";

export const getCards = (state: RootState) => state.cards.list as CardsAPI[];
