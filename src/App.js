import * as React from "react";
import ToDoList from "./containers/ToDoList";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import './App.css';

const PrivateRoute = ({ children, ...rest }) => {
  if (rest.isAuth) {
    return children;
  }
  return <Redirect to={{ pathname: "/" }} />;
};


function App() {

  const [isAuth, setIsAuth] = React.useState(false);

  const login = () => {
    setIsAuth(!isAuth);
  };

  return (
    <BrowserRouter>
      <div className='todo-loginfo'>{`You are logged: ${isAuth}`}</div>
      <Switch>
        <Route path="/todo">
          <PrivateRoute isAuth={isAuth}>
            <ToDoList />
          </PrivateRoute>
        </Route>
        <Route path="/">
          <LoginPage login={login} isAuth={isAuth} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
