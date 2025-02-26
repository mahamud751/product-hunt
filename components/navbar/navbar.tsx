"use client";

import Header from "./Header/Header";

interface NavbarProps {
  authenticatedUser?: any;
  notifications?: any;
  products?: any;
}

const Navbar: React.FC<NavbarProps> = ({
  authenticatedUser,

  products,
}) => {
  return (
    <div className="border-b py-2 md:py-0">
      <Header products={products} authenticatedUser={authenticatedUser} />
    </div>
  );
};

export default Navbar;
