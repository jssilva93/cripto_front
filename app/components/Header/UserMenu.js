import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './header-jss';

class UserMenu extends React.Component {
  state = {
    openMenu: null
  };

  handleMenu = menu => () => {
    const { openMenu } = this.state;
    this.setState({
      openMenu: openMenu === menu ? null : menu
    });
  };

  handleClose = () => {
    this.setState({ openMenu: null });
  };

  render() {
    return null;
  }
}

UserMenu.propTypes = {
};

UserMenu.defaultProps = {
  dark: false
};

export default withStyles(styles)(UserMenu);
