interface IInitialState {
    user: null | string
}

const initialState : IInitialState = {
    user: null,
};
  
  interface IAction {
    type:string,
    payload: string
}

const authReducer = (state = initialState, action : IAction) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
};
  
  export default authReducer;