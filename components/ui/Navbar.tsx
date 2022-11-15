import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge } from "@mui/material"
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UiContext } from '../../context/ui';
import { useContext } from 'react';

export const Navbar = () => {

    // para saber en que ruta estoy
    const router = useRouter();

    const { toggleSideMenu } = useContext(UiContext)

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

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button color={ router.asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button color={ router.asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref>
                    <Link>
                        <Button color={ router.asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1}/>

            {/** todo flex */}

            <IconButton>
                <SearchOutlined/>
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                            <Badge badgeContent={ 2 } color='secondary'>
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
