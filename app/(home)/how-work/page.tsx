import React from "react";
import {
  Calendar,
  Trophy,
  Mail,
  Rocket,
  Zap,
  Tag,
  HelpCircle,
  Search,
  Users,
  ChevronRight,
  Clock,
  Award,
  CheckCircle,
  Star,
  MessageCircle,
} from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F5F5F5] p-6 rounded-xl">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-[#AF583B] rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-[#1F1F1F]">{title}</h3>
          <div className="text-gray-600 space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

function StreakBadge({ days, perks }: { days: number; perks: string[] }) {
  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-5 h-5 text-[#AF583B]" />
        <span className="font-semibold text-[#1F1F1F]">{days}-Day Streak</span>
      </div>
      <ul className="space-y-1">
        {perks.map((perk, index) => (
          <li
            key={index}
            className="text-sm text-gray-600 flex items-start gap-2"
          >
            <span className="text-[#198E49]">•</span> {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LeaderboardCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-[#1F1F1F] mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#F5F5F5] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-[#1F1F1F] mb-6">
            How Launchap Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Launchap is your go-to platform to discover new products and promote
            your own. Our mission is to empower makers with a fair, transparent
            system for showcasing their innovations—while giving the community
            an exciting space to uncover the next big thing.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* Daily Launches */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8">
              1. Daily Launches
            </h2>
            <div className="bg-[#F5F5F5] p-8 rounded-xl mb-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-[#AF583B] rounded-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-[#1F1F1F]">
                    Launch Schedule
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Every day at 12:00 AM PST, a new set of products goes live
                      on the Launchap homepage. These Daily Launches receive
                      prominent visibility for their first 24 hours, making it
                      easier for our community to spot and support fresh ideas.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        10–20 products launch each day, each with its own
                        dedicated spot
                      </li>
                      <li>
                        Products are ranked by community upvotes—so the more
                        people love your product, the higher it climbs
                      </li>
                      <li>
                        After launch day, products remain discoverable and
                        continue collecting upvotes, comments, and followers
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rankings & Badges */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8">
              2. Rankings & Badges
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-[#1F1F1F]">
                  Dynamic Leaderboards
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <LeaderboardCard
                    title="Daily"
                    description="See what's trending right now"
                  />
                  <LeaderboardCard
                    title="Weekly"
                    description="Discover the top hits of the week"
                  />
                  <LeaderboardCard
                    title="Monthly"
                    description="Track the rising stars over the month"
                  />
                  <LeaderboardCard
                    title="Yearly"
                    description="Celebrate the consistent favorites"
                  />
                </div>
              </div>

              <div className="bg-[#F5F5F5] p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-[#1F1F1F]">
                  Podium Badges
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FFD700] rounded-full">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-600">Gold for 1st place</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#C0C0C0] rounded-full">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-600">Silver for 2nd place</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#CD7F32] rounded-full">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-600">Bronze for 3rd place</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter & Launch Process */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8">
              3. Newsletter Spotlight
            </h2>
            <FeatureCard icon={Mail} title="Weekly Newsletter">
              <p>
                Each week, we send out a newsletter to our growing community of
                users. The top-performing products across our leaderboards get
                featured—including a brief highlight, screenshot, and direct
                link to your product page.
              </p>
              <p className="mt-2">
                It&apos;s a powerful way to get discovered by even more
                potential users and fans.
              </p>
            </FeatureCard>
          </section>

          {/* Launch Process */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8">
              4. Submitting & Launching Your Product
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard icon={Rocket} title="Choose Your Launch Path">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#1F1F1F]">
                      Free Launch (Queued)
                    </h4>
                    <p>
                      Your product is placed in a waiting line. You&apos;ll get
                      an auto-assigned launch date, so keep an eye on your
                      dashboard for updates.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F1F1F]">
                      Skip the Line (Paid)
                    </h4>
                    <p>
                      For $30, you can pick your exact launch date, perfect for
                      coordinating marketing campaigns or big announcements.
                    </p>
                  </div>
                </div>
              </FeatureCard>

              <FeatureCard icon={CheckCircle} title="Prepare for Launch">
                <ul className="space-y-2">
                  <li>
                    • Optimize your product page with compelling descriptions
                    and visuals
                  </li>
                  <li>• Add relevant links and social media connections</li>
                  <li>• Rally your supporters for launch day engagement</li>
                  <li>• Prepare your community for upvotes and feedback</li>
                </ul>
              </FeatureCard>
            </div>
          </section>

          {/* Upvote Streaks */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8">
              5. Power Up with Upvote Streaks
            </h2>
            <p className="text-gray-600 mb-6">
              We value your active participation on Launchap. Each day you log
              in and upvote products, you extend your Upvote Streak—and unlock
              perks that give you extra voting power, queue-skipping benefits,
              and exclusive discounts.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <StreakBadge
                days={5}
                perks={["2x Upvote Power", "5% service discount"]}
              />
              <StreakBadge
                days={100}
                perks={[
                  "3x Upvote Power",
                  "First avatar border",
                  "20% service discount",
                ]}
              />
              <StreakBadge
                days={1000}
                perks={["5x Upvote Power", "40% service discount"]}
              />
            </div>
            <div className="mt-8 bg-[#F5F5F5] p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-[#1F1F1F]">
                Additional Milestone Rewards
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[25, 50, 150, 300, 500].map((days) => (
                  <div key={days} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-[#AF583B]" />
                    <span className="text-gray-600">
                      {days}-Day Streak Benefits Available
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Deals & Special Offers */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8">
              6. Deals & Special Offers
            </h2>
            <FeatureCard icon={Tag} title="Exclusive Deals">
              <p>
                Makers can offer exclusive deals for Launchap users—a discount,
                extended free trial, or any special perk. Products featuring
                these deals get a &apos;Special Deal&apos; badge on their page
                and in search results, drawing extra attention and encouraging
                more users to check them out.
              </p>
            </FeatureCard>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8">
              7. Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-[#F5F5F5] p-6 rounded-xl">
                <div className="flex gap-4">
                  <HelpCircle className="w-6 h-6 text-[#AF583B] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F1F1F] mb-2">
                      Is launching free?
                    </h3>
                    <p className="text-gray-600">
                      Yes! You can always queue for a free launch date. If you
                      need a specific day, you can choose to Skip the Line for
                      $30.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F5F5] p-6 rounded-xl">
                <div className="flex gap-4">
                  <HelpCircle className="w-6 h-6 text-[#AF583B] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F1F1F] mb-2">
                      Does Skip the Line guarantee top placement?
                    </h3>
                    <p className="text-gray-600">
                      No—upvotes determine your ranking. Skipping the line only
                      lets you pick your launch date. Engagement from the
                      community is what ultimately boosts your position.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F5F5] p-6 rounded-xl">
                <div className="flex gap-4">
                  <HelpCircle className="w-6 h-6 text-[#AF583B] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F1F1F] mb-2">
                      How are votes counted over time?
                    </h3>
                    <p className="text-gray-600">
                      Our leaderboards are dynamic. If users keep discovering
                      and upvoting your product weeks or months after launch,
                      you can still climb into weekly, monthly, or yearly top
                      positions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Discover & Engage */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8">
              8. Discover & Engage
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#F5F5F5] p-6 rounded-xl">
                <Search className="w-6 h-6 text-[#AF583B] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#1F1F1F]">
                  Browse & Discover
                </h3>
                <p className="text-gray-600">
                  Explore products by category or tags to find exactly what
                  you&apos;re looking for.
                </p>
              </div>

              <div className="bg-[#F5F5F5] p-6 rounded-xl">
                <Award className="w-6 h-6 text-[#AF583B] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#1F1F1F]">
                  Shape Rankings
                </h3>
                <p className="text-gray-600">
                  Upvote your favorites to help the best products rise to the
                  top.
                </p>
              </div>

              <div className="bg-[#F5F5F5] p-6 rounded-xl">
                <MessageCircle className="w-6 h-6 text-[#AF583B] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#1F1F1F]">
                  Join Discussions
                </h3>
                <p className="text-gray-600">
                  Comment and engage with fellow makers and enthusiasts.
                </p>
              </div>
            </div>
          </section>

          {/* Join the Community */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-8">
              9. Join the Launchap Community
            </h2>
            <div className="bg-[#F5F5F5] p-8 rounded-xl">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-semibold mb-4 text-[#1F1F1F]">
                  Take the First Step
                </h3>
                <p className="text-gray-600 mb-8">
                  Whether you&apos;re looking for cutting-edge tools to boost
                  productivity or launching the next big thing, Launchap is here
                  to help you succeed.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 justify-center">
                    <button className="bg-[#AF583B] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#8f4730] transition-colors">
                      Launch Your Product
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="bg-[#198E49] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#147a3e] transition-colors">
                      Sign Up
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600">
                    Have questions? Reach out to us at{" "}
                    <a
                      href="mailto:contact@launchap.com"
                      className="text-[#AF583B] hover:underline"
                    >
                      contact@launchap.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
