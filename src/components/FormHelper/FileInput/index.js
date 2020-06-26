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
// renderFromHelper.propTypes = {
//   touched: PropTypes.bool,
//   error: PropTypes.bool,
// };
// const renderFileInput = ({
//   input,
//   label,
//   classes,
//   meta: { touched, error },
//   children,
//   ...custom
// }) => (
//   <FormControl variant="outlined" className={classes.formControl} size="small">
//     <InputLabel id="demo-simple-select-outlined-label">Nhà Sản Xuất</InputLabel>
//     <input type="file" onChange={this.onFileChange} />
//     {renderFromHelper({ touched, error })}
//   </FormControl>
// );
export class FileInput extends React.Component {
  // getBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };
  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve({
          base64: reader.result,
          namefile: file.name,
        });
      reader.onerror = (error) => reject(error);
    });
  };

  onFileChange = async (e) => {
    const { input } = this.props;
    const targetFile = e.target.files[0];
    if (targetFile) {
      const val = await this.getBase64(targetFile);
      input.onChange(val);
    } else {
      input.onChange(null);
    }
  };

  render() {
    return <input type="file" onChange={this.onFileChange} />;
  }
}
// renderFileInput.propTypes = {
//   input: PropTypes.object,
//   meta: PropTypes.object,
//   label: PropTypes.string,
//   children: PropTypes.array,
//   classes: PropTypes.object,
// };
// export default withStyles(styles)(renderFileInput);
