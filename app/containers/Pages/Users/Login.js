import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { Redirect, withRouter } from 'react-router-dom';
import Notification from 'dan-components/Notification/Notification';
import platform from 'platform';
import { post, urlLogin } from 'dan-api/request';
const recaptchaRef = React.createRef();

class Login extends React.Component {
  state = {
    mssg: '',
    isError: false
  }

  closeNotification = () => {
    this.setState({ isError: false });
  }

  postData = async (dataSend) => {
    post(urlLogin, dataSend)
      .then(response => {
        if (response.status === 200) {
          // eslint-disable-next-line camelcase
          const { data: { session_token } } = response;
          localStorage.setItem('session_token', session_token);
          localStorage.setItem('user_name', dataSend.session._root.entries[0][1]);
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

  onCaptcha = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    this.onSubmit(recaptchaValue);
  }

  submitForm(values) {
    const dataSend = {
      session: values,
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

  render() {
    const isLoggedIn = localStorage.getItem('session_token');
    if (isLoggedIn) {
      return (<Redirect to="/app" />);
    }

    const title = brand.name + ' - Login';
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
            <LoginForm onSubmit={(values) => this.submitForm(values)} />
            { isError ? <Notification message={mssg} close={this.closeNotification} /> : '' }
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Login));
