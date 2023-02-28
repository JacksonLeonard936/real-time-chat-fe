import React from 'react';
import axios from "axios";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button
} from '@mui/material';
export const SignUpPage = () => {
  const [name, setName] = React.useState("");

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const onSignUp = () => {
    const bodyFormData = new FormData()
      bodyFormData.append('name', name);
	  bodyFormData.append('email', email);
	  bodyFormData.append('password', password);
    axios.post(`http://localhost:7070/api/users`, bodyFormData).then(response => console.log(response.data));
  }

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <TextField label="Name" onChange={(event) => setName(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" onChange={(event) => setEmail(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={(event) => setPassword(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={() => onSignUp()}> Create Account </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

