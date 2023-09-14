import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config'

const clusterUserKey = process.env.CLUSTER_USER_KEY;
const clusterName = process.env.CLUSTER_NAME;
const dbUserName = process.env.DB_USERNAME;

const clusterUserInfo = dbUserName + ":" + clusterUserKey + "@" + clusterName 

const dbURI = "mongodb+srv://" + clusterUserInfo + ".tpgqs.mongodb.net/?retryWrites=true&w=majority";


export const runDBClient = async() => {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(dbURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log("Connecting");
    await client.connect();    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);
