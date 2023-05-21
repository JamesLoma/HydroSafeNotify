import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import SecurityOutlinedIcon from "@material-ui/icons/SecurityOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    textAlign: "center",
    //backgroundImage: "url('2.jpg')",
    //backgroundSize: "cover",
    backgroundPosition: "center",
  },
  header: {
    marginBottom: theme.spacing(2),
    color: "#34568B",
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  image: {
    width: "300px",
    height: "auto",
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
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

const HomePage = ({ children }) => {
  const classes = useStyles();

  const menuItems = [
    {
      text: "User",
      icon: <AccountCircleOutlinedIcon fontSize="medium" />,
      path: "/userlogin",
    },
    {
      text: "Admin",
      icon: <SecurityOutlinedIcon fontSize="medium" />,
      path: "/adminlogin",
    },
  ];

  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.header}>
        HydroSafeNotify
      </Typography>
      <img src="11.jpg" alt="HydroSafeNotify Image" className={classes.image} />
      <Typography variant="body1" className={classes.description}>
        Welcome to HydroSafeNotify, the platform that ensures water safety through timely notifications based on chlorine levels. Sign up today and embark on a water safety journey with HydroSafeNotify. Your health is our top priority, and together, we can make a significant difference in ensuring the purity of your water supply. Experience the difference of HydroSafeNotify and take control of your water safety now!
      </Typography>
      <div className={classes.buttonContainer}>
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <button className={classes.button}>
              {item.icon}
              {item.text}
            </button>
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HomePage;
