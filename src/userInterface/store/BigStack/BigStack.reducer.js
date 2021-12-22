export const getInitialState = () => [];

export default (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case typeName:
      return { ...state, ...payload };

    default:
      return state;
  }
};
