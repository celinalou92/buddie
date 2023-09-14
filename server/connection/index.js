// const mongoose = require('mongoose');
import 'dotenv/config'

const clusterUserKey = process.env.CLUSTER_USER_KEY;
import mongoose from 'mongoose';

const clusterName = process.env.CLUSTER_NAME;
const dbUserName = process.env.DB_USERNAME;

const clusterUserInfo = dbUserName + ":" + clusterUserKey + "@" + clusterName 

const dbURI = "mongodb+srv://" + clusterUserInfo + ".tpgqs.mongodb.net/?retryWrites=true&w=majority";


export const runDBClient = async() => {
  try {
    await mongoose.connect(dbURI);
  } catch (error) {
    handleError(error);
  }
}

