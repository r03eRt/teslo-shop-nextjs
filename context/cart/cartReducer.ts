import { CartState } from "./";
import { ICartProduct } from "../../interfaces";


type CartActionType = 
| { type: '[Cart] - LoadCart from storage', payload: ICartProduct[] }
| { type: '[Cart] - Add Product', payload: ICartProduct }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from storage':
            return {
                ...state,
            }
        case '[Cart] - Add Product':
            return {
                ...state,
            }

        default:
            return state;
    }
}