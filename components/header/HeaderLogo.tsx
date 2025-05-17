import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeaderLogoProps {
  className?: string;
  title?: string;
  href?: string;
  children?: React.ReactNode;
}

const HeaderLogo = ({
  children,
  className,
  title = "Brand",
  href = "/",
}: HeaderLogoProps) => {
  return (
    <Link
      href={href}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-darkColor rounded-sm"
      aria-label={`${title} - Back to home`}
    >
      <h2
        className={cn(
          "text-2xl text-darkColor font-black tracking-wider uppercase ",
          className
        )}
      >
        {children || title}
      </h2>
    </Link>
  );
};

export default HeaderLogo;
