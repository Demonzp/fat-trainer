import React,{ useEffect } from "react";

import { useHistory } from "react-router-dom";
//import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { Grid } from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import RoutNames from "../constants/routNames";

import InfiniteCalendar from "sa-react-infinite-calendar";
import "sa-react-infinite-calendar/styles.css";

import {useAppState} from "state/appState";

function DashboardPage(){

  const history = useHistory();
  
  const [state, {getExercises, getWorkouts}] = useAppState();

  useEffect(()=>{
    getExercises();
    getWorkouts();
  },[]);

  const handlerPickDate = (date)=>{
    history.push(`${RoutNames.newWorkout}?date=${date}`);
  }

  const handlerAddNewExercise = (e)=>{
    history.push(RoutNames.newExercise);
  }

  return(
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Grid container direction="row" justify="space-between">
          <Button color="primary" onClick={handlerAddNewExercise}>Add New Exercise</Button>
          <Button color="primary">Add New Workout</Button>
        </Grid>
        <InfiniteCalendar
          onSelect={handlerPickDate}
          height={550}
        />
      </GridItem>
    </GridContainer>
  );
}

export default DashboardPage;