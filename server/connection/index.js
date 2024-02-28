import 'dotenv/config'

import mongoose from 'mongoose';

const clusterName = process.env.CLUSTER_NAME;
const dbUserName = process.env.DB_USERNAME;


const dbURI = process.env.MONGODB_URI


export const runDBClient = async() => {
  let timeleft = 10;

setInterval(function(){
 
    if(timeleft <= 0){
    clearInterval(downloadTimer);
    console.log("Finished") 
  } else {
    console.log(timeleft + " seconds remaining")
  }
  timeleft -= 1;
}, 1000);

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
      Cluster:${clusterName} 
      User: ${dbUserName}
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
      return error;
  }
}

