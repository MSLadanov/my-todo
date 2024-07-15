export const login = (userData : string | null) => ({
    type: 'LOGIN',
    payload: userData,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });