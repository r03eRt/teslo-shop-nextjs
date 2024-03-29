import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "../../database/seed-data"
import NextLink from 'next/link'
import { ItemCounter } from "../ui"
import { FC, useContext } from "react"
import { CartContext } from "../../context/cart"
import { ICartProduct } from "../../interfaces"
import { currency } from "../../utils"

// const productsInCart = [
//     initialData.products[0],
//     initialData.products[1],
//     initialData.products[2]
// ]

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

    // para obtener estado y ducniones del contexto
    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity(product);
    }

  return (
    <>
        { 
            cart.map( product => (
                <Grid container spacing='2' key={product.slug + product.size} sx={{ mb: 1 }}>
                    <Grid item xs={3}>
                        <NextLink href='`/product/${product.slug}`'>
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={ `/products/${ product.image }`}
                                        component='img'
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ product.title }</Typography>
                            <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography>
                            
                            {
                                editable
                                ? <ItemCounter currentValue={product.quantity} maxValue={10} updatedQuantity={(value) => onNewCartQuantityValue(product, value)}/>
                                : <Typography variant="h4">{product.quantity} {product.quantity > 1 ? 'productos':'producto'}</Typography>
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant="subtitle1">{ `${ currency.format(product.price) }` }</Typography>

                        {
                            editable && (
                                <Button 
                                    variant="text"
                                    color="secondary"
                                    onClick={ () => { removeCartProduct(product) }}
                                >Remover</Button>
                            )                            
                        }                        
                    </Grid>
                </Grid>

            ))
        }
    </>
  )
}