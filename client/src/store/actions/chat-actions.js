export const requestConvos = () => ({
  type: "REQUEST_CONVOS",
});

export const receiveConvos = (convos) => ({
  type: "RECEIVE_CONVOS",
  convos,
});

export const receiveAllConvos = () => ({
  type: "RECEIVED_ALL_CONVOS",
});

export const requestConvosError = () => ({
  type: "REQUEST_CONVOS_ERROR",
});
