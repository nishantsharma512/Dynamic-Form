import { Box, Button, Divider, Drawer, FormLabel, Grid, IconButton, List,  Switch, Tab, Tabs, TextField } from '@mui/material';
import React, { useReducer } from 'react';
import AddIcon from '@mui/icons-material/Add';

import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import AddContact from './AddContact';
function Form(props) {
        const formReducer=(state,action)=>{
          switch(action.type){
            case "showCustomerForm":
              return {...state,showCustomer:!state.showCustomer}
              case "showLocationForm":
                return {...state,showLocation:!state.showLocation}
                case "slideDrawer":
                  return {...state,slide:action.payload}
                  //case "setContact":
                    // return {...state,contact:action.payload}
                    case "setCustomerInfo":
                      return {...state,customerInfo:action.payload}
                      default: throw new Error()
          }
        }
        const [state,dispatch]=useReducer(formReducer,{
          showCustomer:true,
          showLocation:false,
          slide:{right: false},
          // contact:[{firstName:"",lastName:"",position:"",contactMethods:[
          // { contactMethodType: "", code : "",contactDetail:""},
          // { contactMethodType: "", code : "",contactDetail:""}
          // ]}],
          customerInfo:{
            customerName:"",
            streetAddress:"",
            unitNumber:"",
            city:"",
            state:"",
            zipCode:"",
        }
        })

      const handleCustomerTab=()=>{
        dispatch({type:"showCustomerForm"})
        dispatch({type:"showLocationForm"})
        
        // setShowCustomer(true)
        // setShowLocation(false)
      }
      const handleLocationTab=()=>{
        dispatch({type:"showCustomerForm"})
        dispatch({type:"showLocationForm"})
        // setShowLocation(true)
        // setShowCustomer(false)
      }


      const toggleDrawer = (anchor, open) => {
        dispatch({type:"slideDrawer",payload:{
          [anchor]: open
        }})
        // setSlide({ ...slide, [anchor]: open });
      };
      const handleCustomerInfoChange=(e)=>{
        let {name,value}=e.target
        
        dispatch({type:"setCustomerInfo",payload:{
          ...state.customerInfo,[name]:value
        }})
            // setCustomerInfo(prev=>({
            //   ...prev,[name]:value  
            // }))
      }
      
    const handleSubmit=(e)=>{
        e.preventDefault()
      console.log(state.customerInfo)
       
    }
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
      const list = (anchor) => (
        <Box
          sx={{ width: 600  }}
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
            {/* <Tabs >
                <Tab label="Customer" onClick={handleCustomerTab}/>
                <Tab label="Location" onClick={handleLocationTab}/>
            </Tabs>   */}
          <form onSubmit={handleSubmit}>
          {
            state.showCustomer?
          <Grid container spacing={2} sx={{p:2}}> 
            <Grid item xs={12} >
                <TextField id="customerName" name="customerName" label="Customer Name" onChange={handleCustomerInfoChange} variant="outlined" fullWidth required />
            </Grid>
            <Grid item xs={12}>
            <FormLabel >
                <h4>Billing Address</h4>
            </FormLabel>
            </Grid>
            <Grid item  sm={8}>
            <TextField id="streetAddress" name="streetAddress" label="Street Address" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
            </Grid>
            <Grid item sm={4}>
            <TextField id="unitNumber" name='unitNumber' label="Unit Number" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
            </Grid>
 
          <Grid item sm={6}>
          <TextField id="city" name='city' label="City" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
          </Grid>
          <Grid item sm={2}>
          <TextField id="state" name='state' label="State" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
          </Grid>
          <Grid item sm={4}>
          <TextField id="zipCode" name='zipCode' label="Zip Code" onChange={handleCustomerInfoChange} variant="outlined" fullWidth/>
          </Grid>
          
          <Grid item sm={12}>
          
          </Grid>   
          <Grid item sm={12} >
          <AddContact/>
          </Grid>
          
                <Grid item display={'flex'} sm={12} justifyContent={'space-between'}>
                <Grid item>
                    <Button variant='outlined' color={'inherit'} onClick={()=>toggleDrawer("right", false)}>Cancel</Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' type='submit' color={'inherit'}>Create</Button>
                </Grid>
            </Grid>
          </Grid>:state.showLocation&&
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
            <Grid item>

            </Grid>

            <Grid item sm={12}>
                <Button variant='outlined' color={'inherit'} fullWidth>+Add Location Contact</Button>
            </Grid>
            
          </Grid>
          }
          </form>
          </List>
        </Box>
      );
    return (
        <>

            <Button  onClick={()=>toggleDrawer("right", true)} variant="outlined"  startIcon={<AddIcon />}>
                Add New Customer
              </Button>
            
            <Drawer
                BackdropProps={{style:{opacity:2} }}
                anchor="right"
                open={state.slide["right"]}
                onClose={()=>toggleDrawer("right", false)}
                
            >
                {list("right")}
            </Drawer>
            
            
        </>
    );
}

export default Form;