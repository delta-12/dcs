import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"
import PrivateRoute from "./components/private-route/PrivateRoute"

import LandingPage from './pages/LandingPage'
import Register from "./auth/Register"
import Login from "./auth/Login"
import Account from "./auth/Account"
import Dashboard from "./dashboard/Dashboard"
import TermsConditions from "./pages/TermsConditions"
import Privacy from "./pages/Privacy"
import Contact from "./pages/Contact"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/terms_and_conditions" component={TermsConditions} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/contact" component={Contact} />            
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/account" component={Account} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }

}

export default App
