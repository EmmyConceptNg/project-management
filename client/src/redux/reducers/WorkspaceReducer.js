const initialState = {};

const WorkspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WORKSPACE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default WorkspaceReducer;
