import "./App.css";
import LibsComponent from "../LibsComponent/LibsComponent";
import Library from "../LibsComponent/Library";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router history>
        <Link to='/'>Home</Link>
        <Switch>
          <Route path="/library/:order">
            <Library />
          </Route>
          <Route path="/">
            <LibsComponent />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
