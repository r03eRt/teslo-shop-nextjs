import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'

interface Props {
    products: IProduct[];
}


// Siempre que usamos SSR hay que vovler a rellenar la paginas con los datos que nos vendran
const SearchPage: NextPage<Props> = ({ products }) => {


  return (
    <ShopLayout title={'Teslo-shop - Search'} pageDescription={ 'Encuentra los mejores productos tesla aqui'}>
      <Typography variant='h1' component='h1'>Buscar producto</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>ABC --- 123</Typography>
      <ProductList products={ products } />      
    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

export const getServerSideProps: GetServerSideProps = async ({ params })=> {
    
    const { query = ''} = params as { query: string }

    // Como estamos en el backed y es nuestro propio en lugar de realizar una busqueda aqui de nuevo con axios, creamos una funcion
    // auxiliar para que relice la busqueda en la base de datos

    if(query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    let products = await dbProducts.getProductByTerm(query);

    // TODO: retornar otros productos

    return {
        props: {
            products: products
        }
    }
}

export default SearchPage
