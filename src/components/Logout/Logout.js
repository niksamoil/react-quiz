import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/authAction';

class Logout extends Component {
  componentDidMount() {
    const { logout: logoutAction } = this.props;
    logoutAction();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
