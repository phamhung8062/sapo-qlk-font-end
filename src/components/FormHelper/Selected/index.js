/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  withStyles,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return null;
  }
  return <FormHelperText>{touched && error}</FormHelperText>;
};
renderFromHelper.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.bool,
};
// const renderSelectField = ({
//   input,
//   label,
//   classes,
//   meta: { touched, error },
//   children,
//   ...custom
// }) => (
//   <FormControl
//     error={touched && error}
//     className={classes.formControl}
//     variant="outlined"
//     size="small"
//   >
//     <InputLabel id="demo-simple-select-outlined-label">Nhà Sản Xuất</InputLabel>
//     {/* <InputLabel htmlFor="age-native-simple">{label}</InputLabel> */}
//     <Select
//       {...input}
//       {...custom}
//       labelId="demo-simple-select-outlined-label"
//       id="demo-simple-select-outlined"
//       // inputProps={{
//       //   name: 'Trạng Thái',
//       //   id: 'demo-simple-select-outlined',
//       // }}
//       value={input.value}
//     >
//       {children}
//     </Select>
//     {renderFromHelper({ touched, error })}
//   </FormControl>
// );

const renderSelectField = ({
  input,
  label,
  classes,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl variant="outlined" className={classes.formControl} size="small">
    <InputLabel id="demo-simple-select-outlined-label">Nhà Sản Xuất</InputLabel>
    <Select
      {...input}
      {...custom}
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      label="Nhà Sản Xuất"
      value={input.value}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);
renderSelectField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  children: PropTypes.array,
  classes: PropTypes.object,
};
export default withStyles(styles)(renderSelectField);
