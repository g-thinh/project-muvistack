// ################## GET USER ###########################

export const requestCurrentUser = () => ({
  type: "REQUEST_CURRENT_USER",
});

export const receiveCurrentUser = (user) => ({
  type: "RECEIVE_CURRENT_USER",
  user,
});

export const requestCurrentUserError = () => ({
  type: "REQUEST_CURRENT_USER_ERROR",
});

// ############### SIGNOUT USER ########################

export const requestCurrentUserSignout = () => ({
  type: "REQUEST_CURRENT_USER_SIGNOUT",
});
