import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { Link } from 'react-router-dom';
class SignUpPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.singup}>
          <Card>
            <CardContent>
              <form>
                <div className="text-xs-center pb -xs">
                  <Typography variant="caption">
                    Đăng nhập để tiếp tục
                  </Typography>
                </div>
                <TextField
                  id="email"
                  fullWidth
                  label="Email"
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="password"
                  fullWidth
                  label="PassWord"
                  className={classes.textField}
                  type="password"
                  margin="normal"
                />
                <TextField
                  id="cpassword"
                  fullWidth
                  label="Confirm PassWord"
                  className={classes.textField}
                  type="password"
                  margin="normal"
                />
                <FormControlLabel
                  control={<Checkbox value="agree" />}
                  label="Tôi đã đọc chính sách và đồng ý điều khoản"
                  className={classes.fullWidth}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Sign Up
                </Button>
                <div className="pt-1 text-md-center">
                  <Link to="/login">
                    <Button> Đã có tài khoản</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
SignUpPage.propTypes = {
  classes: PropTypes.object,
};
export default withStyles(styles)(SignUpPage);
