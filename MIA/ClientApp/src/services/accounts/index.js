export default function (/**@type {ApisauceInstance} */ api) {
  const signup = (user) => api.post("user/nominee", user);
  const fetchUserProfile = () => api.get("user/profile");
  const updateUserProfile = (userData) => {
    const headers = { "Content-Type": "application/form-data" };
    const form = new FormData();
    Object.keys(userData).map((key) => {
      return form.append(key, userData[key]);
    });

    return api.post("user/profile", form, { headers });
  };
  const updateUserAvatar = (userData) => {
    const headers = { "Content-Type": "application/form-data" };
    const form = new FormData();
    Object.keys(userData).map((key) => {
      return form.append(key, userData[key]);
    });

    return api.post("user/avatar", form, { headers });
  };

  const verifyEmail = (userRequest) =>
    api.post("user/verifyEmail", userRequest);
  const forgotPassword = ({ email }) =>
    api.post("user/forgotPassword", { email });
  const resetPassword = ({ userId, code, newPassword, confirmPassword }) =>
    api.post("user/resetPassword", {
      userId,
      code,
      newPassword,
      confirmPassword,
    });

  const changePassword = ({ currentPassword, newPassword, confirmPassword }) =>
    api.post("user/change-password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });

  return {
    accounts: {
      signup,
      verifyEmail,
      forgotPassword,
      resetPassword,
      fetchUserProfile,
      updateUserProfile,
      changePassword,
      updateUserAvatar,
    },
  };
}
