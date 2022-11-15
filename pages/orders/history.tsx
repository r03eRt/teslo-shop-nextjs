import { Chip, Grid, Link, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import NextLink from 'next/link'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        width: 150,
        description: 'muestra informacion sobre si la orden está pagada',
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                ? <Chip color="success" label="Pagada" variant="outlined"/>
                : <Chip color="error" label="No Pagada" variant="outlined"/>
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 150,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
                </NextLink>
            )
        }
    }
];

const rows = [
    { id: 1, paid: true, fullName: 'Fernando Herrera'},
    { id: 2, paid: false, fullName: 'Fernando Herrera1'},
    { id: 3, paid: false, fullName: 'Fernando Herrera2'},
    { id: 4, paid: true, fullName: 'Fernando Herrera3'},
    { id: 5, paid: true, fullName: 'Fernando Herrera4'},
    { id: 6, paid: true, fullName: 'Fernando Herrera5'},

]


const HistoryPage = () => {
    return (
        <ShopLayout title={'Historial de Ordenes'} pageDescription={'Historial de Ordenes del cliente'}>
            <Typography variant='h1' component={'h1'}></Typography>
            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    >

                    </DataGrid>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default HistoryPage