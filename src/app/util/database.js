import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI; // .env 파일에 연결 문자열을 저장해둘 거야
const options = { useNewUrlParser: true };

let connectDB;

if (process.env.NODE_ENV === "development") {
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect();
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
