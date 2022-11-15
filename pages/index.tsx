import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { initialData } from '../database/products'
import { useProducts } from '../hooks'
import { IProduct } from '../interfaces'


const HomePage: NextPage = () => {

  // fetch de los productos con SWR
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-shop - Home'} pageDescription={ 'Encuentra los mejores productos tesla aqui'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
      {
        isLoading
        ? <h1>Cargando...</h1>
        : <ProductList products={ products } />
      }        
    </ShopLayout>
  )
}

export default HomePage
