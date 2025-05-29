import { connectDB } from "../../util/database";

export default async function handler(req, res) {
    const db = (await connectDB).db("forum");
    if (req.method === "GET") {
        const posts = await db.collection("post").find().toArray();
        res.status(200).json(posts);
    } else if (req.method === "POST") {
        const { title, content } = req.body;
        await db.collection("post").insertOne({ title, content });
        res.status(201).json({ message: "Post created!" });
    }
}
