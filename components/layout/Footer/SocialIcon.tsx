import React from "react";
import {
  FaRss,
  FaEnvelope,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaRegDotCircle,
} from "react-icons/fa"; // Import specific icons

const SocialIcons: React.FC = () => {
  const icons = [
    { icon: <FaRss />, label: "RSS" },
    { icon: <FaEnvelope />, label: "Email" },
    { icon: <FaGithub />, label: "GitHub" },
    { icon: <FaTwitter />, label: "Twitter" },
    { icon: <FaRegDotCircle />, label: "Butterfly" }, // Replace with actual icon if available
    { icon: <FaLinkedin />, label: "LinkedIn" },
  ];

  return (
    <div className="flex gap-2 mt-3.5 max-sm:justify-center">
      {icons.map((social, index) => (
        <div
          key={index}
          className="cursor-pointer text-xl text-stone-500"
          aria-hidden="true"
        >
          {social.icon}
        </div>
      ))}
    </div>
  );
};

export default SocialIcons;
