import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';

/**
 * API Health Check Route
 * Strictly verifies the MongoDB connection state
 */
export async function GET() {
    try {
        // Attempt to connect/retrieve connection
        const db = await connectToDatabase();

        // Mongoose readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        const isConnected = mongoose.connection.readyState === 1;

        if (isConnected && db) {
            return NextResponse.json({ status: 'online' }, { status: 200 });
        } else {
            return NextResponse.json({ status: 'offline' }, { status: 503 });
        }
    } catch (error) {
        console.error("Status Check Error:", error);
        return NextResponse.json({ status: 'offline' }, { status: 503 });
    }
}
