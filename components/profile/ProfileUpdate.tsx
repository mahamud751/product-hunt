"use client";
import React, { useState } from "react";
import {
  Upload,
  Trash2,
  Plus,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Info,
  ChevronDown,
  X,
  Search,
} from "lucide-react";
import { updateUserProfile } from "@/lib/server-actions";

interface SocialLink {
  platform: string;
  url: string;
}

interface AvatarProps {
  authenticatedUser?: any;
  user?: any;
}

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

interface Skill {
  category: string;
  skills: string[];
}
const ProfileUpdate: React.FC<AvatarProps> = ({ authenticatedUser, user }) => {
  const [avatar, setAvatar] = useState<string>(
    user?.image ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
  );
  const [name, setName] = useState<string>(user?.name || "");
  const [username, setUsername] = useState<string>(user?.username || "");
  const [headline, setHeadline] = useState<string>(user?.headline || "");
  const [about, setAbout] = useState<string>(user?.about || "");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    user?.socialLinks || [
      { platform: "linkedin", url: "" },
      { platform: "twitter", url: "" },
      { platform: "github", url: "" },
      { platform: "website", url: "" },
    ]
  );
  const [experiences, setExperiences] = useState<Experience[]>(
    user?.experiences || [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]
  );
  const [education, setEducation] = useState<Education[]>(
    user?.education || [
      {
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ]
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests || []
  );
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const interests = [
    { icon: "🚀", name: "Productivity" },
    { icon: "📈", name: "Marketing" },
    { icon: "💻", name: "Tech" },
    { icon: "🎨", name: "Design" },
    { icon: "🤖", name: "AI & Machine Learning" },
  ];

  const skillsList: Skill[] = [
    {
      category: "Business & Management",
      skills: [
        "Strategic Planning",
        "Project Management",
        "Business Development",
        "Operations Management",
        "Risk Management",
      ],
    },
    {
      category: "Marketing & Digital",
      skills: [
        "Search Engine Optimization (SEO)",
        "Social Media Marketing",
        "Content Marketing",
        "Email Marketing",
        "Growth Hacking",
      ],
    },
    {
      category: "Development",
      skills: [
        "Frontend Development",
        "Backend Development",
        "Full-Stack Development",
        "Mobile App Development",
        "UI/UX Design",
      ],
    },
    {
      category: "Data & Analytics",
      skills: [
        "Data Analysis",
        "Machine Learning",
        "Artificial Intelligence",
        "Business Intelligence",
        "Data Science",
      ],
    },
  ];

  const filteredSkills = skillsList
    .map((category) => ({
      ...category,
      skills: category.skills.filter((skill) =>
        skill.toLowerCase().includes(skillSearch.toLowerCase())
      ),
    }))
    .filter((category) => category.skills.length > 0);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const addSkill = (skill: string) => {
    if (skills.length < 5 && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillSearch("");
      setCustomSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleCustomSkillAdd = () => {
    if (
      customSkill.trim() &&
      skills.length < 5 &&
      !skills.includes(customSkill.trim())
    ) {
      addSkill(customSkill.trim());
    }
  };

  const handleSaveProfile = async () => {
    try {
      const userId = authenticatedUser?.user?.id; // Replace with the actual user ID
      const updateData = {
        // image: avatar,
        name,
        username,
        headline,
        about,
        socialLinks,
        interests: selectedInterests,
        skills,
        experiences,
        education,
      };

      const updatedUser = await updateUserProfile(userId, updateData);
      console.log("Profile updated successfully:", updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F1F1F]">My Details</h1>
          <button
            className="bg-[#AF583B] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            onClick={handleSaveProfile}
          >
            Save Changes
          </button>
        </div>

        {/* Avatar Section */}
        <div className="mb-12 flex items-center gap-8">
          <div className="relative">
            <img
              src={avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer">
              <Upload className="w-5 h-5 text-[#1F1F1F]" />
              <input
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </label>
          </div>
          <div>
            <button className="text-[#1F1F1F] font-medium hover:opacity-80">
              Upload new avatar
            </button>
            <p className="text-sm text-gray-500 mt-1">
              Recommended size: 400x400px
            </p>
          </div>
        </div>

        {/* Basic Details Form */}
        <div className="space-y-6 mb-12">
          <div>
            <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
              Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
              Username
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                placeholder="Choose a unique username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Info className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Usernames are unique and cannot be changed after creation
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
              Headline
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              placeholder="A short tagline describing yourself"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
              About
            </label>
            <textarea
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B] min-h-[120px]"
              placeholder="Tell the community about yourself, your goals, and your ambitions"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-[#1F1F1F] mb-4">
            Additional Links
          </h2>
          <p className="text-gray-500 mb-4">
            Add links to your social media or any relevant sites.
          </p>

          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                  {link.platform === "linkedin" && (
                    <Linkedin className="w-6 h-6" />
                  )}
                  {link.platform === "twitter" && (
                    <Twitter className="w-6 h-6" />
                  )}
                  {link.platform === "github" && <Github className="w-6 h-6" />}
                  {link.platform === "website" && <Globe className="w-6 h-6" />}
                </div>
                <input
                  type="url"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  placeholder={`Enter your ${link.platform} URL`}
                  value={link.url}
                  onChange={(e) => {
                    const updatedLinks = [...socialLinks];
                    updatedLinks[index].url = e.target.value;
                    setSocialLinks(updatedLinks);
                  }}
                />
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => {
                    setSocialLinks(socialLinks.filter((_, i) => i !== index));
                  }}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            className="mt-4 text-[#AF583B] font-medium flex items-center gap-2 hover:opacity-80"
            onClick={() =>
              setSocialLinks([...socialLinks, { platform: "website", url: "" }])
            }
          >
            <Plus className="w-5 h-5" />
            Add another link
          </button>
        </div>

        {/* Interests */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-[#1F1F1F] mb-4">
            Your Interests
          </h2>
          <p className="text-gray-500 mb-4">
            Select as many launch tags as you want
          </p>

          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <button
                key={interest.name}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedInterests.includes(interest.name)
                    ? "bg-[#1F1F1F] text-white border-[#1F1F1F]"
                    : "border-gray-200 hover:border-[#1F1F1F]"
                }`}
                onClick={() => toggleInterest(interest.name)}
              >
                {interest.icon} {interest.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-[#1F1F1F] mb-4">
            Top Skills
          </h2>
          <p className="text-gray-500 mb-4">
            Select up to 5 skills that best describe your expertise
          </p>

          {/* Selected Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm flex items-center gap-2 group"
              >
                {skill}
                <button
                  className="text-gray-400 group-hover:text-red-500 transition-colors"
                  onClick={() => removeSkill(skill)}
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>

          {/* Skills Selector */}
          <div className="relative">
            <button
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-left flex items-center justify-between hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
            >
              <span className="text-gray-500">
                {skills.length === 5
                  ? "Maximum skills selected"
                  : "Select a skill"}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isSkillDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSkillDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg">
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                      placeholder="Search skills..."
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {filteredSkills.map((category) => (
                    <div key={category.category} className="p-2">
                      <h3 className="text-sm font-medium text-gray-500 px-2 mb-1">
                        {category.category}
                      </h3>
                      {category.skills.map((skill) => (
                        <button
                          key={skill}
                          className={`w-full px-4 py-2 text-left rounded-md hover:bg-gray-50 ${
                            skills.includes(skill)
                              ? "text-[#AF583B]"
                              : "text-gray-700"
                          } ${
                            skills.length >= 5 && !skills.includes(skill)
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            !skills.includes(skill) &&
                            skills.length < 5 &&
                            addSkill(skill)
                          }
                          disabled={
                            skills.length >= 5 && !skills.includes(skill)
                          }
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  ))}

                  {/* Custom Skill Input */}
                  <div className="p-2 border-t">
                    <p className="text-sm text-gray-500 px-2 mb-2">
                      Can't find your skill? Add a custom one:
                    </p>
                    <div className="flex gap-2 px-2">
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                        placeholder="Enter custom skill"
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleCustomSkillAdd();
                          }
                        }}
                      />
                      <button
                        className="px-4 py-2 bg-[#AF583B] text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleCustomSkillAdd}
                        disabled={!customSkill.trim() || skills.length >= 5}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {skills.length === 5 && (
            <p className="text-sm text-[#AF583B] mt-2">
              Maximum number of skills (5) reached
            </p>
          )}
        </div>

        {/* Experience */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-[#1F1F1F] mb-4">
            Experience
          </h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg space-y-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">Experience {index + 1}</h3>
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => {
                      setExperiences(experiences.filter((_, i) => i !== index));
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => {
                      const updatedExperiences = [...experiences];
                      updatedExperiences[index].company = e.target.value;
                      setExperiences(updatedExperiences);
                    }}
                  />
                  <input
                    type="text"
                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    placeholder="Role/Title"
                    value={exp.role}
                    onChange={(e) => {
                      const updatedExperiences = [...experiences];
                      updatedExperiences[index].role = e.target.value;
                      setExperiences(updatedExperiences);
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    value={exp.startDate}
                    onChange={(e) => {
                      const updatedExperiences = [...experiences];
                      updatedExperiences[index].startDate = e.target.value;
                      setExperiences(updatedExperiences);
                    }}
                  />
                  <input
                    type="date"
                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    value={exp.endDate}
                    onChange={(e) => {
                      const updatedExperiences = [...experiences];
                      updatedExperiences[index].endDate = e.target.value;
                      setExperiences(updatedExperiences);
                    }}
                  />
                </div>

                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  placeholder="Description"
                  rows={3}
                  value={exp.description}
                  onChange={(e) => {
                    const updatedExperiences = [...experiences];
                    updatedExperiences[index].description = e.target.value;
                    setExperiences(updatedExperiences);
                  }}
                />
              </div>
            ))}
          </div>

          <button
            className="mt-4 text-[#AF583B] font-medium flex items-center gap-2 hover:opacity-80"
            onClick={addExperience}
          >
            <Plus className="w-5 h-5" />
            Add another experience
          </button>
        </div>

        {/* Education */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-[#1F1F1F] mb-4">
            Education
          </h2>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg space-y-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">Education {index + 1}</h3>
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => {
                      setEducation(education.filter((_, i) => i !== index));
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) => {
                      const updatedEducation = [...education];
                      updatedEducation[index].institution = e.target.value;
                      setEducation(updatedEducation);
                    }}
                  />
                  <input
                    type="text"
                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    placeholder="Degree/Certification"
                    value={edu.degree}
                    onChange={(e) => {
                      const updatedEducation = [...education];
                      updatedEducation[index].degree = e.target.value;
                      setEducation(updatedEducation);
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    value={edu.startDate}
                    onChange={(e) => {
                      const updatedEducation = [...education];
                      updatedEducation[index].startDate = e.target.value;
                      setEducation(updatedEducation);
                    }}
                  />
                  <input
                    type="date"
                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                    value={edu.endDate}
                    onChange={(e) => {
                      const updatedEducation = [...education];
                      updatedEducation[index].endDate = e.target.value;
                      setEducation(updatedEducation);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-4 text-[#AF583B] font-medium flex items-center gap-2 hover:opacity-80"
            onClick={addEducation}
          >
            <Plus className="w-5 h-5" />
            Add another education
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className="bg-[#AF583B] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            onClick={handleSaveProfile}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
