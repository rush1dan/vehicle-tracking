import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();
    
        if (!username || !email || !password) {
            return new NextResponse('Missing Info', { status: 400 });
        }

        console.log("User Created Successfully");
        return new NextResponse('User Created Successfully', { status: 200 });
    } catch (error) {
        return new NextResponse(`An error occurred while registering user. ErrorMessage: ${error.message}`, { status: 500 });
    }
}