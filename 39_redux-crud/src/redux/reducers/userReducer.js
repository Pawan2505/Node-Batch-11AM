import { ADD_USER, UPDATE_USER, DELETE_USER } from '../actions/userActions';

const initialState = [
  { id: 1, name: 'Pawan Maurya', email: 'pawan@gmail.com' },
  { id: 2, name: 'Manish Mishra', email: 'manish@gmail.com' },
];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];

    case UPDATE_USER:
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );

    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);

    default:
      return state;
  }
};

export default userReducer;
