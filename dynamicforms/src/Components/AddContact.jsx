import {
  Button,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import FaxIcon from "@mui/icons-material/Fax";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function AddContact(props) {
  const [contact, setContact] = useState([
    {
      firstName: "",
      lastName: "",
      position: "",
      contactMethods: [
        { contactMethodType: "", code: "", contactDetail: "" },
        { contactMethodType: "", code: "", contactDetail: "" },
      ],
    },
  ]);
  const handleContactChange = (contactIndex, e) => {
    const contactValues = [...contact];
    contactValues[contactIndex][e.target.name] = e.target.value;
    // dispatch({type:"setContact",payload:contactValues})
    setContact(contactValues);
  };
  const handleContactMethodChange = (contactIndex, contactMethodIndex, e) => {
    const contactMethodValues = [...contact[contactIndex].contactMethods];
    contactMethodValues[contactMethodIndex][e.target.name] = e.target.value;
    const newContact = [...contact];
    newContact[contactIndex] = {
      ...newContact[contactIndex],
      contactMethods: contactMethodValues,
    };
    // dispatch({type:"setContact",payload:newContact})
    setContact(newContact);
  };
  let addContactMethod = (contactIndex, contactMethodIndex) => {
    const newContactMethod = [
      ...contact[contactIndex].contactMethods,
      { contactMethodType: "", code: "", contactDetail: "" },
    ];
    const newContact = [...contact];
    newContact[contactIndex] = {
      ...newContact[contactIndex],
      contactMethods: newContactMethod,
    };

    // dispatch({type:"setContact",payload:newContact})
    setContact(newContact);
  };

  let removeContactMethod = (contactIndex, contactMethodIndex) => {
    const newContactMethod = [...contact[contactIndex].contactMethods];
    newContactMethod.splice(contactMethodIndex, 1);
    const newContact = [...contact];
    newContact[contactIndex] = {
      ...newContact[contactIndex],
      contactMethods: newContactMethod,
    };
    //   dispatch({type:"setContact",payload:newContact})
    setContact(newContact);
  };
  const addContactFields=()=>{
    // dispatch({type:"setContact",payload:[...state.contact,{firstName:"",lastName:"",position:"",contactMethods:[{ contactMethodType: "", code : "",contactDetail:""},{ contactMethodType: "", code : "",contactDetail:""}]}]})
    setContact(prev=>[...prev,{firstName:"",lastName:"",position:"",contactMethods:[{ contactMethodType: "", code : "",contactDetail:""},{ contactMethodType: "", code : "",contactDetail:""}]}])       
  }
  return (
    <>
      {contact.map((element, contactIndex) => {
        return (
         
            <Grid container display={"flex"} spacing={2} key={contactIndex}>
              <Grid item sm={12}>
                <FormLabel>
                  <h4>Contact</h4>
                </FormLabel>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  id="firstName"
                  name="firstName"
                  value={element.firstName || ""}
                  label="First Name"
                  onChange={(e) => handleContactChange(contactIndex, e)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  onChange={(e) => handleContactChange(contactIndex, e)}
                  value={element.lastName || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <FormLabel>Position</FormLabel>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  id="position"
                  name="position"
                  value={element.position || ""}
                  label="Position"
                  onChange={(e) => handleContactChange(contactIndex, e)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <FormLabel>Contact Methods</FormLabel>
              </Grid>
              {element.contactMethods.map((element, contactMethodIndex) => {
                return (
                    
                  <Grid item sm={12} key={contactMethodIndex}>
                    <Grid display={"flex"} container spacing={2}>
                      <Grid item sm={2}>
                        <Select
                          labelId="contactMethodType"
                          id="contactMethodType"
                          value={element.contactMethod || ""}
                          onChange={(e) =>
                            handleContactMethodChange(
                              contactIndex,
                              contactMethodIndex,
                              e
                            )
                          }
                          name="contactMethodType"
                          fullWidth
                        >
                          <MenuItem value="phone">
                            <PhoneIphoneIcon />
                          </MenuItem>
                          <MenuItem value="email">
                            <EmailIcon />
                          </MenuItem>
                          <MenuItem value="fax">
                            <FaxIcon />
                          </MenuItem>
                        </Select>
                      </Grid>
                      <Grid item sm={3}>
                        <Select
                          labelId="code"
                          id="code"
                          value={element.code || ""}
                          name="code"
                          onChange={(e) =>
                            handleContactMethodChange(
                              contactIndex,
                              contactMethodIndex,
                              e
                            )
                          }
                          fullWidth
                        >
                          <MenuItem value="home">Home</MenuItem>
                          <MenuItem value="work">Work</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item sm={contactMethodIndex < 2 ? 7 : 6}>
                        <TextField
                          type="text"
                          id="contactDetail"
                          name="contactDetail"
                          value={element.contactDetail || ""}
                          label="username@gmail.com"
                          onChange={(e) =>
                            handleContactMethodChange(
                              contactIndex,
                              contactMethodIndex,
                              e
                            )
                          }
                          variant="outlined"
                          sx={{ p: 0 }}
                          fullWidth
                        />
                      </Grid>
                      {contactMethodIndex > 1 && (
                        <Grid item sm={1} display={"flex"}>
                          <IconButton
                            sx={{ color: "inherit" }}
                            onClick={() =>
                              removeContactMethod(
                                contactIndex,
                                contactMethodIndex
                              )
                            }
                          >
                            <HighlightOffRoundedIcon />
                          </IconButton>
                        </Grid>
                      )}
                      {contactMethodIndex ===
                        contact[contactIndex].contactMethods.length - 1 && (
                        <Grid item sm={12}>
                          <Button
                            onClick={() =>
                              addContactMethod(contactIndex, contactMethodIndex)
                            }
                            sx={{ color: "inherit" }}
                          >
                            + Add Contact Method
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            {contactIndex===contact.length-1&&
            <Grid item sm={12}>
                <Button variant='outlined' color='inherit' onClick={() => addContactFields()} fullWidth>+ Add Contact</Button>
            </Grid>
            }
            </Grid>
            
          
        );
      })}
    </>
  );
}

export default AddContact;
