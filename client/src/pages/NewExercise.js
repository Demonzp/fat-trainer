import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { 
        ListItem, 
        TextField, 
        List, 
        FormControl, 
        InputLabel, 
        Select, 
        MenuItem, 
        FormHelperText,
} from "@material-ui/core";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {useAppState} from "state/appState";

import UseValidationForm from "utils/useValidationForm";
import {Exercise as Validation} from "validation/exercise";

import {measurementTypes} from "constants/selectMeasurement";

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
  },
  formControl: {
    minWidth: 200,
  },
};
  
const useStyles = makeStyles(styles);

function NewExercisePage(){

  const classes = useStyles();

  const [state, {createExercise}] = useAppState();

  const { handleChange, handleSubmit, values, errors } = UseValidationForm(
    submit,
    { name: '', measureType: ''},
    Validation
  );

  function submit(e){
    createExercise(values);
  }

  return(
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create new exercise</h4>
                <p className={classes.cardCategoryWhite}>Please, add a new exercise name and measurement type</p>
              </CardHeader>
              <CardBody>
                <List>
                  <ListItem>
                    <TextField
                      error={errors.name ? true:false} 
                      onChange={handleChange}
                      name="name"
                      value={values.name}
                      label="Exercise Name"
                      helperText={errors.name} 
                    />
                  </ListItem>
                  <ListItem>
                    <FormControl className={classes.formControl} error={errors.measureType ? true:false}>
                      <InputLabel id="demo-simple-select-disabled-label">Measurement type</InputLabel>
                      <Select
                        labelId="demo-simple-select-disabled-label"
                        id="demo-simple-select-disabled"
                        name="measureType"
                        value={values.measureType}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {measurementTypes.map((prop)=>{
                          return <MenuItem value={prop} key={prop}>{prop}</MenuItem>
                        })}
                      </Select>
                      <FormHelperText>{errors.measureType}</FormHelperText>
                    </FormControl>
                  </ListItem>
                </List>
                
              </CardBody>
              <CardFooter>
                <List>
                  <ListItem>
                    <Button color="primary" type="submit">Create Exercise</Button>
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

export default NewExercisePage;