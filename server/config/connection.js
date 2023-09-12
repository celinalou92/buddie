import { connect, connection } from "mongoose";

connect(process.env.MONGODB_URI || "mongodb://localhost/buddie", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

export default connection;
