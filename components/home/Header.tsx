import React from "react";
import { Heart, Search, ShoppingCart, Utensils } from "lucide-react";

const Header = () => {
  const NavLink = [
    {
      name: "Home",
      href: "#",
    },
    {
      name: "Menu",
      href: "#",
    },
    {
      name: "Reservation",
      href: "#",
    },
    {
      name: "Contact",
      href: "#",
    },
    {
      name: "Blog",
      href: "#",
    },
  ];
  return (
    <header className="px-5 py-5">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <Utensils
                size={18}
                strokeWidth={2}
                absoluteStrokeWidth={true}
                className="cursor-pointer text-white"
              />
            </span>
            <span className="text-xl font-bold text-orange-400">Foodie</span>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            {NavLink.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="font-medium text-gray-500 hover:text-orange-500"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Search
              size={20}
              strokeWidth={2}
              absoluteStrokeWidth={true}
              className="cursor-pointer text-gray-500 hover:text-orange-500"
            />
            <ShoppingCart
              size={20}
              strokeWidth={2}
              absoluteStrokeWidth={true}
              className="cursor-pointer text-gray-500 hover:text-orange-500"
            />
            <Heart
              size={20}
              strokeWidth={2}
              absoluteStrokeWidth={true}
              className="cursor-pointer text-gray-500 hover:text-orange-500"
            />
            <button className="cursor-pointer px-4 py-2 rounded text-white bg-orange-400 hover:bg-orange-500">
              Log in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
