import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        console.log('🌱 Creating new MongoClient and connecting (dev mode)')
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    } else {
        console.log('♻️ Reusing existing MongoClient promise (dev mode)')
    }
    clientPromise = global._mongoClientPromise
} else {
    console.log('🚀 Creating new MongoClient and connecting (production mode)')
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise
