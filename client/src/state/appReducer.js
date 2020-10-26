const initialState = { 
  authAttempted: false,
  token: null,
  user: null,
  activRoutes:[],
  redirectMessage:false,
  appMessage:[],
  exercises:[],
  isLoadedExercises:false,
  workouts:[],
  isLoadedWorkouts:false
};

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_CHANGE": {
      return { 
        ...state, 
        user: action.user, 
        authAttempted: true, 
        token: action.token, 
        activRoutes: action.activRoutes 
      }
    }
    case "SET_TOKEN": {
      return {...state, token: action.token}
    }
    case "SET_ACTIV_ROUTS":{
      return {...state, activRoutes: action.activRoutes}
    }
    case "LOCK_AUTH_APP":{
      return {...state, appMessage: [], redirectMessage: false , lockAuthApp: true}
    }
    case "OPEN_AUTH_APP":{
      return {...state, lockAuthApp: false}
    }
    case "ADD_APP_MESSAGE":{
      return {...state, appMessage: action.appMessage}
    }
    case "DEL_APP_MESSAGE":{
      return {...state, appMessage: action.appMessage}
    }
    case "ADD_REDIRECT_APP_MESSAGE":{
      return {...state, appMessage: action.appMessage, redirectMessage: true}
    }
    case "CLEAR_APP_MESSAGE":{
      return {...state, appMessage: [], redirectMessage: false}
    }
    case "SET_EXERCISES":{
      return { ...state, isLoadedExercises: true, exercises: action.exercises }
    }
    case "ADD_EXERCISE":{
      const newExs = [
        ...state.exercises,
        action.exercise
      ];

      return { ...state, exercises: newExs}
    }
    case "UPDATE_EXERCISES":{
      return { ...state, exercises: action.exercises }
    }
    case "DELETE_EXERCISE":{
      const idx = state.exercises.findIndex((ex)=>ex.id===action.id);

      const newExercises = [
        ...state.exercises.slice(0, idx),
        ...state.exercises.slice(idx+1)
      ];
      
      return { ...state, exercises: newExercises}
    }
    case "SET_WORKOUTS":{
      return {...state, isLoadedWorkouts: true, workouts: action.workouts}
    }
    case "ADD_WORKOUT":{
      return {...state, workouts:[...state.workouts, action.workout]}
    }
    default:
      return state
  }
}

export { initialState };
export default appStateReducer;