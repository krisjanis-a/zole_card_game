export const ADD_COLLECTIVE_DUE = "ADD_COLLECTIVE_DUE";
export const REMOVE_COLLECTIVE_DUE = "REMOVE_COLLECTIVE_DUE";
export const RESET_COLLECTIVE_DUES = "RESET_COLLECTIVE_DUES";

export const addCollectiveDue = () => ({
  type: ADD_COLLECTIVE_DUE,
});

export const removeCollectiveDue = () => ({
  type: REMOVE_COLLECTIVE_DUE,
});

export const resetCollectiveDues = () => ({
  type: RESET_COLLECTIVE_DUES,
});
