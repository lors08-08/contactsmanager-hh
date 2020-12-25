const initialState = {
  id: null,
  login: null,
  password: null,
  token: localStorage.getItem("auth-token"),

  contacts: [],

  authorizing: false,
  error: false,
};

function logging(state = initialState, action) {
  switch (action.type) {
    case "admin/login/start":
      return {
        ...state,
        authorizing: true,
        error: false,
      };
    case "admin/login/succeed":
      return {
        ...state,
        ...action.payload[0],
        authorizing: false,
      };
    case "admin/login/failed":
      return {
        ...state,
        authorizing: false,
        error: true,
      };
    case "admin/logout":
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}

export default logging;
