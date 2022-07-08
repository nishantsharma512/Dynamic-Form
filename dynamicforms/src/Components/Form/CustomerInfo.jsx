import { Button, FormLabel, Grid, TextField } from '@mui/material';
import React from 'react';
import AddContact from './AddContact';
import ErrorTypography from "./ErrorTypography"

function CustomerInfo({handleCustomerInfoChange,handleContactChange,handleContactMethodChange,addContactFields,addContactMethod,removeContactField,removeContactMethod,contacts,toggleDrawer,handleSwitchChange,formErrors,inputField,dirty,errors,onBlurHandle,onContactBlur}) {
    return (
        <>
            <Grid container spacing={2} sx={{p:2}}> 
              <Grid item xs={12}>
              <Grid>
                <TextField id="customerName" ref={inputField} name="customerName" label="Customer Name" onChange={handleCustomerInfoChange} onBlur={onBlurHandle}  variant="outlined" fullWidth />
                <span><ErrorTypography errors={dirty["customerName"] && errors["customerName"]?errors["customerName"]:""}></ErrorTypography></span>
                
              </Grid>
              
              </Grid>
              <Grid item xs={12}>
              <FormLabel >
                  <h4>Billing Address</h4>
              </FormLabel>
              </Grid>
              <Grid item  sm={8}>
              <TextField id="streetAddress" ref={inputField} name="streetAddress" label="Street Address" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
              </Grid>
              <Grid item sm={4}>
              <TextField id="unitNumber" name='unitNumber' label="Unit Number" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
              </Grid>
   
            <Grid item sm={6}>
            <TextField id="city" ref={inputField} name='city' label="City" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
            </Grid>
            <Grid item sm={2}>
            <TextField id="state" ref={inputField} name='state' label="State" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
            </Grid>
            <Grid item sm={4}>
            <TextField id="zipCode" ref={inputField} name='zipCode' label="Zip Code" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={12}>
            
            </Grid>
             {/* Add contact Component start */} 
            <Grid item sm={12} >
              <AddContact addContactFields={addContactFields} addContactMethod={addContactMethod} removeContactField={removeContactField} removeContactMethod={removeContactMethod} handleContactChange={handleContactChange} handleContactMethodChange={handleContactMethodChange} contacts={contacts}  handleSwitchChange={handleSwitchChange} formErrors={formErrors} onContactBlur={onContactBlur} dirty={dirty} errors={errors}/>
            </Grid>
            {/* Add contact Component end */} 
            
                  <Grid item display={'flex'} sm={12} justifyContent={'space-between'}>
                  <Grid item>
                      <Button variant='outlined' color={'inherit'} onClick={()=>toggleDrawer("right", false)}>Cancel</Button>
                  </Grid>
                  <Grid item>
                      <Button variant='contained' type='submit' color={'inherit'}>Create</Button>
                  </Grid>
              </Grid>
            </Grid>
        </>
    );
}

export default CustomerInfo;