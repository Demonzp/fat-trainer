import React from "react";
import {useAppState} from "state/appState";

import { Alert } from "@material-ui/lab";
import { IconButton, Container } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function Message(){
  const [{appMessage},{delMessage}] = useAppState();

  return (
    <Container>
      {appMessage.map((msg)=>{
        return(
          <Alert 
            key={msg.key}
            severity={msg.type}
            style={{marginTop:'5px'}}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() =>delMessage(msg.key)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {msg.txt}
          </Alert>
        );
      })}
    </Container>
  );
}

export default Message;