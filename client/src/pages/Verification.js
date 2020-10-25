import React, { useEffect } from "react";

import {useLocation} from "react-router-dom";
import { getUrlParams } from "utils/global";

import { makeStyles } from "@material-ui/core/styles";
import { ListItem, TextField, List } from "@material-ui/core";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import UseValidationForm from "utils/useValidationForm";
import {Verification as Validation} from "validation/verificationCode";

import { useAppState } from "state/appState";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

function VeryficationPage(){
  const classes = useStyles();

  const [state, { verifyEmail }] = useAppState();

  const location = useLocation();

  const {email = '', code = ''} = getUrlParams(location);

  const { handleChange, handleSubmit, values, errors, setErrors } = UseValidationForm(
    submit,
    { email, verificationCode:code},
    Validation
  );

  useEffect(()=>{
    setErrors(Validation({email, verificationCode:code}));
  },[]);

  function submit(e){
    verifyEmail(values);
  }

  return(
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Email verification to finish registration with Fit Trainer App</h4>
                <p className={classes.cardCategoryWhite}>Please, confirm Email address</p>
              </CardHeader>
              <CardBody>
                <List>
                  <ListItem>
                    <TextField
                      disabled
                      error={errors.email ? true:false} 
                      name="email"
                      value={values.email}
                      label="Email address"
                      helperText={errors.email} 
                    />
                  </ListItem>
                  <ListItem>
                    <TextField 
                      error={errors.verificationCode ? true:false} 
                      name="verificationCode"
                      onChange={handleChange}
                      value={values.verificationCode}
                      label="Verification Code" 
                      helperText={errors.verificationCode}
                    />
                  </ListItem>
                </List>
                
              </CardBody>
              <CardFooter>
                <List>
                  <ListItem>
                    <Button color="primary" type="submit">Verify email</Button>
                  </ListItem>
                </List>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default VeryficationPage;