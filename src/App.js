import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import HomePage from './Pages/HomePage';
import UserLogin from './Pages/UserLogin';
import AdminLogin from './Pages/AdminLogin';
import UserSignup from './Pages/UserSignup';
import AdminPanel from './Pages/AdminPanel';
import UserPanel from './Pages/UserPanel';
import ReactDOM from "react-dom";
import ParentComponent from "./ParentComponent";

ReactDOM.render(<ParentComponent />, document.getElementById("root"));

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>

              <Route exact path = "/">
              <HomePage/>
              </Route>

              <Route exact path ="/userlogin">
              <UserLogin/>
              </Route>

              <Route exact path ="/adminlogin">
              <AdminLogin/>
              </Route>

              <Route exact path ="/usersignup">
              <UserSignup/>
              </Route>

              <Route exact path ="/admin-panel">
              <AdminPanel/>
              </Route>

              <Route exact path ="/user-panel">
              <UserPanel/>
              </Route>

          </Switch>
        </Router>
      
    </div>
  );
}

export default App;