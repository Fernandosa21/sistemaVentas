import './App.css';
import Login from './components/login/login.js'
import Sales from './components/sales/sales.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sales">
            <Sales />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
