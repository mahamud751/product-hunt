import React, { useState } from "react";

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex overflow-hidden gap-0.5 self-stretch px-0.5 mt-4 text-sm font-medium rounded-lg border border-solid border-neutral-200 max-sm:flex-col max-sm:gap-2.5 w-[240px]"
    >
      <label htmlFor="email" className="sr-only">
        Enter your email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="overflow-hidden grow px-3 py-0.5 bg-white rounded-md text-neutral-600 text-opacity-50 max-md:pr-5 w-[140px]"
        required
      />
      <button
        type="submit"
        className="px-3.5 py-2.5 mx-0 my-auto leading-none text-center text-white whitespace-nowrap rounded-md cursor-pointer bg-neutral-800 max-sm:mt-2.5 max-sm:text-center"
      >
        Subscribe
      </button>
    </form>
  );
};

export default NewsletterForm;
