import { connectToMongoDB, disconnectFromMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs/dist/bcrypt";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) { 
                const { email, password } = credentials;

                try {
                    await connectToMongoDB(process.env.MONGODB_URL);

                    const user = await User.findOne({ email });

                    if (!user) {
                        throw new Error("Not Registered");
                    }

                    const passwordsMatched = await bcrypt.compare(password, user.password);

                    if (!passwordsMatched) {
                        throw new Error("Incorrect Password");
                    }
                    
                    await disconnectFromMongoDB();
                    return user;
                } catch (error) {
                    console.error(error);
                    throw new Error(error.message);
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: '/signin',
    },
}

export default authOptions;