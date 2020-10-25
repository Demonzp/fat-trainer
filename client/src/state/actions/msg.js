import { createId } from "utils/global";

const newDelAppMessage = (msgKey, appMessage)=>{
  const msgIdx = appMessage.findIndex(({key})=>key===msgKey);
    
  return [
    ...appMessage.slice(0, msgIdx),
    ...appMessage.slice(msgIdx + 1)
  ];
}

const Messsage = (state, dispath)=>{
  const addMessage = (msg)=>{
    let newAppMessage = [...state.appMessage];

    if(newAppMessage.length===3){
      newAppMessage = newDelAppMessage(newAppMessage[0].key, newAppMessage);
    }

    newAppMessage = [
        ...newAppMessage,
        {
          ...msg,
          key: createId(6)
        }
    ];

    dispath({type: "ADD_APP_MESSAGE", appMessage:newAppMessage});
  }

  const delMessage = (msgId)=>{
    dispath({type: "DEL_APP_MESSAGE", appMessage:newDelAppMessage(msgId, state.appMessage)});
  }

  return {
    addMessage,
    delMessage
  }
}

export default Messsage;