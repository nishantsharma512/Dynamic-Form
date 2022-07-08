import {Button, Grid} from '@mui/material';
import React, { useEffect, useReducer } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FormDrawer from './FormDrawer';
function Form(props) {
        const formReducer=(state,action)=>{
          switch(action.type){
            case "showCustomerForm":
              return {...state,showCustomer:!state.showCustomer}
              case "showLocationForm":
                return {...state,showLocation:!state.showLocation}
                case "slideDrawer":
                  return {...state,slide:action.payload}
                  case "setContact":
                    return {...state,contacts:action.payload}
                    case "setCustomerInfo":
                      return {...state,customerInfo:action.payload}
                      case "setSelectedTab":
                        return {...state,selectedTab:action.payload}
                        case "setFormErrors":
                          return {...state,formErrors:action.payload}
                          case "setIsSubmit":
                            return{...state,isSubmit:!state.isSubmit}
                      default: return state
          }
        }
        const [state,dispatch]=useReducer(formReducer,{
          showCustomer:true,
          showLocation:false,
          slide:{right: false},
          contacts:[{firstName:"",lastName:"",position:"",contactMethods:[
          { contactMethodType: "", code : "",contactDetail:"",serviceNotification:false,billingNotification:false},
          { contactMethodType: "", code : "",contactDetail:"",serviceNotification:false,billingNotification:false}
          ]}],
          customerInfo:{
            customerName:"",
            streetAddress:"",
            unitNumber:"",
            city:"",
            state:"",
            zipCode:"",
        },
        selectedTab:0,
        formErrors:{},
        isSubmit:false
        })
        
      const toggleDrawer = (anchor, open) => {
        dispatch({type:"slideDrawer",payload:{
          [anchor]: open
        }})
        // setSlide({ ...slide, [anchor]: open });
      };

    const handleSwitchChange=(contactIndex,contactMethodIndex,e)=>{
      const newContactMethods=[...state.contacts[contactIndex].contactMethods]
      newContactMethods[contactMethodIndex][e.target.name]=e.target.checked;

      const newContact = [...state.contacts];
      newContact[contactIndex] = {
        ...newContact[contactIndex],
        contactMethods: newContactMethods,
      };

      dispatch({type:"setContact",payload:newContact})
      
    }

          /* handleChange for contact method fields start */
    const handleContactMethodChange = (contactIndex, contactMethodIndex, e) => {
      const contactMethodValues = [...state.contacts[contactIndex].contactMethods];
      contactMethodValues[contactMethodIndex][e.target.name] = e.target.value;
      const newContact = [...state.contacts];
        newContact[contactIndex] = {
          ...newContact[contactIndex],
          contactMethods: contactMethodValues,
        };
      dispatch({type:"setContact",payload:newContact})
    };
    /* handleChange for contact method fields end */
  
    /* function adding contact method fields start */
    const addContactMethod = (contactIndex, contactMethodIndex) => {
      const newContactMethod = [...state.contacts[contactIndex].contactMethods,
        { contactMethodType: "", code: "", contactDetail: "",serviceNotification:false,billingNotification:false }];
      const newContact = [...state.contacts];
      newContact[contactIndex] = {...newContact[contactIndex],
        contactMethods: newContactMethod};
      dispatch({type:"setContact",payload:newContact})
      
    };
    /* function adding contact method fields end */
  
    /* function for removing contact methods start */
    const removeContactMethod = (contactIndex, contactMethodIndex) => {
      const newContactMethod = [...state.contacts[contactIndex].contactMethods];
      newContactMethod.splice(contactMethodIndex, 1);
      const newContact = [...state.contacts];
      newContact[contactIndex] = {
        ...newContact[contactIndex],
        contactMethods: newContactMethod,
      };
      dispatch({type:"setContact",payload:newContact})
    };
    /* function for removing contact methods end */
  
    /* Method for adding con  tact fields start */
    const addContactFields=()=>{
      // setContact(prev=>[...prev,{firstName:"",lastName:"",position:"",contactMethods:[{ contactMethodType: "", code : "",contactDetail:""},{ contactMethodType: "", code : "",contactDetail:""}]}])       
      const newContact=[...state.contacts,{firstName:"",lastName:"",position:"",contactMethods:[{ contactMethodType: "", code : "",contactDetail:"",serviceNotification:false,billingNotification:false},{ contactMethodType: "", code : "",contactDetail:"",serviceNotification:false,billingNotification:false  }]}]
      dispatch({type:'setContact',payload:newContact})

    }
  /* Method for adding contact fields end */
  
  /* Method for removing contact field start */
    const removeContactField=(contactIndex)=>{
      const newContact=[...state.contacts]
      newContact.splice(contactIndex,1)
      dispatch({type:'setContact',payload:newContact})
    }
    /* Method for removing contact field end  */

      const handleCustomerInfoChange=(e)=>{
        let {name,value}=e.target
        
        dispatch({type:"setCustomerInfo",payload:{
          ...state.customerInfo,[name]:value
        }})
            // setCustomerInfo(prev=>({
            //   ...prev,[name]:value  
            // }))
      }
      
        /* handleChange for contact fields start */
  const handleContactChange = (contactIndex, e) => {
    const contactValues = [...state.contacts];
    contactValues[contactIndex][e.target.name] = e.target.value;
    dispatch({type:"setContact",payload:contactValues})
    
  };
  /* handleChange for contact fields end */

  /* handleSubmit code start */
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch({type:"setFormErrors",payload:validate(state.customerInfo)})
        dispatch({type:"isSubmit"})
        // validate(state.customerInfo)
      // console.log(state.customerInfo,state.contacts)
      
    }
    /* handleSubmit code end */
    const handleTabChange=(e,newValue)=>{
      dispatch({type:"setSelectedTab",payload:newValue})
      
    }
    

    useEffect(()=>{
      console.log(state.formErrors)
        if(Object.keys(state.formErrors).length===0 && state.isSubmit)
        {
          console.log(state.customerInfo)
        }
    },[state.formErrors,state.customerInfo,state.isSubmit])


    const validate=(values)=>{
      const errors={}
      if(!values.customerName)
      {
        errors.customerName="Customer name is required!"
      }
      if(!values.streetAddress)
      {
        errors.streetAddress="Street Address is required!"
      }
      if(!values.city)
      {
        errors.city="City name is required!"
      }
      if(!values.state)
      {
        errors.state="Required!"
      }
      if(!values.zipCode)
      {
        errors.zipCode="Required!"
      }
      return errors
     }
    return (
        <>
        <Grid container>
          <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>

            <Button  onClick={()=>toggleDrawer("right", true)} variant="outlined"  startIcon={<AddIcon />}>
                Add New Customer
              </Button>
            <FormDrawer selectedTab={state.selectedTab} toggleDrawer={toggleDrawer} handleCustomerInfoChange={handleCustomerInfoChange} handleTabChange={handleTabChange} handleSubmit={handleSubmit} addContactFields={addContactFields} addContactMethod={addContactMethod} removeContactField={removeContactField} removeContactMethod={removeContactMethod} handleContactChange={handleContactChange} handleContactMethodChange={handleContactMethodChange} contacts={state.contacts} slide={state.slide} handleSwitchChange={handleSwitchChange} formErrors={state.formErrors} />
            </Grid>
        </Grid>
        </>
    );
}

export default Form;