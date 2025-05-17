import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import NextAuth, { type NextAuthOptions } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

// Type augmentation for NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstname: string;
      lastname: string;
      provider?: string;
      role?: string;
    } & {
      email?: string | null;
      image?: string | null;
      name?: string | null;
    };
  }

  interface User {
    id: string;
    _id?: string;
    firstname: string;
    lastname: string;
    email: string;
    image?: string;
    provider?: string;
    role?: string;
  }
}

// Type augmentation for JWT
declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id: string;
    firstname: string;
    lastname: string;
    provider?: string;
    role?: string;
  }
}

// Define the auth options
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          await connectDB();

          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          // Compare password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password as string
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            _id: user._id.toString(),
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed"
          );
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      try {
        await connectDB();

        // Handle OAuth providers (Google and GitHub)
        if (account?.provider === "google" || account?.provider === "github") {
          if (!profile?.email) {
            return false; // Require email from OAuth providers
          }

          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            // Create new user if they don't exist
            await User.create({
              firstname: profile.name?.split(" ")[0] || profile.name || "",
              lastname: profile.name?.split(" ").slice(1).join(" ") || "",
              email: profile.email,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              image:
                profile.picture || profile.avatar_url || profile.image || "",
              emailVerified: new Date(),
            });
          } else if (!existingUser.provider) {
            // Update existing user with provider info if they signed up with credentials first
            existingUser.provider = account.provider;
            existingUser.providerAccountId = account.providerAccountId;
            existingUser.emailVerified =
              existingUser.emailVerified || new Date();
            await existingUser.save();
          }
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id || user._id;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.role = user.role || "user";
      }

      // If it's an OAuth sign-in, update the token with provider info
      if (account?.provider === "google" || account?.provider === "github") {
        token.provider = account.provider;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.firstname = token.firstname as string;
        session.user.lastname = token.lastname as string;
        session.user.provider = token.provider as string | undefined;
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login", // Custom error page
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Create the handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
