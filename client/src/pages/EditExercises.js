import React,{ useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { 
        ListItem,
        List,
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

import ExerciseItem from "components/ExerciseItem/ExerciseItem.js";

const styles = {
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

function EditExercisesPage(){

  const classes = useStyles();

  const [isSubmit, setIsSubmit] = useState(false);
  const [{exercises}, {updateExercises, getExercises}] = useAppState();

  useEffect(()=>{
    getExercises();
  },[]);

  let newExercises = [];
  const numExercises = exercises.length;
  let numCallbacks = 0;

  const handleSubmit = (e)=>{
    e.preventDefault();
    setIsSubmit(true);
  }

  function returnVals(vals){

    numCallbacks++;
    if(Object.keys(vals).length !== 0){

      const idx = exercises.findIndex(exercise=>exercise.id===vals.id);
      for (const key in exercises[idx]) {
        if(exercises[idx][key]!==vals[key] && vals.hasOwnProperty(key)){
          newExercises.push(vals);
          break;
        }
      }
    }

    if(numCallbacks===numExercises){
      setIsSubmit(false);

      if(newExercises.length>0){
        updateExercises(newExercises);
      }
    }
  }

  return(
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Exercises</h4>
              </CardHeader>
              <CardBody>
                <List>
                  {exercises.map((exercise,i)=>{
                    return (
                      <ExerciseItem 
                        key={exercise.id}
                        isSubmit={isSubmit}
                        exercise={exercise}
                        returnVals={returnVals}
                        i={i}
                      />
                    );
                  })}
                </List>
              </CardBody>
              <CardFooter>
                <List>
                  <ListItem>
                    <Button color="primary" type="submit">Edit Exercises</Button>
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

export default EditExercisesPage;