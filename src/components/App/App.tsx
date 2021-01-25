import "./App.css";
import LibsComponent from "../LibsComponent/LibsComponent";
import Library from "../LibsComponent/Library";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/library/:order">
            <Library />
          </Route>
          <Route path="/" exact>
            <LibsComponent />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
