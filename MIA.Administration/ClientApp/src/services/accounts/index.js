

export default function (/**@type {ApisauceInstance} */ api) {
  const signup = user => api.post("user/createByEmail", user);
  const getUserProfile = () => api.get("user/profile");
  const updateUserProfile = (userData) => {
    const headers = { 'Content-Type': 'application/form-data' };
    const form = new FormData();    
    Object.keys(userData).map( key => {      
      return form.append(key, userData[key])
    });
    
    return api.post("user/profile", form, { headers });
  };

  const verifyEmail = userRequest => api.post("user/verifyEmail", userRequest);
  const forgotPassword = ({ email }) =>
    api.post("user/forgotPassword", { email });
  const resetPassword = ({ userId, code, newPassword, confirmPassword }) =>
    api.post("user/resetPassword", {
      userId,
      code,
      newPassword,
      confirmPassword
    });

  const changePassword = ({ currentPassword, newPassword, confirmPassword }) =>
    api.post("user/change-password", {
      currentPassword,
      newPassword,
      confirmPassword
    });

  return {
    accounts: {
      signup,
      verifyEmail,
      forgotPassword,
      resetPassword,
      getUserProfile,
      updateUserProfile,
      changePassword
    }
  };
}
