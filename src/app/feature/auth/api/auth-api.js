import { connectDB } from "../../util/database";

export default async function handler(req, res) {
    const db = (await connectDB).db("forum"); // "forum"은 네가 만든 DB 이름
    if (req.method === "GET") {
        // 모든 post 가져오기
        const posts = await db.collection("post").find().toArray();
        res.status(200).json(posts);
    } else if (req.method === "POST") {
        // 새 post 추가하기
        const { title, content } = req.body;
        await db.collection("post").insertOne({ title, content });
        res.status(201).json({ message: "Post created!" });
    }
}
