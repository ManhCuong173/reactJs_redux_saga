/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DashBoard from './../../../components/DashBoard';

export default class AdminLayoutRoute extends Component {
  render() {
    const { route } = this.props;
    const { name, component: YourComponent, ...remainProps } = route;
    return (
      <Route
        {...remainProps}
        render={routeProps => {
          return (
            <DashBoard>
              <YourComponent {...routeProps} />
            </DashBoard>
          );
        }}
      />
    );
  }
}

AdminLayoutRoute.propTypes = {
  route: PropTypes.object,
};
