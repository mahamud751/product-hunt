"use client";

import Header from "./Header/Header";

interface NavbarProps {
  authenticatedUser?: any;
  notifications?: any;
  products?: any;
  categories?: any;
}

const Navbar: React.FC<NavbarProps> = ({
  authenticatedUser,
  products,
  categories,
}) => {
  return (
    <div className="border-b py-2 md:py-0">
      <Header
        products={products}
        categories={categories}
        authenticatedUser={authenticatedUser}
      />
    </div>
  );
};

export default Navbar;
