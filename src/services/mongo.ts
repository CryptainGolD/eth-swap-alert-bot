import { MongoClient } from "mongodb";
import { URI, DB, COL_USERS } from "../config";

const mongoClient = new MongoClient(URI);

let colUsers: any;

export const ConnectDB = async () => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(DB);
    colUsers = db.collection(COL_USERS);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("⚠️ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export { colUsers };
