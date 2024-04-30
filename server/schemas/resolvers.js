// created this after setting up our query in typeDefs.js
import models from "../models/index.js";
// import signin token
import { signToken } from "../utils/auth.js";

const { User, Task, Message } = models;
const resolvers = {
  Query: {
    applicationPassword: async (_, __, context) => {
      if (context.applicationPassword) {
        return true;
      }
      throw new Error("Please Enter the Application Password");
    },
    // authentication
    // must define context in server.js for this to work
    // use utils middleware to add logic
    me: async (parent, args, context) => {
      const userData = context.data;
      try {
        if (userData) {
          const meData = await User.findOne({ _id: userData._id })
            .select("-__v -password")
            .populate("tasks");
          // .populate("friends");
          return meData;
        }
      } catch (e) {
        throw new Error("Not logged in", console.log(e));
      }
    },
    // -------- get all tasks ------ //
    tasks: async () => {
      return Task.find();
    },
    // -------- get all tasks by assignedID------ //
    usersTasks: async (parent, { assignedID }) => {
      return Task.find({ assignedID });
    },
    // -------------- find a single task -------------- //
    task: async (parent, { _id }) => {
      return Task.findOne({ _id });
    },
    // -------------- get all users -------------- //
    users: async (context) => {
      return User.find().select("-__v -password").populate("tasks");
    },
    messages: async () => {
      return Message.find().sort({ createdAt: -1 });
    },
    // find a single thought
    message: async (parent, { _id }) => {
      return Message.findOne({ _id });
    },

    // -------------- get a user by username -------------- //
    user: async (parent, { username }) => {
      return (
        User.findOne({ username })
          // .select("-__v -password")
          .populate("tasks")
      );
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (e) {
        throw new Error("User creation err", console.log(e));
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(
          "Incorrect credentials: No user associated to this email"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Incorrect credentials: Incorrect Password");
      }

      const token = signToken(user);
      return { token, user };
    },
    
    addMessage: async (parent, args, context) => {
      const userData = context.data;

      if (userData.username) {
        const message = await Message.create({
          ...args,
          username: userData.username,
        });

        await User.findOneAndUpdate({ _id: userData._id }, { new: true });
        return message;
      }
      throw new Error("You need to be logged in!");
    },
    deleteMessage: async (parent, args, context) => {
      const userData = context.data;
      if (userData.username) {
        const message = await Message.findOneAndRemove({
          ...args,
          username: userData.username,
        });
        await User.findByIdAndUpdate(
          { _id: userData._id },
          { $pull: { message: message._id } }
          // { new: true }
        );
        return message;
      }
      throw new Error("You need to be logged in!");
    },

    addTask: async (parent, args, context) => {
      const userData = context.data;

      if (userData.username) {
        const task = await Task.create({
          ...args,
          username: userData.username,
        });

        await task.save();

        await User.findOneAndUpdate(
          { _id: userData._id },
          { $push: { tasks: task._id } },
          { new: true }
        );

        return task;
      }
      throw new Error("You need to be logged in!");
    },

    deleteTask: async (parent, args, context) => {
      const userData = context.data;

      if (userData.username) {
        const task = await Task.findOneAndRemove({ _id: args._id });

        await User.findByIdAndUpdate(
          { _id: userData._id },
          { $pull: { tasks: task._id } }
        );
        return task;
      }
      throw new Error("You need to be logged in!");
    },

    updateTask: async (parent, args, context) => {
      const userData = context.data;
      const taskId = args._id;
      const updatedField = {};

      if (userData.username) {
        if (args.taskStatus != null) {
          updatedField.taskStatus = args.taskStatus;
        }
        if (args.assignedID != null) {
          updatedField.assignedID = args.assignedID;
        }

        const task = await Task.findOneAndUpdate(
          { _id: taskId },
          updatedField,
          { new: true }
        );
        return task;
      }

      throw new Error("You need to be logged in!");
    },
    addReply: async (parent, { messageId, replyBody }, context) => {
      const userData = context.data;
      if (userData.username) {
        const updatedMessage = await Message.findOneAndUpdate(
          { _id: messageId },
          {
            $push: { replies: { replyBody, username: userData.username } },
          },
          { new: true, runValidators: true }
        );
        return updatedMessage;
      }
      throw new Error("You need to be logged in!");
    },

    // addFriend: async (parent, { friendId }, context) => {
    //   const userData = context.data
    //   if (userData.username) {
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: userData._id },
    //       { $addToSet: { friends: friendId } },
    //       { new: true }
    //     ).populate("friends");
    //     return updatedUser;
    //   }
    //   throw new Error("You need to be logged in!");
    // },
  },
};

export default resolvers;
