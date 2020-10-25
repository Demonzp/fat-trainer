import axios from "axios";

import Message from "state/actions/msg";
import Auth from "state/actions/auth";
import Exercise from "state/actions/exercise";
import Workout from "state/actions/workout";

const validateStatus = (status)=>{
  return status >= 200 && status < 300 
          || status === 401 
          || status === 500 
          || status === 400
          || status === 409;
}
const guestAxios = axios.create({
  baseURL: 'http://localhost:5000',
  validateStatus
});

const UseActionsState = ([state, dispath])=>{
  const msgActions = Message(state, dispath);

  const getAuthAxios = ()=>{
    return axios.create({
        baseURL: 'http://localhost:5000',
        headers:{
            'Authorization':state.token
        },
        validateStatus
    });
  }
    
  return [
      state,
      {
        ...msgActions,
        ...Auth(state, dispath, guestAxios, msgActions.addMessage),
        ...Exercise(state, dispath, getAuthAxios, msgActions.addMessage),
        ...Workout(state, dispath, getAuthAxios, msgActions.addMessage)
      }
  ]
        
}

export default UseActionsState;