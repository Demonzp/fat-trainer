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
import {useLocation} from "react-router-dom";
import { getUrlParams } from "utils/global";

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

let zIndex = 0;

function NewWorkoutPage(){

  const classes = useStyles();
  const location = useLocation();
  const {date=null} = getUrlParams(location);

  const [isSubmit, setIsSubmit] = useState(false);
  const [pickDate, setPickDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [workoutExs, setWorkoutExs] = useState([]);

  const handleClose = (idEx) => {
    setOpen(false);
    if(!idEx){
      return;
    }
    const ex = {
      ...exercises.find(ex=>ex.id===idEx),
      repeats:1,
      measurment:1,
      zIndex
    };

    zIndex++;

    const newExs = [
      ...workoutExs,
      ex
    ];

    setWorkoutExs(newExs);
  };

  const [{exercises}, {getExercises, createWorkout}] = useAppState();

  useEffect(()=>{
    getExercises();
    if(date){
      let d = new Date(date);
      setPickDate(new Date(d.setHours(d.getHours()+12)));
    }
  },[]);

  let newWorkoutEx = [];
  const numWorkoutEx = workoutExs.length;
  let numCallbacks = 0;
  let numErrs = 0;

  const handleSubmit = (e)=>{
    e.preventDefault();
    setIsSubmit(true);
  }

  function returnVals(vals,errs){
    numCallbacks++;

    if(errs){
      numErrs++;
    }

    if(Object.keys(vals).length !== 0){
      const idx = workoutExs.findIndex(exercise=>exercise.id===vals.id);

      newWorkoutEx.push({
        ...workoutExs[idx],
        ...vals
      });
    }

    if(numCallbacks===numWorkoutEx){
      setIsSubmit(false);
      if(numErrs<=0 && newWorkoutEx.length>0){
        createWorkout({date: pickDate, exercises: newWorkoutEx});
      }
    }
  }

  const parseDate = (paramDate)=>{
    if(paramDate == 'Invalid Date'){
      setPickDate(new Date());
    }
    return `${paramDate.getDate()}-${paramDate.getMonth()+1}-${String(paramDate.getFullYear()).slice(2)}`;
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
                    <Button color="primary" onClick={handleClickOpen}>Add Exercise</Button>
                  </ListItem>
                </List>
                <ExercisePicker workoutExs={workoutExs} open={open} onClose={handleClose} />
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
                  <ListItem>
                    <span>on date: {parseDate(pickDate)}</span>
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