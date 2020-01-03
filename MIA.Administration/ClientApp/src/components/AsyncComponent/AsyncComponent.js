/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

// themify icons
const AsyncThemifyIconsComponent = Loadable({
  loader: () => import("Routes/icons/themify-icons"),
  loading: () => <RctPageLoader />
});

// Simple Line Icons
const AsyncSimpleLineIconsComponent = Loadable({
  loader: () => import("Routes/icons/simple-line-icons"),
  loading: () => <RctPageLoader />
});

// Material Icons
const AsyncMaterialIconsComponent = Loadable({
  loader: () => import("Routes/icons/material-icons"),
  loading: () => <RctPageLoader />
});

// Users List
const AsyncUsersListComponent = Loadable({
  loader: () => import("Routes/users/user-list"),
  loading: () => <RctPageLoader />
});

// Users Profile
const AsyncUserProfileComponent = Loadable({
  loader: () => import("Routes/users/user-profile"),
  loading: () => <RctPageLoader />
});

// Users Profile 1
const AsyncUserProfile1Component = Loadable({
  loader: () => import("Routes/users/user-profile-1"),
  loading: () => <RctPageLoader />
});

// Users Management
const AsyncUserManagementComponent = Loadable({
  loader: () => import("Routes/users/user-management"),
  loading: () => <RctPageLoader />
});

/*---------------- Session ------------------*/

// Session Login
const AsyncSessionLoginComponent = Loadable({
  loader: () => import("Routes/session/login"),
  loading: () => <RctPageLoader />
});

// Session Register
const AsyncSessionRegisterComponent = Loadable({
  loader: () => import("Routes/session/register"),
  loading: () => <RctPageLoader />
});

// Session Lock Screen
const AsyncSessionLockScreenComponent = Loadable({
  loader: () => import("Routes/session/lock-screen"),
  loading: () => <RctPageLoader />
});

// Session Forgot Password
const AsyncSessionForgotPasswordComponent = Loadable({
  loader: () => import("Routes/session/forgot-password"),
  loading: () => <RctPageLoader />
});

// Session Page 404
const AsyncSessionPage404Component = Loadable({
  loader: () => import("Routes/session/404"),
  loading: () => <RctPageLoader />
});

// Session Page 404
const AsyncSessionPage500Component = Loadable({
  loader: () => import("Routes/session/500"),
  loading: () => <RctPageLoader />
});

/*------------- Form Elemets -------------*/

// forms elements
const AsyncFormElementsComponent = Loadable({
  loader: () => import("Routes/forms/form-elements"),
  loading: () => <RctPageLoader />
});

// forms TextField
const AsyncTextFieldComponent = Loadable({
  loader: () => import("Routes/forms/material-text-field"),
  loading: () => <RctPageLoader />
});

// forms TextField
const AsyncSelectListComponent = Loadable({
  loader: () => import("Routes/forms/select-list"),
  loading: () => <RctPageLoader />
});

// News
const AsyncNewsComponent = Loadable({
  loader: () => import("Routes/news"),
  loading: () => <RctPageLoader />
});

export {
  AsyncThemifyIconsComponent,
  AsyncSimpleLineIconsComponent,
  AsyncMaterialIconsComponent,
  AsyncUsersListComponent,
  AsyncUserProfileComponent,
  AsyncUserProfile1Component,
  AsyncUserManagementComponent,
  AsyncSessionLoginComponent,
  AsyncSessionRegisterComponent,
  AsyncSessionLockScreenComponent,
  AsyncSessionForgotPasswordComponent,
  AsyncSessionPage404Component,
  AsyncSessionPage500Component,
  AsyncFormElementsComponent,
  AsyncTextFieldComponent,
  AsyncSelectListComponent,
  AsyncNewsComponent
};
