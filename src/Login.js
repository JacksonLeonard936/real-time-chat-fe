import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button
} from '@mui/material';
export const LoginPage = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  const navigate = useNavigate()
  const onLogin = () => {
    const bodyFormData = new FormData()
	  bodyFormData.append('email', email);
	  bodyFormData.append('password', password);
    axios.post(`http://localhost:7070/api/login`, bodyFormData).then(response => {
      const data = response.data
      localStorage.setItem("AuthToken", data.id)
      localStorage.setItem("UserID", data.user_id)
      navigate("/conversations")
    });
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
            <TextField label="Email" onChange={(event) => setEmail(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={(event) => setPassword(event.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  label={'Keep me logged in'}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Keep me logged in"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={() => onLogin()}> Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

