import 'dotenv/config'

import mongoose from 'mongoose';

const clusterName = process.env.CLUSTER_NAME;
const dbUserName = process.env.DB_USERNAME;


const dbURI = process.env.MONGODB_URI


export const runDBClient = async() => {
  console.log(      `
  =======================
  Database Connecting... 
  =======================
  `
  )
  try {
    await mongoose.connect(dbURI).then(() => {
      console.log(      `
      =======================
      Database Connected!
      Cluster:${clusterName} User: ${dbUserName}
      =======================
      `
      )
    })
  } catch (error) {
    console.log(
      `
      =======================
      Database Error: ${error}
      =======================
      `
      )
  }
}

