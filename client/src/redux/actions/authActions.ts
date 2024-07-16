interface IUserData {
  displayName: string | null,
  email: string | null,
  token: string 
}

export const login = (userData : IUserData | null) => ({
    type: 'LOGIN',
    payload: userData,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });