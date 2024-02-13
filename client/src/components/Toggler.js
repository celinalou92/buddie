import { useMutation } from '@apollo/client';
import React from 'react';
import { UPDATE_TASK } from '../utils/mutations';

const Toggler = ({ task }) => {

    const [updateStatus, {error}] = useMutation(UPDATE_TASK)
    
    // ---------------------- handle onClick ---------------------- //
    const toggleStatus = () => {
        const currentStatus = task.taskStatus;
        const newStatus = !currentStatus;

        updateStatus({ variables: { _id: task._id, taskStatus: newStatus} })

        if(error){
            return  console.log
            ("Toggle Error", error)
         } 
    }

    return (
        <button className="statusBtn" 
        onClick={toggleStatus}
        >
            {task.taskStatus ? "👍🏼" : "👎🏼"}
        </button>
    )
}
export default Toggler

