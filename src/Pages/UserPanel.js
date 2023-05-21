import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: theme.spacing(2),
    color: "#34568B",
  },
  statusContainer: {
    marginBottom: theme.spacing(2),
  },
  commentContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: theme.spacing(2),
  },
  commentInput: {
    width: "100%",
  },
  submitButton: {
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

const UserPanel = ({ chlorineAmount }) => {
  const classes = useStyles();
  const [chlorineStatus, setChlorineStatus] = useState("");
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    // Perform logic to submit the comment
    // You can send the comment to an API or perform any other necessary actions
    console.log("Comment:", comment);
    // Clear the comment field
    setComment("");
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        Chlorine Status
      </Typography>
      <h2>Chlorine Amount:</h2>
      <p>{chlorineAmount}</p>
      <div className={classes.statusContainer}>
        {/* Display the chlorine status */}
        <Typography variant="body1">{chlorineStatus}</Typography>
      </div>
      <div className={classes.commentContainer}>
        <TextField
          className={classes.commentInput}
          variant="outlined"
          label="Comment or Feedback"
          multiline
          rows={4}
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <Button
        className={classes.submitButton}
        variant="contained"
        onClick={handleSubmitComment}
      >
        Submit
      </Button>
    </div>
  );
};

export default UserPanel;
