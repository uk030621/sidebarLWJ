import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const collectionName = "users";

let client, db;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    const dbName = new URL(uri).pathname.substring(1);
    db = client.db(dbName);
  }
  return db;
}

export async function POST(request) {
  try {
    const { email, name, age, address, phone } = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    // Ensure email is unique
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already exists." }), {
        status: 400,
      });
    }

    // Insert user into the collection
    await collection.insertOne({ email, name, age, address, phone });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add user." }), {
      status: 500,
    });
  }
}
