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

import WorkoutExItem from "components/WorkoutExItem/WorkoutExItem.js";

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

function NewWorkoutPage(){

  const classes = useStyles();

  const [isSubmit, setIsSubmit] = useState(false);
  const [workoutExs, setWorkoutExs] = useState([
    {
      id:'dawdawd',
      name:'ex1',
      measureType:'Kilograms'
    },
    {
      id:'ddawddawd',
      name:'ex2',
      measureType:'Meters'
    }
  ]);
  const [{exercises}, {updateExercises, getExercises}] = useAppState();

  useEffect(()=>{
    getExercises();
  },[]);

  // let newExercises = [];
  // const numExercises = exercises.length;
  // let numCallbacks = 0;

  const handleSubmit = (e)=>{
    e.preventDefault();
    //setIsSubmit(true);
  }

  function returnVals(vals){

  }

  return(
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>New Workout</h4>
              </CardHeader>
              <CardBody>
                <List>
                  <ListItem>
                    <Button color="primary">Add Exercise</Button>
                  </ListItem>
                </List>
                <List>
                  {workoutExs.map((exercise,i)=>{
                    return (
                      <WorkoutExItem 
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
                    <Button color="primary" type="submit">Create Workout</Button>
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

export default NewWorkoutPage;