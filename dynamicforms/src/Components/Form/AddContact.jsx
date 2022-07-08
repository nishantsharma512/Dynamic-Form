import {Button,FormLabel,Grid,IconButton,MenuItem,Select,Switch,TextField,} from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import FaxIcon from "@mui/icons-material/Fax";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function AddContact({addContactFields,addContactMethod,removeContactField,removeContactMethod,handleContactChange,handleContactMethodChange,contacts,handleSwitchChange}) {

  
  const label = { inputProps: { 'aria-label': 'controlled' } };
  return (
    <>
    {/* contact field code start */}
      {contacts.map((contact, contactIndex) => {
        return (
         
            <Grid container key={contactIndex} display={"flex"} spacing={2} >
              <Grid display={'flex'} item sm={12}>
              <Grid container>
                <Grid item display={'flex'} sm={12}> 
                <FormLabel>
                  <h4>Contact</h4>
                </FormLabel>
                {/* Remove contact field button code start */}
                {contactIndex > 0 && (
                        <Grid item display={"flex"}>
                          <IconButton sx={{ color: "inherit" }}
                            onClick={() =>
                              removeContactField(contactIndex)}>
                            <HighlightOffRoundedIcon />
                          </IconButton>
                        </Grid>
                      )}
                {/* Remove contact field button code end */}
                </Grid>
              </Grid>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  id="firstName"
                  name="firstName"
                  value={contact.firstName || ""}
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
                  value={contact.lastName || ""}
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
                  value={contact.position || ""}
                  label="Position"
                  onChange={(e) => handleContactChange(contactIndex, e)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <FormLabel>Contact Methods</FormLabel>
              </Grid>

              {/* contact method fields code start */}
              {contact.contactMethods.map((contactMethod, contactMethodIndex) => {
                
                return (
                      
                  <Grid item sm={12} key={contactMethodIndex}>
                    <Grid display={"flex"} container spacing={2}>
                      <Grid item sm={2}>
                        <Select
                          labelId="contactMethodType"
                          id="contactMethodType"
                          value={contactMethod.contactMethodType || ""}
                          onChange={(e) =>
                            handleContactMethodChange(
                              contactIndex,
                              contactMethodIndex,
                              e)}
                          name="contactMethodType"
                          fullWidth>

                          <MenuItem value="phone"><PhoneIphoneIcon /></MenuItem>
                          <MenuItem value="email"><EmailIcon /></MenuItem>
                          <MenuItem value="fax"><FaxIcon /></MenuItem>
                        </Select>
                      </Grid>
                      <Grid item sm={3}>
                        <Select
                          labelId="code"
                          id="code"
                          value={contactMethod.code || ""}
                          name="code"
                          onChange={(e) =>
                            handleContactMethodChange(
                              contactIndex,
                              contactMethodIndex,
                              e)}
                          fullWidth>
                          <MenuItem value="home">Home</MenuItem>
                          <MenuItem value="work">Work</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item sm={contactMethodIndex < 2 ? 7 : 6}>
                        <TextField
                          type={contactMethod.contactMethodType==="phone"?"number":contactMethod.contactMethodType==="email"?"email":contactMethod.contactMethodType==="fax"?"number":""}
                          id="contactDetail"
                          name="contactDetail"
                          value={contactMethod.contactDetail || ""}
                          label={contactMethod.contactMethodType==="phone"?"Contact No.":contactMethod.contactMethodType==="email"?"username@gmail.com":contactMethod.contactMethodType==="fax"&&"Fax no."}
                          onChange={(e) =>
                            handleContactMethodChange(
                              contactIndex,
                              contactMethodIndex,
                              e)}
                          variant="outlined"
                          sx={{ p: 0 }}
                          fullWidth/>
                      </Grid>
                      {/* contact method remove button start */}
                      {contactMethodIndex > 1 && (
                        <Grid item sm={1} display={"flex"}>
                          <IconButton
                            sx={{ color: "inherit" }}
                            onClick={() =>
                              removeContactMethod(
                                contactIndex,
                                contactMethodIndex)}>
                            <HighlightOffRoundedIcon />
                          </IconButton>
                        </Grid>
                      )}
                      {/* contact method remove button end */}

              {/* Code for notification when contact method type is phone start*/}
                      {contactMethod.contactMethodType==='phone'&&
                    <Grid display={'flex'} item sm={12}>
                    <Grid>
                        <Switch {...label} checked={contactMethod.serviceNotification} name='serviceNotification' onChange={(e)=>handleSwitchChange(contactIndex,contactMethodIndex,e)} />
                        <FormLabel>Service Notification</FormLabel>
                    </Grid>
                  </Grid>
                  }
                {/* Code for notification when contact method type is phone End*/}

              {/* Code for notification when contact method type is Email start*/}
                  {contactMethod.contactMethodType==='email'&&
                    <Grid display={'flex'} item sm={12}>
                    <Grid>
                        <Switch  {...label} name='serviceNotification'   checked={contactMethod.serviceNotification} onChange={(e)=>handleSwitchChange(contactIndex,contactMethodIndex,e)} 
                         />
                        <FormLabel>Service Notification</FormLabel>
                    </Grid>
                    <Grid>
                        <Switch {...label} name='billingNotification' checked={contactMethod.billingNotification} onChange={(e)=>handleSwitchChange(contactIndex,contactMethodIndex,e)}/>
                        <FormLabel>Billing Notification</FormLabel>
                    </Grid>                  
                  </Grid>
                  }
                  {/* Code for notification when contact method type is Email end*/}

                  {/* Button for adding contact method start */}
                  {contactMethodIndex ===
                        contacts[contactIndex].contactMethods.length - 1 && (
                        <Grid item sm={12}>
                          <Button
                            onClick={() =>
                              addContactMethod(contactIndex, contactMethodIndex)
                            }
                            sx={{ color: "inherit" }}>
                            + Add Contact Method
                          </Button>
                        </Grid>
                      )}
                      {/* Button for adding contact method start */}
                    </Grid>
                  </Grid>
                );
              })}

            {/* contact method fields code end */}

            {/* Add contact method fields code start */}
            {contactIndex===contacts.length-1&&
            <Grid item sm={12}>
                <Button variant='outlined' color='inherit' onClick={() => addContactFields()} fullWidth>+ Add Contact</Button>
            </Grid>}
            {/* Add contact method fields code end */}
            </Grid>
        );
      })}
      {/* contact field code end */}
    </>
  );
}

export default AddContact;
