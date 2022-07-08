import {Button, Grid} from '@mui/material';
import React, { useEffect, useReducer, useRef } from 'react';
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
                        case "setErrors":
                          return {...state,errors:action.payload}
                          case "setDirty":
                            return {...state,dirty:action.payload}
                            case "setMessage":
                              return {...state,message:action.payload}
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
        errors:{
          customerName:"",
          streetAddress:"",
          city:"",
          state:"",
          zipCode:"",
          contacts:[{firstName:"",lastName:"",position:"",contactMethods:[
            { contactMethodType: "", code : "",contactDetail:"",serviceNotification:false,billingNotification:false},
            { contactMethodType: "", code : "",contactDetail:"",serviceNotification:false,billingNotification:false}
            ]}]
        },
        dirty:{
          customerName:false,
          streetAddress:false,
          city:false,
          state:false,
          zipCode:false,
          contacts:[{firstName:false,lastName:false,position:false,contactMethods:[
            { contactMethodType: false, code : false,contactDetail:false,serviceNotification:false,billingNotification:false},
            { contactMethodType: false, code : false,contactDetail:false,serviceNotification:false,billingNotification:false}
            ]}]
        },
        message:""
        })
        
        const inputField=useRef(null)

        
        const validate=()=>{
          let errorsData={};
          
          if(!state.customerInfo.customerName)
          {
            errorsData.customerName="Please Enter Customer Name"
          }
          dispatch({type:"setErrors",payload:errorsData})
        }
        /* useEffect(validate,[state]) */
        useEffect(validate,[state.customerInfo])
        let isValid=()=>{
          let valid=true;
          for(let error in state.errors){
              if(state.errors[error].length>0){
                  valid=false;
              }
          }
          return valid;
      }

      const onBlurHandle=(event)=>{
        const {name}=event.target;
        dispatch({type:"setDirty",payload:{...state.dirty,[name]:true}})
        /* setDirty((dirty)=>({
            ...dirty,
            [name]:true
        })) */
        validate()
    }

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
        if(isValid()){
       console.log(state)
      }
      else
      {
        const currValue=inputField.current.value;
        if(!currValue){
          Object.keys(state.dirty).forEach((item)=>state.dirty[item]=true)
        }
        dispatch({type:"setMessage",payload:"Please resolve errors in the form"})
      }
        // validate(state.customerInfo)
      // console.log(state.customerInfo,state.contacts)
      
    }
    /* handleSubmit code end */
    const handleTabChange=(e,newValue)=>{
      dispatch({type:"setSelectedTab",payload:newValue})
      
    }
    

    
    return (
        <>
        <Grid container>
          <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>

            <Button  onClick={()=>toggleDrawer("right", true)} variant="outlined"  startIcon={<AddIcon />}>
                Add New Customer
              </Button>
            <FormDrawer selectedTab={state.selectedTab} toggleDrawer={toggleDrawer} handleCustomerInfoChange={handleCustomerInfoChange} handleTabChange={handleTabChange} handleSubmit={handleSubmit} addContactFields={addContactFields} addContactMethod={addContactMethod} removeContactField={removeContactField} removeContactMethod={removeContactMethod} handleContactChange={handleContactChange} handleContactMethodChange={handleContactMethodChange} contacts={state.contacts} slide={state.slide} handleSwitchChange={handleSwitchChange} formErrors={state.formErrors} inputField={inputField} dirty={state.dirty} errors={state.errors} onBlurHandle={onBlurHandle} />
            </Grid>
        </Grid>
        </>
    );
}

export default Form;