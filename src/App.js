import React,{Component} from 'react';
import {
  Route,
  Switch,
  HashRouter
} from "react-router-dom";

import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

//Pages
const Login = React.lazy(()=>import('./components/Pages/Login'));
const Register = React.lazy(() => import('./components/Pages/Register'));
const Page404 = React.lazy(() => import('./components/Pages/Page404'));
const Page500 = React.lazy(() => import('./components/Pages/Page500'));
const Layout = React.lazy(()=>import('./components/Layout/index'))

class App extends Component {
  render() {
    return (
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <Layout {...props}/>}/>
            </Switch>
          </React.Suspense>
        </HashRouter>
    );
  }
}
export default App;

