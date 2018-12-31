import React from 'react';
import PropTypes from 'prop-types';

class FirebaseProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    firebase: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    firebase: PropTypes.object,
  };

  getChildContext() {
    debugger
    const { firebase } = this.props;

    return {
      firebase,
    };
  }

  render() {
    debugger
    const { children } = this.props;

    return children;
  }
}

export default FirebaseProvider;