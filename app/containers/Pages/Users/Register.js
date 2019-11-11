import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import { RegisterForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { withRouter } from 'react-router-dom';
import Notification from 'dan-components/Notification/Notification';
import platform from 'platform';
import { post, urlRegister } from 'dan-api/request';

class Register extends React.Component {
  state = {
    mssg: '',
    isError: false,
  }

  submitForm = (values) => {
    localStorage.setItem('user_name', values.name);
    const dataSend = {
      user: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      device: {
        brand: platform.name,
        model: platform.version,
        os: platform.os.family || 'Unknown',
        os_version: platform.os.version || '1.0',
        app_version: 1.1,
        lang: 'ES'
      }
    };
    this.postData(dataSend);
  }

  postData = (dataSend) => {
    post(urlRegister, dataSend)
      .then(response => {
        if (response.status === 200) {
          // eslint-disable-next-line camelcase
          const { data: { session_token } } = response;
          localStorage.setItem('session_token', session_token);
          const { history } = this.props;
          history.push('/app');
        }
      })
      .catch((err) => {
        const { response } = err;
        const { status, data } = response || {};
        const { mssg, error } = data || {};
        this.setState({ mssg: status === 500 ? error : mssg, isError: true });
      });
  }

  closeNotification = () => {
    this.setState({ isError: false });
  }

  showResult = (values) => {
    const data = {
      ...values.toJS(),
    };
    this.submitForm(data);
  }

  /* sendData = (data) => {
    const dataForm = { ...this.state };
    delete dataForm.tab;
    // handleSubmit(dataForm);
  }; */

  render() {
    const title = brand.name + ' - Register';
    const description = brand.desc;
    const { classes } = this.props;
    const { isError, mssg } = this.state;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <RegisterForm handleChangePhone={this.handleChangePhone} handleChangeCountry={this.handleChangeCountry} onSubmit={(values) => this.showResult(values)} />
            { isError ? <Notification message={mssg} close={this.closeNotification} /> : '' }
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Register));
