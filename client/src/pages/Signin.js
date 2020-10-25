import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { ListItem, TextField, List } from "@material-ui/core";

import { NavLink } from "react-router-dom";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import RoutNames from "../constants/routNames";

import {useAppState} from "state/appState";

import UseValidationForm from "utils/useValidationForm";
import {Login as Validation} from "validation/login";

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

function SigninPage() {
  const classes = useStyles();
  const [state, {signIn}] = useAppState();

  const { handleChange, handleSubmit, values, errors } = UseValidationForm(
    submit,
    { email: '', password: ''},
    Validation
  );

  function submit(e){
    signIn(values);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Sign intro Fit Trainer App</h4>
                <p className={classes.cardCategoryWhite}>Please, enter your email and password</p>
              </CardHeader>
              <CardBody>
                <List>
                  <ListItem>
                    <TextField
                      error={errors.email ? true:false} 
                      onChange={handleChange}
                      name="email"
                      value={values.email}
                      label="Email address"
                      helperText={errors.email} 
                    />
                  </ListItem>
                  <ListItem>
                    <TextField 
                      error={errors.password ? true:false} 
                      onChange={handleChange}
                      name="password"
                      value={values.password}
                      label="Password" 
                      type="password"
                      helperText={errors.password}
                    />
                  </ListItem>
                </List>
                
              </CardBody>
              <CardFooter>
                <List>
                  <ListItem>
                    <Button color="primary" type="submit">Sign in</Button>
                  </ListItem>
                  <ListItem>
                    <NavLink
                      to={RoutNames.registration}
                    >
                    first time user? sign-up
                    </NavLink>
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

export default SigninPage;