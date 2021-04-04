import {
  AUTHENTICATED,
  DELETE_CREDENTIALS,
  INITIALIZE_CREDENTIALS,
  SET_CREDENTIALS,
  SET_MASTER_PASSWORD,
} from './Action';

const initialState = {
  firstTime: true,
  authenticated: false,
  credentials: [],
};
const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_MASTER_PASSWORD:
      return {...state, firstTime: false};
    case AUTHENTICATED:
      return {...state, authenticated: action.value};
    case SET_CREDENTIALS:
      return {...state, credentials: [...state.credentials, action.value]};
    case INITIALIZE_CREDENTIALS:
      return {...state, credentials: action.value};
    case DELETE_CREDENTIALS:
      const updatedData = state.credentials.filter(
        item => item.id !== action.value,
      );
      return {...state, credentials: [...updatedData]};
    default:
      return state;
  }
};

export default Reducers;
