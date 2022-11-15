import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'


const SearchPage: NextPage = () => {

  // fetch de los productos con SWR
  const { products, isLoading } = useProducts('/search');

  return (
    <ShopLayout title={'Teslo-shop - Search'} pageDescription={ 'Encuentra los mejores productos tesla aqui'}>
      <Typography variant='h1' component='h1'>Buscar producto</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>ABC --- 123</Typography>
      {
        isLoading
        ? <FullScreenLoading/>
        : <ProductList products={ products } />
      }        
    </ShopLayout>
  )
}

export default SearchPage
