import { Button, FormControl, Input, InputLabel, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Modal } from '@material-ui/core';
import React, { useState }from 'react';
import '../component/Todo.css';
import db from '../services/firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.spacing[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setopen] = useState(false)
    const [input, setinput] = useState(props.text.todo);
    const handleOpen = () => {
        setinput(props.text.todo);
        setopen(true);
    }

    const updateTodo = () => {

        db.collection('todos').doc(props.text.id).set({
            todo: input
        },{ merge: true})
        setopen(false);

    }
    return (
        <>
        <Modal open={open} onClose={e => {
            setopen(false);
            setinput(props.text.todo);
            }}>
            <div className={`modal_center ${classes.paper}`}>
                <div class="modal_header">
                    <h1>You can edit now...</h1>
                    <CloseIcon onClick={e => {
                        setopen(false);
                        setinput(props.text.todo);
                    }}></CloseIcon>
                </div>
                <form>
                    <FormControl>
                        <InputLabel>ToDo :</InputLabel>
                        <Input value={input} onChange={event => setinput(event.target.value)} />
                    </FormControl>
                </form>
                <Button disabled={!input } type="submit" onClick={updateTodo} variant="contained" color="primary">Update ToDo</Button>
            </div>
        </Modal>
        <List className="todo_list">
            <ListItem>  
            <ListItemText primary={props.text.todo} secondary={props.text.time}></ListItemText>
            </ListItem>
            <EditIcon onClick={e => setopen(true)}></EditIcon>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.text.id).delete()}>DELETE ME</DeleteForeverIcon>
        </List>
        </>
    )
}

export default Todo;
