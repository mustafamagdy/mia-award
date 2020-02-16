export default function(/**@type {ApisauceInstance} */ api) {
  const login = loginRequest => api.post("Auth/login-nominee", loginRequest);
  const logout = accessToken => api.post("Auth/logout", { accessToken });

  return {
    auth: {
      login,
      logout
    }
  };
}
