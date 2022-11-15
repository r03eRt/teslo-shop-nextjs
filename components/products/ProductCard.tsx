import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import NextLink from 'next/link'
import React, { FC, useMemo, useState } from 'react'
import { IProduct } from '../../interfaces'

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    // segun si hacemos hover o no ponemos una imagen u otra
    const productImage = useMemo(() => {
        return isHovered
            ? `/products/${ product.images[1] }`
            : `/products/${ product.images[0] }`
    }, [isHovered, product.images])
    
    return (
        <Grid 
            item 
            xs={6} 
            sm={4} 
            onMouseEnter={ () => setIsHovered(true) } 
            onMouseLeave={ () => setIsHovered(false) }
        >
            <Card>
                {/** Ponemos prefetch a false para que no precarge los 5 productos */}
                <NextLink href='/product/slug' passHref prefetch={ false }>
                    <CardActionArea>
                        <CardMedia
                            className='fadeIn'
                            component='img'
                            image={ productImage }
                            alt={ product.title } 
                            onLoad={() => {
                                setIsImageLoaded(true)
                                console.log('Loaded image')
                            }} />                
                    </CardActionArea>
                </NextLink>
                
            </Card>

            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                <Typography fontWeight={700}>{ product.title }</Typography>
                <Typography fontWeight={500}>{ `${product.price}`}</Typography>
            </Box>
        </Grid>
    ) 
}
