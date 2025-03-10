import React from "react";
import { Users, Rocket, Heart, MessageCircle, Home } from "lucide-react";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import Image from "next/image";
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        className="my-4"
      >
        <Link color="inherit" href="/" className="flex items-center gap-1">
          <Home className="w-5 h-5 text-gray-500" />
          <span className="ms-[2px]">Home</span>
        </Link>
        <span>About Us</span>
      </Breadcrumbs>
      {/* Hero Section */}
      <div className="w-full py-20 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-[#1F1F1F] mb-6">
            About Launchap
          </h1>
          <p className="text-lg text-[#1F1F1F]/80">
            A community-driven platform dedicated to uncovering the best new
            digital products every day.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* What We Do Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-lg bg-[#AF583B]/10">
              <Rocket className="w-7 h-7 text-[#AF583B]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F1F1F]">What We Do</h2>
          </div>
          <p className="text-[#1F1F1F]/80 leading-relaxed text-lg">
            We spotlight emerging tools and technologies from makers around the
            world, helping you find products that resonate with your interests.
            By creating a space for product launches, discussions, and feedback,
            we foster an environment where ideas thrive, and fresh innovations
            reach the audiences they deserve.
          </p>
        </section>

        {/* Origin Story Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-lg bg-[#198E49]/10">
              <Heart className="w-7 h-7 text-[#198E49]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F1F1F]">
              How Launchap Got Started
            </h2>
          </div>
          <p className="text-[#1F1F1F]/80 leading-relaxed text-lg">
            Launchap began as a weekend experiment—an opportunity to learn new
            tech and explore fresh ideas. Positive feedback from early users
            confirmed there was a real demand for a daily hub focused on product
            discovery and community engagement.
          </p>
        </section>

        {/* Mission Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-lg bg-[#AF583B]/10">
              <MessageCircle className="w-7 h-7 text-[#AF583B]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F1F1F]">
              Why We&apos;re Here
            </h2>
          </div>
          <p className="text-[#1F1F1F]/80 leading-relaxed text-lg">
            A love for exploring new tech products and a desire to contribute to
            the community inspired the creation of Launchap. By showcasing a
            diverse range of digital products and encouraging user-driven
            conversations, we aim to empower makers and tech enthusiasts alike.
          </p>
        </section>

        {/* Team Section */}
        <section className="bg-[#F5F5F5] p-8 rounded-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-[#198E49]/10">
              <Users className="w-7 h-7 text-[#198E49]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F1F1F]">
              Who&apos;s Behind Launchap
            </h2>
          </div>
          <div className="flex gap-8 items-start">
            <Image
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80"
              alt="Shariful Islam"
              className="w-28 h-28 rounded-full object-cover ring-4 ring-white"
              height={112}
              width={112}
            />
            <div>
              <h3 className="text-xl font-semibold text-[#1F1F1F] mb-3">
                Shariful Islam
              </h3>
              <p className="text-[#1F1F1F]/80 leading-relaxed text-lg">
                A marketing professional and entrepreneur with over seven years
                of experience in the tech industry. My passion for marketing,
                SEO, and emerging technologies drives me to build a platform
                that connects innovative creators with curious explorers. If you
                have questions, ideas, or collaboration opportunities, feel free
                to reach out.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-[#AF583B] text-white text-lg font-medium rounded-lg hover:bg-[#AF583B]/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
