import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import Contact from "./Contact";
import { loadContacts, logout } from "../redux/actions";
import Loader from "./Loader";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "black",
  },
  exit: {
    display: "flex",
    justifyContent: "space-between",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    fontSize: "21px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "300px",
      },
    },
  },
}));

function Contacts() {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadContacts());
  }, [dispatch]);

  const loading = useSelector((state) => state.contacts.loading);
  const contacts = useSelector((state) => state.contacts.contacts);

  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const filterContacts = contacts.filter((item) => {
    const num = item.number;
    const text = item.name.toLowerCase();
    const lowerCaseSearch = searchValue.toLowerCase();

    return (
      text.indexOf(lowerCaseSearch) !== -1 ||
      num.indexOf(lowerCaseSearch) !== -1
    );
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className={classes.exit}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            value={searchValue}
            onChange={handleSearch}
            placeholder="Найти контакт"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <Button onClick={handleLogout} variant="outlined" color="secondary">
          Выход
        </Button>
      </div>
      {filterContacts.map((contact) => {
        return <Contact key={contact.id} contact={contact} />;
      })}
    </div>
  );
}

export default Contacts;
