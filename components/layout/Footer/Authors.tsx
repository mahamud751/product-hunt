import React from "react";

const AuthorCredit: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full flex justify-between  ">
      <div className="">
        {" "}
        &copy; {currentYear} Product Hunt. All rights reserved.
      </div>
      <p className="mt-7 mb-12 text-xs  text-stone-500 ">
        This website may contain affiliate links
      </p>
    </div>
  );
};

export default AuthorCredit;
