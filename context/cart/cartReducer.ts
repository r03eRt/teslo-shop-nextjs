import { CartState } from "./";
import { ICartProduct } from "../../interfaces";


type CartActionType = 
| { type: '[Cart] - LoadCart from storage', payload: ICartProduct[] }
| { type: '[Cart] - Update Product in cart', payload: ICartProduct[] }
| { type: '[Cart] - Change cart quantity', payload: ICartProduct }
| { type: '[Cart] - Remove product in cart', payload: ICartProduct }


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
        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map( product => {
                    if(product._id !== action.payload._id) return product;
                    if(product.size !== action.payload.size) return product;
                    return action.payload;
                })
            }
        case '[Cart] - Remove product in cart':
            return {
                ...state,
                //cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size))
                cart: state.cart.filter(product => {
                    if(product._id === action.payload._id && product.size === action.payload.size) {
                        return false
                    }
                    return true;
                })
            }

        default:
            return state;
    }
}