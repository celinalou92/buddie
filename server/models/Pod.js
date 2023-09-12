import { Schema, model } from 'mongoose';
 
const podSchema = new Schema(
    {
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
)

const Pod = model('Pod', podSchema);


export default Pod;