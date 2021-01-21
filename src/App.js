import './App.css';
import NavBar from './components/navBar/navBar.js'
import Sales from './components/sales/sales.js'
import Orders from './components/orders/orders.js'
import CutOff from './components/sales/cutOff.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBar/>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/orders" />
          </Route>
          <Route path="/sales">
            <Sales />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/cutOff">
            <CutOff />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
