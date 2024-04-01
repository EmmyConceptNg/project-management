const initialState = {};

const userReducer = (state = initialState, action) => {
   console.log("Action received by userReducer:", action);
  switch (action.type) {
    case "SET_USER":
       console.log("Current state:", state);
       console.log("Payload:", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
