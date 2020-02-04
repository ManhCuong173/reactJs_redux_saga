import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import TaskBoard from '../TaskBoard';
import styles from './styles';
import theme from '../../commons/Theme/index';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <TaskBoard />
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
