import { CartState } from "./";
import { ICartProduct } from "../../interfaces";


type CartActionType = 
| { type: '[Cart] - LoadCart from storage', payload: ICartProduct[] }
| { type: '[Cart] - Update Product in cart', payload: ICartProduct[] }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from storage':
            return {
                ...state,
                cart: [...action.payload]
            }
        case '[Cart] - Update Product in cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        default:
            return state;
    }
}