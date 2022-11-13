import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography> No. productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography> 3 items</Typography>
        </Grid>
        
        <Grid item xs={6}>
            <Typography> Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography> {`$${ 155.6 }`}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography> Impuestos (21%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography> {`$${ 33.5 }`}</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography variant="subtitle1"> Total: </Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
            <Typography variant="subtitle1"> {`$${ 180 }`}</Typography>
        </Grid>
    </Grid> 
  )
}
