import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

if (!process.env.MONGODB_URI) {
  throw new Error('⚠️ MONGODB_URI tidak ditemukan di .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Development: gunakan global variable untuk hot reload
if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Production: buat client baru
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper untuk get database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('portfolio'); // nama database
}

// Helper untuk close connection (optional, untuk cleanup)
export async function closeConnection(): Promise<void> {
  const client = await clientPromise;
  await client.close();
}
