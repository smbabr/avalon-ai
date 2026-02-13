import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import UniversityNode from '@/models/UniversityNode';

export async function GET() {
    try {
        const db = await connectToDatabase();

        if (!db) {
            // Static fallback if DB is not connected
            return NextResponse.json(FALLBACK_DATA, { status: 200 });
        }

        const nodes = await UniversityNode.find().sort({ order: 1 });

        if (nodes.length === 0) {
            // Seed if empty for demo purposes
            await UniversityNode.insertMany(FALLBACK_DATA);
            return NextResponse.json(FALLBACK_DATA, { status: 200 });
        }

        return NextResponse.json(nodes, { status: 200 });
    } catch (error) {
        console.error("Nodes API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

const FALLBACK_DATA = [
    {
        nodeId: "NODE_01",
        name: "Avalon.QUEST",
        mission: "To transform QUEST's engineering talent into production-ready AI specialists.",
        selection: "We filter for seriousness. Only the top 5% of applicants who demonstrate discipline and logic are admitted.",
        structure: "Weekly intensive workshops, peer-review circles, and mandatory project delivery.",
        status: "Active",
        order: 1
    },
    {
        nodeId: "NODE_02",
        name: "Avalon.SBBU",
        mission: "Establishing a core team and building the initial curriculum node.",
        selection: "Focusing on local talent with a high degree of mathematical rigour.",
        structure: "Hybrid learning model with remote mentorship from the QUEST node.",
        status: "Proposal Approved",
        order: 2
    }
];
