import { faker } from "@faker-js/faker";
import models from "../models/index.js";
const { Message, Task, User } = models;

export const seedDB = async () => {
  await Task.deleteMany({});
  await User.deleteMany({});

  const fakeDataQty = 10;
  // create user data
  const userData = [];

  for (let i = 0; i < fakeDataQty; i += 1) {
    const username = faker.internet.userName();
    const email = faker.email(username);
    const password = faker.password({ length: 5 });

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  // for (let i = 0; i < 100; i += 1) {
  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { _id: userId } = createdUsers.ops[randomUserIndex];

  //   let friendId = userId;

  //   while (friendId === userId) {
  //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //     friendId = createdUsers.ops[randomUserIndex];
  //   }

  //   await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  // }

  // create tasks
  let createdTasks = [];
  for (let i = 0; i < fakeDataQty; i += 1) {
    const taskText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdTask = await Task.create({
      taskStatus: false,
      createdAt: new Date(),
      username: username,
      taskText: taskText,
      assignedID: userId,
    });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { tasks: createdTask._id } }
    );

    createdTasks.push(createdTask);
  }

  // create reactions
  // for (let i = 0; i < 100; i += 1) {
  //   const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
  //   const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

  //   await Thought.updateOne(
  //     { _id: thoughtId },
  //     { $push: { reactions: { reactionBody, username } } },
  //     { runValidators: true }
  //   );
  // }

  console.log("all done!");
  process.exit(0);
};

  
