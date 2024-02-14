import { useMutation } from '@apollo/client';
import React from 'react';
import { DELETE_TASK } from '../utils/mutations';
import DeleteIcon from '@material-ui/icons/Delete';
import { QUERY_TASKS } from '../utils/queries';



const DeleteButton = ({task}) => {

    // --------- definie mutation to update status to in gql ---------- //
    const [deleteTask, {error}] = useMutation(DELETE_TASK)
    if (error) console.log(error)

    // ---------------------- handle onClick ---------------------- //
    const handleClick = (variables) => {
        const {id} = variables
        // ---------------------- Update back end ---------------------- //
        deleteTask({variables: {_id: id}});
    }

    return (

        <button className="deleteBtn" color="secondary" aria-label="delete" value={task._id} onClick={() => handleClick({id:task._id})}>
            <DeleteIcon />
        </button>

    )
}



export default DeleteButton

