import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './../../actions/modal';
import styles from './styles';

export class ModalComponent extends Component {
  onClose = () => {
    console.log('Close');
  };

  render() {
    const { classes, open, component, modalActions, title } = this.props;
    return (
      <Modal open={open}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>{title}</span>
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}

ModalComponent.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  component: PropTypes.object,
  title: PropTypes.string,
  modalActions: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
};

const mapStateToProps = state => ({
  open: state.modal.showModal,
  component: state.modal.component,
  title: state.modal.title,
});
const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(ModalComponent);
