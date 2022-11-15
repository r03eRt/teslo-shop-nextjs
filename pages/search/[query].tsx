import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}


// Siempre que usamos SSR hay que vovler a rellenar la paginas con los datos que nos vendran
const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


  return (
    <ShopLayout title={'Teslo-shop - Search'} pageDescription={ 'Encuentra los mejores productos tesla aqui'}>
      <Typography variant='h1' component='h1'>Buscar producto</Typography>
      

        {
            foundProducts 
            ? <Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Término: { query }</Typography>
            : (<>
                <Box display={'flex'} flexDirection='row'>
                    <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún producto</Typography>
                    <Typography variant='h2' sx={{ ml: 1 }} color="secondery" textTransform="capitalize">{ query}</Typography>
                </Box>
                
            </>)
            
        }

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

    // TODO: retornar otros productos cuando no se encuentra el término
    const foundProducts = products.length > 0;
    if(!foundProducts) {
        products = await dbProducts.getAllProducts();
    }
    

    return {
        props: {
            products: products,
            foundProducts,
            query
        }
    }
}

export default SearchPage
