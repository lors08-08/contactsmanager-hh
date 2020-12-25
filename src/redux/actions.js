export function loadContacts() {
  return (dispatch) => {
    dispatch({ type: "contacts/load/start" });

    fetch("/contacts")
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "contacts/load/succeed",
          payload: json,
        });
      });
  };
}

export function startLogIn(login, pass) {
  return (dispatch) => {
    dispatch({ type: "admin/login/start" });

    fetch(`/users?login=${login}&password=${pass}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length) {
          localStorage.setItem("auth-token", json.token);
          dispatch({
            type: "admin/login/succeed",
            payload: json,
          });
        } else {
          dispatch({
            type: "admin/login/failed",
          });
        }
      });
  };
}

export function logout() {
  localStorage.removeItem("auth-token");
  return (dispatch) => {
    dispatch({ type: "admin/logout" });
  };
}

export function editContact(id, name, number) {
  return (dispatch) => {
    dispatch({ type: "contacts/edit/start" });
    fetch(`/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        number: number,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch({
          type: "contacts/edit/succeed",
          payload: { id, name, number },
        });
      });
  };
}

export function deleteContact(id) {
  return (dispatch) => {
    dispatch({ type: "contacts/delete/start" });
    fetch(`/contacts/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        dispatch({
          type: "contacts/delete/succeed",
          payload: id,
        });
      });
  };
}
