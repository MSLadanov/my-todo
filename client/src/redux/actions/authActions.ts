interface IUserData {
  displayName: string,
  email: string,
  token: string 
}

export const login = (userData : IUserData | null) => ({
    type: 'LOGIN',
    payload: userData,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });