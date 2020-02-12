import { InputAdornment, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextFields from '@material-ui/icons/TextFields';
import styles from './styles';

export class SearchBox extends Component {
  render() {
    const { classes, handleFilter } = this.props;
    return (
      <TextField
        id="inputText"
        placeholder="Input here"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            // eslint-disable-next-line react/jsx-wrap-multilines
            <InputAdornment position="start">
              <TextFields />
            </InputAdornment>
          ),
        }}
        onChange={handleFilter}
      />
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object,
  handleFilter: PropTypes.func,
};

const mapStateToProps = null;
const mapDispatchToProps = null;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(SearchBox);
