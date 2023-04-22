import { Timestamp } from "firebase/firestore";

export type CardColor = "blue" | "cyan" | "pink" | "dark-blue";

export interface CardsAPI {
  id: string;
  balance: number;
  color: CardColor;
  number: string;
  created: Timestamp;
}
