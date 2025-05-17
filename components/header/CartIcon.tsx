import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CartIconProps {
  itemCount?: number;
  className?: string;
}

const CartIcon = ({ itemCount = 0, className }: CartIconProps) => {
  const hasItems = itemCount > 0;

  return (
    <Link
      href="/cart"
      className={cn(
        "group relative inline-flex items-center justify-center p-1 rounded-md transition-colors",
        "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ",
        className
      )}
      aria-label={`Cart with ${itemCount} item${itemCount === 1 ? "" : "s"}`}
    >
      <ShoppingBagIcon className="w-5 h-5 transition-colors group-hover:stroke-primary" />
      {hasItems && (
        <span className="absolute -top-2 w-[18px] -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-[2px] text-[10px] font-medium bg-darkColor text-white rounded-full">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
