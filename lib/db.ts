import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        // In production, this error should be fatal.
        // In dev, we might want to warn if we're just building UI.
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
        } else {
            console.warn("MONGODB_URI is not defined. Database features will not work.");
            return null; // Graceful degradation for UI work
        }
    }

    // Explicit check for undefined to satisfy TypeScript strict null checks if we don't return early
    if (!MONGODB_URI) return null;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
