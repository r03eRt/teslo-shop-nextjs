import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react'
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { initialData } from '../../database/products';
import { useProducts } from '../../hooks';
import { IProduct } from '../../interfaces';

//const product = initialData.products[0];

interface Props {
  product: IProduct
}


export const ProductPage: FC<Props> = ({ product }) => {

  //const router = useRouter();
  // Aqui se puede obtener los datos usando un useEffect, un fetch, axios o como este caso el hook personalizado que hemos hecho con SWR
  //const {products: product, isLoading } = useProducts(`/products/${router.query.slug}`);



  return (
   <ShopLayout title={ product.title } pageDescription={ product.description }>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
        {/** Slideshow */}
        <ProductSlideshow images={ product.images }/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/** Titulos */}
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              {/** Item counter */}
              <ItemCounter/>
              {/** Size selector */}
              <SizeSelector 
                //selectedSize={ product.sizes[2] } 
                sizes={ product.sizes }
              />
            </Box>

            {/** Agregar al carrito */}
            <Button color='secondary' className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponibles" color="error" variant='outlined'></Chip> */}

            {/** Descripcion */}
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2'>Descripcion</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>
            

          </Box>
        </Grid>
      </Grid>
   </ShopLayout>
  )
}

// Con getServerSideProps cada vez que el servidor entre en esta url va a precargar por detras la llamada, no es optimo para cache y temas asi,
// pero es la configuracion mas sencilla de nextjs
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log('Precargando...');
  const { slug = '' } = params as { slug: string };
  // Esta funcion la hemos sacado fuera, pero aqui relamente con axios haríamos la llamda a la api para obtener los datos que necesitasemos
  const product = await dbProducts.getProductBySlug(slug);

  // en caso de fallo redirijo a donde quiera
  if(!product) {
    return {
      destination: '/',
      permanent: false
    }
  }

  return {
    props: {
      product: product
    }
  }
}


export default ProductPage;