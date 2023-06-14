import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useHistory } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop: theme.spacing(3), // Add top margin equivalent to the chlorine level dashboard
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: theme.spacing(3), // Add top margin equivalent to the chlorine level dashboard
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
   // marginTop: theme.spacing(8), // Add top margin equivalent to the chlorine level dashboard
  },
  header: {
    marginBottom: theme.spacing(2),
    color: "#34568B",
  },
  formContainer: {
    //display: "flex",
    //flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    margin: "0 auto",
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
  resultContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#FCEECF",
    textAlign: "center",
  },
  snackbar: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: "58%",
    transform: "translateX(-50%)",
    width: "fit-content",
    justifyContent: "center",
    alignItems: "center",
  },
  adviceNotification: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#FFCDD2",
    textAlign: "center",
  },
  chartContainer: {
    marginTop: theme.spacing(4),
    //backgroundColor: "black",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  chartWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  pieChart: {
    width: "45%",
  },
  histogramChart: {
    width: "45%",
  },
  menuItem: {
    color: "#34568B",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#F96714",
      backgroundColor: "transparent",
    },
    "&.active": {
      color: "#F96714",
      backgroundColor: "transparent",
      fontWeight: "bold",
    },
  },
  pdfContainer: {
    marginTop: theme.spacing(2),
    maxWidth: 600,
    width: "100%",
  },
}));

const AdminPanel = ({ onChlorineAmountSubmit }) => {
  const classes = useStyles();
  const [chlorineAmount, setChlorineAmount] = useState("");
  const [result, setResult] = useState("");
  const [advice, setAdvice] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  const [numberOfSafeDays, setNumberOfSafeDays] = useState(0);
  const [numberOfHarmfulDays, setNumberOfHarmfulDays] = useState(0);
  const [numberOfLowChlorineDays, setNumberOfLowChlorineDays] = useState(0);
  const [isPDFVisible, setPDFVisible] = useState(false);
  const [dosage, setDosage] = useState("");
  const [flow, setFlow] = useState("");
  const [purity, setPurity] = useState("");
  const [R, setR] = useState("");
  const [Q, setQ] = useState("");

  const [reportData, setReportData] = useState({
    samplingPoints: "",
    turbidity: "",
    ph: "",
    freeResidualChlorine: "",
    temperature: "",
  });

  const handleReportSubmit = () => {
    // Prepare the data to be sent
    const data = {
      samplingPoints: reportData.samplingPoints,
      turbidity: reportData.turbidity,
      ph: reportData.ph,
      freeResidualChlorine: reportData.freeResidualChlorine,
      temperature: reportData.temperature,
    };
  
    // Send the data to the Laravel backend using Axios
    axios.post('http://127.0.0.1:8000/api/reports', data)
      .then((response) => {
        // Handle the response from the backend
        console.log(response.data); // You can customize this based on your requirements
  
        // Clear the form after successful submission
        setReportData({
          samplingPoints: "",
          turbidity: "",
          ph: "",
          freeResidualChlorine: "",
          temperature: "",
        });
      })
      .catch((error) => {
        // Handle any error that occurs during submission
        console.error(error); // You can customize this based on your requirements
      });
  };
  
  

  const history = useHistory();
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const handleLogout = () => {
    // Perform any necessary logout actions, such as clearing session data
    // Redirect to the login page
    history.push("/adminlogin");
  };

  const handleChlorineAmountChange = (e) => {
  setChlorineAmount(e.target.value);
  };

  /*const handleCheckChlorineAmount = () => {
    if (chlorineAmount < 0.2) {
      setResult("Too Low");
      setAdvice("The chlorine level is too low for consumption.");
      setNumberOfLowChlorineDays(numberOfLowChlorineDays + 1);
    } else if (chlorineAmount >= 0.2 && chlorineAmount <= 1.8) {
      setResult("Safe");
      setAdvice("The chlorine level is safe for consumption.");
      setNumberOfSafeDays(numberOfSafeDays + 1);
    } else {
      setResult("Harmful");
      setAdvice(
        "The chlorine level is above the safe limit. Please take necessary action."
      );
      setNumberOfHarmfulDays(numberOfHarmfulDays + 1);
      setNotificationOpen(true);
    }
  }; */

  const handleCheckChlorineAmount = () => {
    const calculatedChlorineAmount = ((R / (Q * 8.34)) * flow * 8.34) / (purity / 100);
    
    if (calculatedChlorineAmount < 0.2) {
      setResult("Too Low");
      setAdvice("The chlorine level is too low for consumption.");
      setNumberOfLowChlorineDays(numberOfLowChlorineDays + 1);
    } else if (calculatedChlorineAmount >= 0.2 && calculatedChlorineAmount <= 1.8) {
      setResult("Safe");
      setAdvice("The chlorine level is safe for consumption.");
      setNumberOfSafeDays(numberOfSafeDays + 1);
    } else {
      setResult("Harmful");
      setAdvice(
        "The chlorine level is above the safe limit. Please take necessary action."
      );
      setNumberOfHarmfulDays(numberOfHarmfulDays + 1);
      setNotificationOpen(true);
    }
  };
  
  

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setReportData({
      samplingPoints: "",
      turbidity: "",
      ph: "",
      freeResidualChlorine: "",
      temperature: "",
    });
  };
  
  

  const pieChartData = {
    labels: ["Safe", "Harmful", "Too Low"],
    datasets: [
      {
        data: [
          result === "Safe" ? 1 : 0,
          result === "Harmful" ? 1 : 0,
          result === "Too Low" ? 1 : 0,
        ],
        backgroundColor: ["#34568B", "#F96714", "#FFCDD2"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "bottom",
    },
  };

  const histogramData = {
    labels: ["Safe", "Harmful", "Too Low"],
    datasets: [
      {
        label: "Number of Safe Days",
        data: [numberOfSafeDays, 0, 0],
        backgroundColor: ["#34568B", "#34568B", "#34568B"],
        //borderColor: "#34568B", // Set the same color as the corresponding bar
        borderWidth: 1,
      },
      {
        label: "Number of Harmful Days",
        data: [0, numberOfHarmfulDays, 0],
        backgroundColor: ["#F96714", "#F96714", "#F96714"],
        //borderColor: "#F96714", // Set the same color as the corresponding bar
        borderWidth: 1,
      },
      {
        label: "Number of Low Chlorine Days",
        data: [0, 0, numberOfLowChlorineDays],
        backgroundColor: ["#FFCDD2", "#FFCDD2", "#FFCDD2"],
       //borderColor: "#FFCDD2", // Set the same color as the corresponding bar
        borderWidth: 1,
      },
    ],
  };
  
  

  const histogramOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: true,
      position: "bottom",
    },
  };

  /*const handleChlorineAmountSubmit = () => {
    onChlorineAmountSubmit(chlorineAmount);
  }; */

  const handleChlorineAmountSubmit = () => {
    const calculatedChlorineAmount = (dosage * flow * 8.34) / (purity / 100);
    onChlorineAmountSubmit(calculatedChlorineAmount);
  };
  

  return (
    <div className={classes.container}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.header}>
          <Typography variant="h5">Admin Panel</Typography>
        </div>
        <List>
          <ListItem
            button
            className={`${classes.menuItem} ${
              selectedMenuItem === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleMenuItemClick("dashboard")}
          >
            Dashboard
          </ListItem>
          <ListItem
            button
            className={`${classes.menuItem} ${
              selectedMenuItem === "chlorine-info" ? "active" : ""
            }`}
            onClick={() => handleMenuItemClick("chlorine-info")}
          >
            Chlorine Information
          </ListItem>

          <ListItem
            button
            className={`${classes.menuItem} ${
              selectedMenuItem === "reports" ? "active" : ""
            }`}
            onClick={() => handleMenuItemClick("reports")}
          >
            Reports
          </ListItem>



          <ListItem
            button
            className={classes.menuItem}
            onClick={handleLogout}
          >
            Logout
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {selectedMenuItem === "dashboard" && (
          <>
            <Typography variant="h5" className={classes.header}>
              Chlorine Level Dashboard
            </Typography>
            <div className={classes.formContainer}>
              {/*<TextField
                className={classes.field}
                variant="outlined"
                label="Chlorine Amount (mg/L)"
                type="number"
                value={chlorineAmount}
                onChange={handleChlorineAmountChange}
              />}
              <TextField
                className={classes.field}
                variant="outlined"
                label="Dosage (mg/l)"
                type="number"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              /> */}
              <TextField
                className={classes.field}
                variant="outlined"
                label="R"
                type="number"
                value={R}
                onChange={(e) => setR(e.target.value)}
              />
              <TextField
                className={classes.field}
                variant="outlined"
                label="Q"
                type="number"
                value={Q}
                onChange={(e) => setQ(e.target.value)}
              />

              <TextField
                className={classes.field}
                variant="outlined"
                label="Flow (MGD)"
                type="number"
                value={flow}
                onChange={(e) => setFlow(e.target.value)}
              />
              <TextField
                className={classes.field}
                variant="outlined"
                label="Purity (%)"
                type="number"
                value={purity}
                onChange={(e) => setPurity(e.target.value)}
              />

              <Button
                className={classes.button}
                variant="contained"
                onClick={handleCheckChlorineAmount}
              >
                Check
              </Button>
              
            </div>
            {result && (
              <div className={classes.resultContainer}>
                <Typography variant="h6">Result: {result}</Typography>
                <Typography variant="body1">{advice}</Typography>
              </div>
            )}
            <Snackbar
              open={notificationOpen}
              autoHideDuration={5000}
              onClose={handleNotificationClose}
              message="High chlorine level detected!"
              className={classes.snackbar}
            />
            <div className={classes.chartContainer}>
              <div className={classes.chartWrapper}>
                <div className={classes.pieChart}>
                  <Pie data={pieChartData} options={pieChartOptions} />
                </div>
                <div className={classes.histogramChart}>
                  <Bar data={histogramData} options={histogramOptions} />
                </div>
              </div>
            </div>
          </>
        )}
        {selectedMenuItem === "chlorine-info" && (
          <>
            <Typography variant="h5" className={classes.header}>
              Chlorine Information
            </Typography>
            <Button
            className={classes.button}
            variant="contained"
            onClick={() => setPDFVisible(!isPDFVisible)}
          >
            View PDF
          </Button>
            {/* Add your chlorine information component here */}
            {isPDFVisible && (
              <div className={classes.pdfContainer}>
                <iframe
                  src="https://www.slideshare.net/slideshow/embed_code/key/jnxXWbdhEqgk8?hostedIn=slideshare&page=upload"
                  title="PDF Viewer"
                  className={classes.pdfIframe}
                  style={{ width: "1200px", height: "800px" }}
                  frameborder="0"
                  marginwidth="0"
                  marginheight="0"
                  scrolling="no"
                ></iframe>
              </div>
            )}
          </>
        )}

        {selectedMenuItem === "reports" && (
          <>
            <Typography variant="h5" className={classes.header}>
              Report
            </Typography>
            <div className={classes.formContainer}>
              <TextField
                className={classes.field}
                variant="outlined"
                label="Sampling Points"
                value={reportData.samplingPoints}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    samplingPoints: e.target.value,
                  })
                }
              />
              <TextField
                className={classes.field}
                variant="outlined"
                label="Turbidity"
                value={reportData.turbidity}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    turbidity: e.target.value,
                  })
                }
              />
              <TextField
                className={classes.field}
                variant="outlined"
                label="pH"
                value={reportData.ph}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    ph: e.target.value,
                  })
                }
              />
              <TextField
                className={classes.field}
                variant="outlined"
                label="Free Residual Chlorine"
                value={reportData.freeResidualChlorine}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    freeResidualChlorine: e.target.value,
                  })
                }
              />
              <TextField
                className={classes.field}
                variant="outlined"
                label="Temperature"
                value={reportData.temperature}
                onChange={(e) =>
                  setReportData({
                    ...reportData,
                    temperature: e.target.value,
                  })
                }
              />
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleReportSubmit}
              >
                Submit Report
              </Button>
            </div>
          </>
        )}

      </main>
    </div>
  );
};

export default AdminPanel;