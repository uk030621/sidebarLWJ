import { MongoClient } from "mongodb";

// Load environment variables
const uri = process.env.MONGODB_URI;
const collectionName = "users"; // Adjust to match your MongoDB collection

let client, db;

// Connect to the database
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    const dbName = new URL(uri).pathname.substring(1);
    db = client.db(dbName);
  }
  return db;
}

// Helper function to capitalize each word in a string
function capitalizeName(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Handle POST (Create) - Add a new user
export async function POST(request) {
  try {
    const { email, name, ...userData } = await request.json();
    const normalizedEmail = email.toLowerCase();
    const capitalizedName = capitalizeName(name); // Capitalize name

    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    const existingUser = await collection.findOne({ email: normalizedEmail });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409, // Conflict
      });
    }

    await collection.insertOne({
      email: normalizedEmail,
      name: capitalizedName,
      ...userData,
    });
    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

// Handle GET (Read) - Fetch all users or a single user by email
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.toLowerCase();
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    if (email) {
      const user = await collection.findOne({ email });
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(user), { status: 200 });
    } else {
      const users = await collection.find({}).toArray();
      return new Response(JSON.stringify(users), { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

// Handle PUT (Update) - Update user data by email
export async function PUT(request) {
  try {
    const { email, name, ...updates } = await request.json();
    const normalizedEmail = email.toLowerCase();

    const capitalizedName = name ? capitalizeName(name) : undefined;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    // Remove _id from updates to prevent modification of the immutable field
    if ("_id" in updates) {
      delete updates._id;
    }

    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    const updateData = {
      ...updates,
      ...(capitalizedName ? { name: capitalizedName } : {}),
    };

    const result = await collection.updateOne(
      { email: normalizedEmail },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "User updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

// Handle DELETE (Delete) - Remove a user by email
export async function DELETE(request) {
  try {
    const { email } = await request.json();
    const normalizedEmail = email.toLowerCase();
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);

    const result = await collection.deleteOne({ email: normalizedEmail });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
