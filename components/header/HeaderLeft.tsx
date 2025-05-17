"use client";

import { headerData } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const HeaderLeft = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize">
        {/* Skeleton loader */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-5 w-16 bg-gray-100 animate-pulse rounded"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <nav className="hidden md:inline-flex items-center gap-3 text-sm capitalize">
      {Array.isArray(headerData) &&
        headerData.map((item) => {
          // Improved active state detection
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.title}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`
                relative group cursor-pointer 
                transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? "text-darkColor font-medium"
                    : "text-lightColor hover:text-darkColor"
                }
              `}
            >
              {item.title}
              {isActive ? (
                <div className="absolute w-full h-0.5 -bottom-0.5 bg-darkColor hoverEffect" />
              ) : (
                <>
                  <span className="absolute left-1/2 w-0 h-0.5 -bottom-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0" />
                  <span className="absolute right-1/2 w-0 h-0.5 -bottom-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0" />
                </>
              )}
            </Link>
          );
        })}
    </nav>
  );
};

export default HeaderLeft;
