import { ItemType } from "./ItemType";

export interface OrderType {
    id?: number,
    items: ItemType[],
    totalPrice: number,
    note: string
}