import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import { createStyles, Theme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";

export const TextInput = (props) => {
  const [textInput, setTextInput] = useState('');
  const { firstUserId, secondUserId } = props
  const sender_id = localStorage.getItem("UserID")
  const receiver_id = secondUserId === sender_id ? firstUserId : secondUserId
  function sendMessage(text){
    const payload = {
      sender_id: sender_id,
      receiver_id: receiver_id,
      text: text,
      created_at: Date.now()
    }
    var formData = new FormData();

    for ( var key in payload ) {
      formData.append(key, payload[key]);
    }
    axios.post(`http://localhost:7070/api/messages`, formData).then(response => {
      console.log(response)
    });
  }
  return (
    <>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="Input Text"
          onChange={(event) => setTextInput(event.target.value)}
          //margin="normal"
        />
        <Button variant="contained" color="primary" onClick={() => sendMessage(textInput)}>
          "Send"
        </Button>
      </form>
    </>
  );
};

