import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export async function POST(request: Request) {
  const { firstname, lastname, email, password, confirmPassword } =
    await request.json();
  // validate email function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // Validate if all fields are filled
  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }

  // Validate if email is valid
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email" },
      { status: 400 }
    );
  }
  // Compare password and confirm password
  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Password and confirm password do not match" },
      { status: 400 }
    );
  }
  // Validate password length
  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    // Return success response
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating user:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
