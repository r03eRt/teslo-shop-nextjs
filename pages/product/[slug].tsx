import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useContext, useState } from 'react'
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { initialData } from '../../database/seed-data';
import { useProducts } from '../../hooks';
import { ICartProduct, IProduct, ISize } from '../../interfaces';

//const product = initialData.products[0];

interface Props {
  product: IProduct
}


export const ProductPage: FC<Props> = ({ product }) => {
  const router = useRouter();

  // Usamos contenxt para sacar el metodo que hará un dispatch internamente para cambiar ele stado del carrito
  const { addProductToCart } = useContext(CartContext)


  // Aqui se puede obtener los datos usando un useEffect, un fetch, axios o como este caso el hook personalizado que hemos hecho con SWR
  //const {products: product, isLoading } = useProducts(`/products/${router.query.slug}`);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })


  const selectedSize = (size: ISize) => {
    // En las funciones con useState, tenemos acceso a los datos del state, por eso cogemos current product del state y le sumamos el nuevo dato
    // normalmente generaíamos un nuevo dato(temCartProduct) y haríamos un dispatch para rellenar el state, con esto no hace falta.
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size: size
    }))
  }


  const onAddProduct = () => {
    if(!tempCartProduct.size) return;
    // llamar la accion del context para agregar al carrito de estado el carrito actual
    addProductToCart(tempCartProduct)
    router.push('/cart');
  }

  const onUpdatedQuantity = ( newQuantity: number) => {
    // En las funciones con useState, tenemos acceso a los datos del state, por eso cogemos current product del state y le sumamos el nuevo dato
    // normalmente generaíamos un nuevo dato(temCartProduct) y haríamos un dispatch para rellenar el state, con esto no hace falta.
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity: newQuantity
    }))
  }



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
              <ItemCounter
                currentValue={ tempCartProduct.quantity }
                updatedQuantity={ onUpdatedQuantity }
                maxValue={ product.inStock > 10 ? 10 : product.inStock }
              />
              {/** Size selector */}
              <SizeSelector 
                selectedSize={ tempCartProduct.size } 
                sizes={ product.sizes }
                //onSelectedSize={(size) => selectedSize(size)}
                onSelectedSize={ selectedSize }
              />
            </Box>

            {/** Agregar al carrito */}
            {
              (product.inStock > 0 )
              ? (
              <Button 
                color='secondary'
                className='circular-btn'
                onClick={ onAddProduct}

              >
                {
                  tempCartProduct.size ? 'Agregar al carrito' : 'Seleccionar una talla' 
                }                
              </Button>
              )
              : (
                <Chip 
                    color='error' 
                    label="No hay disponibles" 
                    variant="outlined"
                />
              )
            }
            

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


/** Server Side rendering FORMA1 
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
*/




/** 2a Forma generando ficheros estáticos de todos los productos antes */
// snippet nextgetStaticPaths
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
import { GetStaticPaths } from 'next'
import { dbProducts } from '../../database';

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // traemos todos los posibles slugs
  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map(({slug}) => ({
      params: {
        slug
      }
    })),
    //estructura necesaria 
    //paths:    
    // [
    //   {
    //     params: {
          
    //     }
    //   }
    // ],
    fallback: "blocking"
  }
}

// obtener los datos cuando tengo nextgetStaticPaths
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from 'next'
import { log } from 'console';
import { CartContext } from '../../context/cart';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = ''} = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug)

  // si no existe el producto redirigimos
  if(!product) {
    return {
      redirect: '/',
      permanent: false // el dia de mañana puede existir el producto que hoy no está
    }
  }
  return {
    props: {
      product: product
    },
    revalidate: 60 * 60 * 24 // 60 sec * 60 min * 24horas  cada 24h se vuelve a generar los estáticos
  }
}




/** */




export default ProductPage;