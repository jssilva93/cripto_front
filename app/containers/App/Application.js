import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  Parent,
  DashboardPage,
  Form,
  Table,
  Error,
  NotFound,
  Afin,
  Caesar,
  Permutation,
  Substitution,
  Vigenere,
  Hill
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    const isLoggedIn = localStorage.getItem('session_token');
    if (!isLoggedIn) {
      return (<Redirect to="/" />);
    }
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app" component={Afin} />
          <Route path="/app/dashboard" component={DashboardPage} />
          <Route path="/app/afin" component={Afin} />
          <Route path="/app/caesar" component={Caesar} />
          <Route path="/app/hill" component={Hill} />
          <Route path="/app/substitution" component={Substitution} />
          <Route path="/app/permutation" component={Permutation} />
          <Route path="/app/vigenere" component={Vigenere} />
          <Route path="/app/form" component={Form} />
          <Route path="/app/table" component={Table} />
          <Route path="/app/page-list" component={Parent} />
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/app/pages/error" component={Error} />
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Application;
