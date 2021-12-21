export default (state = [], action) => {
  switch (action.type) {
    case "SET_TABLE":
      return action.payload;

    case "CLEAR_TABLE":
      return (state = []);

    default:
      return state;
  }
};
