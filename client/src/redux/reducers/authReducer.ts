interface IInitialState {
  displayName: string | null,
  email: string | null,
  token: string | null,
}

const initialState : IInitialState = {
  displayName: null,
  email: null,
  token: null 
};
  
  interface IAction {
    type:string,
    payload: object
}


const authReducer = (state = initialState, action : IAction) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          ...action.payload
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