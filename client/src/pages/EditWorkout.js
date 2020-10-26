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
import {parseDate, createId} from "utils/global";
import useDataWorkout from "utils/useDataWorkout";

import WorkoutExItem from "components/WorkoutExItem/WorkoutExItem.js";
import ExercisePicker from "components/ExercisePicker/ExercisePicker.js";

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

const getFullExercises = (workExs, exs)=>{
  console.log('exs = ', exs);
  const full = workExs.map(workEx=>{
    let idx = exs.findIndex(ex=>ex.id===workEx._id);
    
    return {
      ...workEx,
      ...exs[idx],
      key:createId(10)
    }
  });

  console.log('full = ', full);

  return full;
}

function EditWorkout(){

  const classes = useStyles();

  const {
    isSubmit,
    pickDate,
    workoutExs,
    setWorkoutExs,
    open,
    exercises,
    history,
    RoutNames,
    setIdWorkout,
    handleClickOpen,
    handleClose,
    handleSubmit,
    returnVals,
    dateToString,
    delEx,
    upExercise,
    downExercise
  } = useDataWorkout("update");

  const [{workouts, isLoadedExercises, isLoadedWorkouts}] = useAppState();
  const [isSetDate, setIsSetDate] = useState(false);

  useEffect(()=>{
    if(!isSetDate){
      setIsSetDate(true);
      return;
    }

    if(!isLoadedExercises || !isLoadedWorkouts){
      return;
    }

    const selectWork = workouts.find(work=>parseDate(new Date(work.date))===parseDate(new Date(pickDate)));

    if(!selectWork){
      history.push(`${RoutNames.newWorkout}?date=${pickDate}`);
      return;
    }
    setIdWorkout(selectWork._id);
    setWorkoutExs(getFullExercises(selectWork.exercises, exercises));
    
  },[pickDate, isLoadedExercises, isLoadedWorkouts]);

  return(
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Workout</h4>
              </CardHeader>
              <CardBody>
                <List>
                  <ListItem>
                    <Button color="primary" onClick={handleClickOpen}>Add Exercise</Button>
                  </ListItem>
                </List>
                <ExercisePicker workoutExs={workoutExs} open={open} onClose={handleClose} />
                <List>
                  {workoutExs.map((exercise,i)=>{
                    return (
                      <WorkoutExItem 
                        key={exercise.key}
                        isSubmit={isSubmit}
                        exercise={exercise}
                        returnVals={returnVals}
                        delEx = {delEx}
                        upExercise={upExercise}
                        downExercise={downExercise}
                        i={i}
                      />
                    );
                  })}
                </List>
              </CardBody>
              <CardFooter>
                <List>
                  <ListItem>
                    <Button color="primary" type="submit">Update Workout</Button>
                  </ListItem>
                  <ListItem>
                    <span>on date: {dateToString(pickDate)}</span>
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

export default EditWorkout;