import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/lib/db';
import Inquiry from '@/models/Inquiry';

// Rate limiting map (in-memory for simple implementation, normally Redis)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    institution: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters")
});

export async function POST(req: Request) {
    try {
        // 1. Rate Limiting
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const lastRequestTime = rateLimitMap.get(ip) || 0;

        if (Date.now() - lastRequestTime < RATE_LIMIT_WINDOW / MAX_REQUESTS) {
            return NextResponse.json({ message: "Too many requests. Please wait." }, { status: 429 });
        }
        rateLimitMap.set(ip, Date.now());

        // 2. Data Validation
        const body = await req.json();
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ message: result.error.issues[0].message }, { status: 400 });
        }

        // 3. Database Connection & Storage
        const db = await connectToDatabase();

        if (!db) {
            // Fallback if DB is not configured (e.g. dev mode without Mongo)
            console.log("Contact form submitted (DB not connected):", result.data);
            return NextResponse.json({ message: "Message received (Mock)" }, { status: 200 });
        }

        await Inquiry.create(result.data);

        return NextResponse.json({ message: "Inquiry transmitted successfully." }, { status: 201 });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
