const initialState = {};

const WorkspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WORKSPACE":
      return {
        ...state,
        ...action.payload,
      };
    case "REMOVE_WORKSPACE":
      return initialState;
    default:
      return state;
  }
};

export default WorkspaceReducer;
