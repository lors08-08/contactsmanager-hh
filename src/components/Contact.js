import React, { useState } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";
import { red } from "@material-ui/core/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { deleteContact, editContact } from "../redux/actions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#d6d6d6",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    backgroundColor: "#6b6b6b2e",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Contact(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const editing = useSelector((state) => state.contacts.editing);

  const [name, setName] = useState("");
  const [num, setNum] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleNumChange = (e) => {
    setNum(e.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseEl = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpenEdit = () => {
    setOpen(true);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (id, name, num) => {
    dispatch(editContact(id, name, num));
    setOpen(false);
  };
  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    setOpen(false);
  };

  return (
    <Card raised={true} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.contact.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon onClick={handleClick} />
          </IconButton>
        }
        title={props.contact.name}
        subheader={props.contact.number}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseEl}
      >
        <MenuItem onClick={handleClickOpenEdit}>Изменить контакт</MenuItem>
        <MenuItem onClick={() => handleDelete(props.contact.id)}>
          Удалить номер
        </MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            onChange={handleNameChange}
            placeholder={props.contact.name}
            margin="dense"
            id="name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            value={num}
            onChange={handleNumChange}
            placeholder={props.contact.number}
            margin="dense"
            id="number"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button
            onClick={() => handleEdit(props.contact.id, name, num)}
            color="primary"
          >
            Изменить
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={editing}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
}

export default Contact;
