import { Schema, model } from 'mongoose';
import dateFormatter from '../utils/dateFormat.js';


const taskSchema = new Schema(
    {
        taskText: {
            type: String,
            required: true,
            maxlength: 280
        },
        podID: {
            type: Schema.Types.ObjectId,
            ref: 'Pod'
        },
        username: {
            type: String
        },
        taskStatus: {
            type: Boolean,
            default: false
        },
        assignedID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormatter(timestamp)
        }
    }
)

const Task = model('Task', taskSchema);

export default Task;