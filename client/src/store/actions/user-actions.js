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

// ################## MODIFY CART ITEMS ###########################

export const postCartItem = (item) => ({
  type: "POST_CART_ITEM",
  item,
});

export const addCartItem = () => ({
  type: "ADD_CART_ITEM",
});

export const updateCartItem = () => ({
  type: "UPDATE_CART_ITEM",
});

export const deleteAllCartItems = () => ({
  type: "DELETE_ALL_CART_ITEMS",
});

export const deleteCartItem = () => ({
  type: "DELETE_CART_ITEM",
});
