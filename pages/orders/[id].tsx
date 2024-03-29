import { Card, CardContent, Divider, Grid, Typography, Box, Link, Chip } from '@mui/material';
import React from 'react'
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout title='Resumen de la orden #12345667' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>Orden: #12345667</Typography>

        <Chip
            sx={{ my:2 }}
            label='Pendiente de Pago'
            variant='outlined'
            color='error'
            icon={<CreditCardOffOutlined/>}
        />

        <Chip
            sx={{ my:2 }}
            label='Orden ya fue pagada'
            variant='outlined'
            color='success'
            icon={<CreditScoreOutlined/>}
        />
        
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
                            <h1>Pagar</h1>

                            <Chip
                                sx={{ my:2 }}
                                label='Orden ya fue pagada'
                                variant='outlined'
                                color='success'
                                icon={<CreditScoreOutlined/>}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage;