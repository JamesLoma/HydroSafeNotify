import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    marginBottom: theme.spacing(2),
    color: "#34568B",
  },
  subheading: {
    marginBottom: theme.spacing(1),
  },
  formContainer: {
    padding: theme.spacing(3),
    width: 400,
  },
  field: {
    margin: theme.spacing(1),
    width: "100%",
    color: "black",
  },
  button: {
    backgroundColor: "#34568B",
    color: "white",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(2),
    margin: theme.spacing(1),
    textDecoration: "none",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#F96714",
    },
  },
}));

const AdminLogin = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { username, password };

    axios
      .post("/adminlogin", data)
      .then((response) => {
        // Authentication successful
        console.log(response.data.message);
        history.push("/admin-panel");
      })
      .catch((error) => {
        // Authentication failed
        console.error(error.response.data.message);
      });
   
    // Reset the form
    setUsername("");
    setPassword("");
  };  

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Admin Login</h2>
      <p className={classes.subheading}>Login to your Admin account</p>
      <p className={classes.subheading}>Admin credentials</p>
      <Paper className={classes.formContainer}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                className={classes.field}
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <AccountCircleOutlinedIcon style={{ color: "#34568B" }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.field}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <LockOutlinedIcon style={{ color: "#34568B" }} />
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button className={classes.button} variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default AdminLogin;
