import MsgTypes from "../../constants/msgTypes";

const Workout = (state, dispath, axios, addMessage)=>{
  const getWorkouts = async()=>{
    let response = {};

    try {
      response = await axios().get("/workout");
    } catch (error) {
      console.log('err = ', error);
      addMessage({type:MsgTypes.error,txt:error.toString()});
      return Promise.reject(error);
    }

    if(response.status === 401 || response.status === 500 || response.status === 400){
      addMessage({type:MsgTypes.error,txt:response.data.message});
      return Promise.reject(response.data);
    }

    dispath({type:"SET_WORKOUTS", workouts:response.data});

    return Promise.resolve(response.data);
  }

  return {
    getWorkouts
  }
}

export default Workout;