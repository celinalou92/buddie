import { useMutation } from '@apollo/client';
import React from 'react';
import { DELETE_TASK } from '../utils/mutations';
import DeleteIcon from '@material-ui/icons/Delete';
import { QUERY_TASKS } from "../utils/queries";


const DeleteButton = ({task}) => {

    // --------- definie mutation to update status to in gql ---------- //
    // const [deleteTask, {error}] = useMutation(DELETE_TASK)
    // if (error) console.log(error)

    const [deleteTask, { error }] = useMutation(DELETE_TASK, {
        update(cache, { data: { deleteTask } }) {
          try {
            // read what's currently in the cache
            const { tasks } = cache.readQuery({ query: QUERY_TASKS });
            console.log(tasks)
            console.log(deleteTask)
            // prepend the newest thought to the front of the array
            // TODO: getting console err because missing field taskstatus which is added in the back end
            cache.writeQuery({
              query: QUERY_TASKS,
              data: { tasks: tasks.filter((task) => task._id !== deleteTask._id)},
            });
          } catch (e) {
            console.log(e);
          }
        },
      });

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

