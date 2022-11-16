import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge, Input, InputAdornment } from "@mui/material"
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UiContext } from '../../context/ui';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/cart';

export const Navbar = () => {


    //obtenermos datos del cartContext
    const { numberOfItems } = useContext(CartContext);    

    // para saber en que ruta estoy
    const {asPath, push} = useRouter();

    const { toggleSideMenu } = useContext(UiContext)

    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const onSearchTerm = () => {
        if(searchTerm.length === 0) return;
        push(`/search/${searchTerm}`);
    }


  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'> Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }}> Shop </Typography>
                </Link>
            </NextLink>

            {/** todo flex */}

            <Box flex={1}/>

            <Box className="fadeIn" sx={{ display: isSearchVisible ? 'none' :  { xs: 'none', sm: 'block' } }}>
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button color={ asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button color={ asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref>
                    <Link>
                        <Button color={ asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1}/>            

            {
                isSearchVisible 
                ? (
                    <Input
                        sx={{ display:  { xs: 'none', sm: 'flex' } }}
                        className='fadeIn'
                        autoFocus
                        type='text'
                        placeholder="Buscar..."
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm(e.target.value)}
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                        onClick={ () => setIsSearchVisible(false) }                      
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                )
                : (
                    <IconButton 
                        onClick={ () => setIsSearchVisible(true) }
                        className="fadeIn"
                        sx={{ display: { xs: 'none', sm: 'flex'}  }}
                    >
                        <SearchOutlined/>
                    </IconButton>
                )
            }

            
            {/** Pantallas pequeñas */}
            <IconButton
                sx={{ display: { xs: 'flex', sm: 'none'}  }}
                onClick={ toggleSideMenu }
            >
                <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                            <Badge badgeContent={ numberOfItems } color='secondary'>
                                <ShoppingCartOutlined/>
                            </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={ toggleSideMenu }>Menú</Button>

        </Toolbar>
    </AppBar>
  )
}
