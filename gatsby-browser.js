import React from 'react';
import FirebaseProvider from './src/containers/FirebaseProvider';

import firebase from './src/services/firebase';

export const wrapRootElement = ({ element }) => {
  return (
    <FirebaseProvider firebase={firebase}>
     {element}
  </FirebaseProvider>
  )
}

