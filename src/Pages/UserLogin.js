import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

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

  forgotPasswordLink: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const UserLogin = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle user login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    // Reset the form
    setUsername("");
    setPassword("");

    // Navigate to user panel
    history.push("/user-panel");
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
    // Add logic to handle forgot password functionality
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>User Login</h2>
      <p className={classes.subheading}>Login to your HydroSafeNotify account</p>
      <p className={classes.subheading}>Your credentials</p>
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
              <AccountCircleIcon color="primary" style={{ marginRight: 8 }} />
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
              <LockIcon color="primary" style={{ marginRight: 8 }} />
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

      {!forgotPassword && (
        <p className={classes.link}>
          <Link to="/forgot-password" className={classes.forgotPasswordLink}>
            Forgot Password?
          </Link>
        </p>
      )}
      {forgotPassword && <p>Forgot Password Component</p>}

      
        <p>Don't have an account?</p>
        
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => history.push("/usersignup")}
        >
          Sign up
        </Button>
      
    </div>
  );
};

export default UserLogin;
