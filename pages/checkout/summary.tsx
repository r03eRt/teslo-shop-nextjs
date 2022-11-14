import { Button, Card, CardContent, Divider, Grid, Typography, Box, Link } from '@mui/material';
import React from 'react'
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'

const SummaryPage = () => {
  return (
    <ShopLayout title='Resumen de la orden' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>Resumen de la Orden</Typography>
        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                {/** cartList */}
                <CartList editable={false}></CartList>
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>Editar</Link>
                            </NextLink>
                        </Box>

                        
                        <Typography>Fernando Herrera</Typography>
                        <Typography>3234 En algun luigar</Typography>
                        <Typography>Madrid, Madrid 28041</Typography>
                        <Typography>España</Typography>
                        <Typography>+34 659085824</Typography>

                        <Divider sx={{ my: 1 }} />


                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>Editar</Link>
                            </NextLink>
                        </Box>

                        {/** Order summmary */}
                        <OrderSummary/>

                        <Box sx={{ mt: 3 }}>
                            <Button color='secondary' className='circular-btn' fullWidth>Confirmar Orden </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage;