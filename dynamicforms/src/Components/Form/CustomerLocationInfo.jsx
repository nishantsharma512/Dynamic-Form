import { Button, FormLabel, Grid, Switch } from '@mui/material';
import React from 'react';

function CustomerLocationInfo(props) {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <>
            <Grid container spacing={2} sx={{p:2}}>
              <Grid item sm={12}>
              <Switch {...label} defaultChecked />
              <FormLabel>Same As Billing Address</FormLabel>
              </Grid>
              <Grid item sm={12}>
              <Switch {...label} defaultChecked />
              <FormLabel>Location Purchase Order</FormLabel>
              </Grid>
              <Grid item sm={12}>
              <Switch {...label} defaultChecked />
              <FormLabel>Signature Required</FormLabel>
              </Grid>
              <Grid item>
                  <FormLabel>
                      Location Tags
                  </FormLabel>
              </Grid>
  
              <Grid item sm={12}>
                  <Button variant='outlined' color={'inherit'} fullWidth>+Add Location Contact</Button>
              </Grid>
              
            </Grid>
        </>
    );
}

export default CustomerLocationInfo;