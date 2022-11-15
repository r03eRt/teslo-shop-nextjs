import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useProducts } from '../../hooks'
import { FullScreenLoading } from '../../components/ui'
import { ProductList } from '../../components/products'
import { ShopLayout } from '../../components/layouts'


const WomenPage: NextPage = () => {

  // fetch de los productos con SWR
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout title={'Teslo-shop - Women'} pageDescription={ 'Encuentra los mejores productos tesla aqui'}>
      <Typography variant='h1' component='h1'>Mujeres</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
      {
        isLoading
        ? <FullScreenLoading/>
        : <ProductList products={ products } />
      }        
    </ShopLayout>
  )
}

export default WomenPage
