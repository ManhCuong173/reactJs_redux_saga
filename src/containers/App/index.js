import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from '../../commons/Theme/index';
import TaskBoard from '../TaskBoard';
// eslint-disable-next-line
import GlobalLoading from './../../components/GlobalLoading/index';
import AdminLayoutRoute from './../../commons/Layout/AdminLayoutRoute';
import CommonModal from './../../components/Modal';
import { ADMIN_ROUTES } from './../../constants/routes';
import styles from './styles';

class App extends Component {
  renderAdminRoutes = () => {
    let xhtml = null;
    xhtml = ADMIN_ROUTES.map(route => {
      return <AdminLayoutRoute key={route.path} route={route} />;
    });
    return xhtml;
  };

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <div className="App">
            <ToastContainer />
            <GlobalLoading />
            <CommonModal />
            <Switch>{this.renderAdminRoutes()}</Switch>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
