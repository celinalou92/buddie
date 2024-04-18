import 'dotenv/config'
import models from'../models/index.js';
const { Message, Task, User} = models;



export const clearCollections = async () => {    
    console.log(      `
    =======================
    Clearing Collections... 
    =======================
    `)
  try {
    await User.deleteMany({})
    await Task.deleteMany({});
    await Message.deleteMany({});
    console.log(      `
    =======================
    Collctions Cleared... 
    =======================
    `)

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

clearCollections();

