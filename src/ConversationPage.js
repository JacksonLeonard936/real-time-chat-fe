import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
//import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";

/*const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  })
);*/


export const ConversationPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const firstUserId = searchParams.get('firstUserId');
    const secondUserId = searchParams.get('secondUserId');
    const [messages, setMessages] = useState([]);

    function fetchConversation() {
        axios.get(`http://localhost:7070/api/messages?firstUserId=${firstUserId}&secondUserId=${secondUserId}`).then(response => setMessages(response.data));
    }
    useEffect(() => {
        fetchConversation()
    }, [])
    return (
      <div>
        <Paper zDepth={2}>
          <Paper id="style-1">
          {messages.map((message) => {
	          if (message.sender_id == secondUserId) {
              return (
                <MessageLeft
                  message={message.text}
                  timestamp={message.timestamp}
                  displayName={message.sender_id}
                  avatarDisp={true}
                />
              )
            } else {
              return (
                <MessageRight
                  message={message.text}
                  timestamp={message.timestamp}
                  displayName={message.sender_id}
                  avatarDisp={true}
                />
              )
            }}
          )}
          </Paper>
          <TextInput firstUserId={firstUserId} secondUserId={secondUserId}/>
        </Paper>
      </div>
    );
}