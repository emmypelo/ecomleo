import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password?: string; // Optional for OAuth users
  image?: string;
  provider?: string; // To track authentication method (google, github, credentials)
  providerAccountId?: string; // Store the provider's account ID
  emailVerified?: Date; // For email verification
  role?: string; // For role-based access control
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      // Not required for OAuth users
      validate: {
        validator: function (this: IUser, v: string) {
          // Only validate password if it's provided and the user is not using OAuth
          return !v || !this.provider || v.length >= 8;
        },
        message: "Password must be at least 8 characters long",
      },
    },
    image: {
      type: String,
      trim: true,
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "github", undefined],
    },
    providerAccountId: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        // Don't expose password in JSON
        delete ret.password;
      },
    },
  }
);

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ provider: 1, providerAccountId: 1 });

// Virtual for full name
userSchema.virtual("fullName").get(function (this: IUser) {
  return `${this.firstname} ${this.lastname}`;
});

// Helper method to check if user is from OAuth
userSchema.methods.isOAuthUser = function (this: IUser): boolean {
  return !!this.provider && this.provider !== "credentials";
};

// Create or get the User model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
