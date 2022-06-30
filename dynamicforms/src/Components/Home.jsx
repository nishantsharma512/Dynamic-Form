import { Grid } from '@mui/material';
import React from 'react';
import Table from './Table';
import { Box } from '@mui/system';
import Form from './Form/Form';
function Home(props) {
 
    return (
        <>
          <Grid container>
            <Grid item xs={12} >
              <Box display="flex" justifyContent="flex-end">
                <Form/>     
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Table/>
            </Grid>
          </Grid>
        </>
    );
}

export default Home;