import { Button, Card } from "@mui/material";
import { ArrowRight } from "lucide-react";

const Blogs = () => {
  return (
    <div>
      <section className="py-16 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Popular Alternatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "VS Code",
                description: "Open source alternatives to Visual Studio Code",
                alternatives: ["Atom", "Sublime Text", "Neovim"],
                image:
                  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300",
              },
              {
                title: "Photoshop",
                description: "Free alternatives to Adobe Photoshop",
                alternatives: ["GIMP", "Krita", "Inkscape"],
                image:
                  "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=300",
              },
              {
                title: "Slack",
                description: "Open source team chat alternatives",
                alternatives: ["Matrix", "Mattermost", "Rocket.Chat"],
                image:
                  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300",
              },
            ].map((item, i) => (
              <article className="overflow-hidden pb-6 rounded-lg border border-solid bg-neutral-50 border-neutral-200 max-w-[307px]">
                <figure className="w-full">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/34a908a46b1b2f41538c9649a433bf943f58d2637aee84cc4adf397bde143f1c?placeholderIfAbsent=true&apiKey=e4c55b3835e0471b869cabb50a0b8cd9"
                    alt="Website Analytics Tools"
                    className="object-contain w-full aspect-[1.78]"
                  />
                </figure>

                <div className="flex flex-col items-start px-5 mt-6 w-full">
                  <header>
                    <h2 className="text-xl font-semibold tracking-tight leading-7 text-stone-900">
                      7 Open-Source Tools for
                      <br />
                      Better Website Analytics
                    </h2>
                  </header>

                  <p className="self-stretch mt-6 text-sm leading-5 text-neutral-600">
                    If you are running a website, SaaS, or
                    <br />
                    online business, having a good analytics…
                  </p>

                  <footer className="flex gap-2.5 mt-6 text-xs leading-none text-neutral-500">
                    <time className="grow" dateTime="2025-01-14">
                      Jan 14, 2025
                    </time>
                    <span className="my-auto">•</span>
                    <span>4 min read</span>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
