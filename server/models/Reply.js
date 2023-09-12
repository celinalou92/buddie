import { Schema } from 'mongoose';
import dateFormatter from '../utils/dateFormat.js';

const replySchema = new Schema(
  {
    replyBody: {
      type: String,
      
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormatter(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

export default replySchema;
