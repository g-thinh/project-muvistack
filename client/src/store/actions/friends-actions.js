// ############### REQUEST FRIENDS ##################

export const requestFriends = () => ({
  type: "REQUEST_FRIENDS",
});

export const receiveFriends = (friends) => ({
  type: "RECEIVE_FRIENDS",
  friends,
});

export const requestFriendsError = () => ({
  type: "REQUEST_FRIENDS_ERROR",
});
