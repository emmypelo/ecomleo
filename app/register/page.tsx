"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Register = () => {

  const [isHovering, setIsHovering] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [focused, setFocused] = useState<Record<string, boolean>>({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleFocus = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: false }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your registration logic here
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to register
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                id="firstname"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
                onFocus={() => handleFocus("firstname")}
                onBlur={() => handleBlur("firstname")}
                className="w-full px-3 py-2 border rounded-md peer border-gray-300 outline-none focus:ring-1 focus:ring-offset-0 focus:ring-gray-200 transition-all"
                placeholder=" "
              />
              <label
                htmlFor="firstname"
                className={`absolute text-sm duration-150 transform ${
                  focused.firstname || formData.firstname
                    ? "-translate-y-[50%] top-0 bg-white px-1 text-gray-700 left-2 z-10"
                    : "left-3 top-3 text-gray-500"
                } pointer-events-none`}
              >
                First Name
              </label>
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                id="lastname"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
                onFocus={() => handleFocus("lastname")}
                onBlur={() => handleBlur("lastname")}
                className="w-full px-3 py-2 border rounded-md peer border-gray-300 outline-none focus:ring-1 focus:ring-offset-0 focus:ring-gray-200 transition-all"
                placeholder=" "
              />
              <label
                htmlFor="lastname"
                className={`absolute text-sm duration-150 transform ${
                  focused.lastname || formData.lastname
                    ? "-translate-y-[50%] top-0 bg-white px-1 text-gray-700 left-2 z-10"
                    : "left-3 top-3 text-gray-500"
                } pointer-events-none`}
              >
                Last Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                className="w-full px-3 py-2 border rounded-md peer border-gray-300 outline-none focus:ring-1 focus:ring-offset-0 focus:ring-gray-200 transition-all"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute text-sm duration-150 transform ${
                  focused.email || formData.email
                    ? "-translate-y-[50%] top-0 bg-white px-1 text-gray-700 left-2 z-10"
                    : "left-3 top-3 text-gray-500"
                } pointer-events-none`}
              >
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                className="w-full px-3 py-2 border rounded-md peer border-gray-300 outline-none focus:ring-1 focus:ring-offset-0 focus:ring-gray-200 transition-all"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`absolute text-sm duration-150 transform ${
                  focused.password || formData.password
                    ? "-translate-y-[50%] top-0 bg-white px-1 text-gray-700 left-2 z-10"
                    : "left-3 top-3 text-gray-500"
                } pointer-events-none`}
              >
                Password
              </label>
            </div>

            {/* Confirm Password - Fixed the value binding */}
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
                className="w-full px-3 py-2 border rounded-md peer border-gray-300 outline-none focus:ring-1 focus:ring-offset-0 focus:ring-gray-200 transition-all"
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute text-sm duration-150 transform ${
                  focused.confirmPassword || formData.confirmPassword
                    ? "-translate-y-[50%] top-0 bg-white px-1 text-gray-700 left-2 z-10"
                    : "left-3 top-3 text-gray-500"
                } pointer-events-none`}
              >
                Confirm Password
              </label>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between mx-auto">
          <Button
            className="w-1/2 text-center cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: isHovering ? "#2C2B2B" : "black",
              color: "white",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleRegister}
            type="submit"
          >
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
