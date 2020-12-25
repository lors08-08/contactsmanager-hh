const initialState = {
  loading: false,
  editing: false,
  contacts: [],
};

function contacts(state = initialState, action) {
  switch (action.type) {
    case "contacts/load/start":
      return {
        ...state,
        loading: true,
      };
    case "contacts/load/succeed":
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case "contacts/edit/start":
      return {
        ...state,
        editing: true,
      };
    case "contacts/edit/succeed":
      return {
        ...state,
        editing: false,
        contacts: state.contacts.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              name: action.payload.name,
              number: action.payload.number,
            };
          }
          return item;
        }),
      };
    case "contacts/delete/start":
      return {
        ...state,
        editing: true,
      };
    case "contacts/delete/succeed":
      return {
        ...state,
        contacts: state.contacts.filter((item) => item.id !== action.payload),
        editing: false,
      };
    default:
      return state;
  }
}

export default contacts;
