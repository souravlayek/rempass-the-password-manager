export const SET_MASTER_PASSWORD = 'SET_MASTER_PASSWORD';
export const AUTHENTICATED = 'AUTHENTICATED';
export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const DELETE_CREDENTIALS = 'DELETE_CREDENTIALS';
export const INITIALIZE_CREDENTIALS = 'INITIALIZE_CREDENTIALS';

export const setMasterPassword = value => {
  return {type: SET_MASTER_PASSWORD, value: value};
};

export const setAuthenticated = value => {
  return {type: AUTHENTICATED, value: value};
};

export const initializeCredentials = value => {
  return {type: INITIALIZE_CREDENTIALS, value: value};
};

export const setCredential = value => {
  return {type: SET_CREDENTIALS, value: value};
};
export const deleteCredential = value => {
  return {type: DELETE_CREDENTIALS, value: value};
};
