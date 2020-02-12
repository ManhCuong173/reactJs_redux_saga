import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import LoadingIcon from './../../assets/images/loading.gif';
import * as uiActions from './../../actions/ui';

export class GlobalLoading extends Component {
  render() {
    const { classes, showLoading } = this.props;
    const xhtml = null;
    if (showLoading) {
      return (
        <div className={classes.globalLoading}>
          <img src={LoadingIcon} alt="loading" className={classes.icon} />
        </div>
      );
    }

    return xhtml;
  }
}

GlobalLoading.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  showLoading: state.uis.showLoading,
});
const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(GlobalLoading);
