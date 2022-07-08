import { Box, Divider, Drawer, FormLabel, Grid, IconButton, List, Tab, Tabs } from '@mui/material';
import React from 'react';
import CustomerInfo from './CustomerInfo';
import CustomerLocationInfo from './CustomerLocationInfo';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
function FormDrawer({toggleDrawer,selectedTab,handleTabChange,handleSubmit,handleCustomerInfoChange,addContactFields,addContactMethod,removeContactField,removeContactMethod,handleContactChange,handleContactMethodChange,contacts,slide,handleSwitchChange,formErrors}) {
    const list = (anchor) => (
        <Box
          sx={{ width: "600px" }}
          role="presentation"
          
        >
          <List>
          
         <Grid display={'flex'} justifyContent={'space-between'} sx={{p:1}} >
              <Grid display={'flex'} justifyItems={"center"}>
                <PersonRoundedIcon/><FormLabel >New Customer</FormLabel>
                </Grid>
                <IconButton onClick={()=>toggleDrawer("right", false)}>
                    <CloseSharpIcon/>
                </IconButton>
            </Grid>
            <Divider/>
            <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Customer" />
                <Tab label="Location" />
            </Tabs>  

            
            <form onSubmit={handleSubmit}>
            {
            selectedTab===0 ?
            
            <CustomerInfo handleCustomerInfoChange={handleCustomerInfoChange} addContactFields={addContactFields} addContactMethod={addContactMethod} removeContactField={removeContactField} removeContactMethod={removeContactMethod} handleContactChange={handleContactChange} handleContactMethodChange={handleContactMethodChange} contacts={contacts} toggleDrawer={toggleDrawer} handleSwitchChange={handleSwitchChange} formErrors={formErrors}/>:
            selectedTab===1 &&
            <CustomerLocationInfo/>
            
            }
            </form>
          
          </List>
        </Box>
      );
    return (
        <>
            <Drawer
                BackdropProps={{style:{opacity:2} }}
                anchor="right"
                open={slide["right"]}
                onClose={()=>toggleDrawer("right", false)}
                
            >
                {list("right")}
            </Drawer>
        </>
    );
}

export default FormDrawer;