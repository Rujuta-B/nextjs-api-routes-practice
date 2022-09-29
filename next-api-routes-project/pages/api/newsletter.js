import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://rujutab:k4TpmtgPu6N6HdBr@cluster0.ewr6ikd.mongodb.net/events?retryWrites=true&w=majority"
    );

    const db = client.db();
    await db.collection("emails").insertOne({ email: userEmail });
    client.close();

    res.status(201).json({ message: "Signed Up!" });
  }
}

export default handler;
