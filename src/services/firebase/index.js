import FirebaseContext from './context';
import { db, storage } from './firebase';

import React from 'react';

const FirebaseProvider = ({ children }) => {

  return (
    <FirebaseContext.Provider
      value={{
        db,
        storage
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;