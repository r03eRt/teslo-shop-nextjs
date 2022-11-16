import { FC, useEffect, useReducer } from 'react'
import { CartContext, cartReducer } from './'
import { ICartProduct } from '../../interfaces'
import { ProductionQuantityLimits } from '@mui/icons-material'
import Cookie from 'js-cookie';

export interface CartState {
    cart: ICartProduct[]
    children?: React.ReactNode

}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

export const CartProvider:FC<CartState> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);


    //lo primero que hacemos es mirar en las cookies si tenemos cosas en el carrito guardadas y las cargamos desde el localstorage al estado
    useEffect(() => {
        const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!): [];
        dispatch({ type: '[Cart] - LoadCart from storage', payload: cookieProducts })
    }, [])
    




    // cada vez que se actulize el carrito vamos a ejecutar esto
    useEffect(() => {
     Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])
    

    //Funciones publicas  para no hacer dispatch en lso componentes de fuera
    const addProductToCart = (product: ICartProduct) => {
        // casos 

        // existe un producto con el mismo id? si no lo hay lo agrego al carrito, sino lo tendré que sumar +1 al que ya hay
        const productInCart = state.cart.some( p => p._id === product._id) // : bool
        // agrego al carrito
        if(!productInCart) return dispatch({ type: '[Cart] - Update Product in cart', payload: [...state.cart, product]})

        // si existe , comprobamos si es la misma talla para sumar +1, sino añadir como producto nuevo
        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size); // : bool
        if(!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update Product in cart', payload: [...state.cart, product]})

        // el producto existe  y ademas es la misma talla, acumulo entonces
        const updatedProducts = state.cart.map(p => {
            if(p._id !== product._id) return p;
            if(p.size !== product.size) return p;

            //Acrtulizar la cantidad
            p.quantity += product.quantity;            
            return p;
        })

        dispatch({ type: '[Cart] - Update Product in cart', payload: updatedProducts })
    }

    return(
        <CartContext.Provider value={{ 
            ...state,

            //Methods
            addProductToCart,

        }}>
            { children }
        </CartContext.Provider>
    )
}