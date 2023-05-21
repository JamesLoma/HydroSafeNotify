import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

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

const UserSignup = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle user signup logic here
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    // Reset the form
    setUsername("");
    setPassword("");
    setEmail("");
    setPhoneNumber("");
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>User Signup</h2>
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
                    <AccountCircleIcon
                      color="primary"
                      style={{ marginRight: 8 }}
                    />
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
            <Grid item xs={12}>
              <TextField
                className={classes.field}
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <EmailIcon color="primary" style={{ marginRight: 8 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.field}
                placeholder="Phone Number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <PhoneIcon color="primary" style={{ marginRight: 8 }} />
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button className={classes.button} variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
      </Paper>
      <p>
        Already have an account? <Link to="/userlogin">Log in</Link>
      </p>
    </div>
  );
};

export default UserSignup;
