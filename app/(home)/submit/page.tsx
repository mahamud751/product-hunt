import React from "react";
import {
  CheckCircle2,
  Rocket,
  Users,
  BarChart2,
  Search,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";

const testimonialAvatar =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80";
const screenshotImage =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80";

const testimonials = [
  {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    name: "Sarah Chen",
    role: "Founder, TechStart",
    quote:
      "The directory submission service saved me countless hours. My startup's visibility increased dramatically within weeks!",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    name: "Michael Roberts",
    role: "CEO, DataFlow",
    quote:
      "Our organic traffic doubled after getting listed on these directories. The ROI has been incredible!",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    name: "David Kumar",
    role: "Founder, AIStack",
    quote:
      "The manual submissions ensure quality listings. We've seen a significant boost in our domain authority.",
  },
];

const Submit = () => {
  return (
    <div className="bg-white text-[#1F1F1F]">
      {/* Hero Section */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Ultimate Product Submission Sites List
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6">
            Your Free Marketing Tool for Maximum Exposure
          </h2>
          <p className="text-lg mb-8">
            Promote your product across the most popular directories and
            communities with ease. Leverage this proven strategy to boost
            visibility and gain traction for your startup.
          </p>
          <button className="cta-primary mb-8">
            Busy? Let us submit for you (save 50+ hours)
          </button>
          <div className="flex items-center justify-center gap-4">
            <Rocket className="text-[#AF583B]" />
            <p className="font-semibold">
              Supercharge your Domain Authority and SEO
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <img
              src={testimonialAvatar}
              alt="Customer Avatar"
              className="w-10 h-10 rounded-full"
            />
            <p>Used by 1000+ founders</p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="bg-[#F5F5F5] px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            A Few Screenshots of What You Are Getting
          </h2>
          <p className="text-center text-lg mb-12">
            Our customers achieved incredible outcomes in just 30 days!
          </p>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img
              src={screenshotImage}
              alt="Dashboard Screenshot"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Service Introduction */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Directory Submissions as a Service
          </h2>
          <div className="bg-[#F5F5F5] p-8 rounded-xl mb-12">
            <p className="text-xl mb-6">
              🚀 Submit Your Startup To Top 50+ Directories Super Fast With Zero
              Hassle ⚡️
            </p>
            <p className="mb-8">
              We take away the boring, time-sucking task of launching by
              manually submitting your startup to relevant directories and
              websites, saving you hours of work and hassle. Starting at just
              £199.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-[#198E49] shrink-0" size={24} />
                  <span>Increase your brand recognition and visibility</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-[#198E49] shrink-0" size={24} />
                  <span>
                    Get discovered by thousands of potential customers
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-[#198E49] shrink-0" size={24} />
                  <span>
                    Boost your Domain Authority and SEO rankings instantly
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-[#198E49] shrink-0" size={24} />
                  <span>
                    Manual submissions only (We don&apos;t use potentially
                    harmful bots)
                  </span>
                  )
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory List Table */}
      <section className="bg-[#F5F5F5] px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            The List: 102 Verified Directories and Communities
          </h2>
          <p className="text-center mb-8">
            You need to go to the management page of your product to access all
            the benefits of the list.
          </p>
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Pop
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      DS
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Traffic
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">10</td>
                    <td className="px-6 py-4">87</td>
                    <td className="px-6 py-4">5.5M</td>
                    <td className="px-6 py-4 font-medium">AlternativeTo</td>
                    <td className="px-6 py-4">
                      <button className="text-[#AF583B] hover:underline">
                        Submit
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">10</td>
                    <td className="px-6 py-4">90</td>
                    <td className="px-6 py-4">3.2M</td>
                    <td className="px-6 py-4 font-medium">Product Hunt</td>
                    <td className="px-6 py-4">
                      <button className="text-[#AF583B] hover:underline">
                        Submit
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">10</td>
                    <td className="px-6 py-4">89</td>
                    <td className="px-6 py-4">13.5M</td>
                    <td className="px-6 py-4 font-medium">Hacker News</td>
                    <td className="px-6 py-4">
                      <button className="text-[#AF583B] hover:underline">
                        Submit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#F5F5F5] px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Submission List?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl">
              <Users className="text-[#AF583B] mb-4" size={32} />
              <h3 className="font-semibold text-xl mb-3">Tried & Trusted</h3>
              <p>
                Used daily by marketers and founders worldwide, ensuring maximum
                exposure and credibility.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <BarChart2 className="text-[#AF583B] mb-4" size={32} />
              <h3 className="font-semibold text-xl mb-3">
                Visibility & SEO Boost
              </h3>
              <p>
                Increase your product&apos;s visibility and SEO ranking by
                securing listings on influential directories.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <Search className="text-[#AF583B] mb-4" size={32} />
              <h3 className="font-semibold text-xl mb-3">
                Optimized Submission Process
              </h3>
              <p>
                Step-by-step instructions make it easy to track your progress
                with AI-powered tools.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <Clock className="text-[#AF583B] mb-4" size={32} />
              <h3 className="font-semibold text-xl mb-3">Always Up-to-Date</h3>
              <p>
                We continuously monitor all directories, so you never waste time
                on outdated platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-center mb-12">
            Limited-Time Offer: $50 OFF – First 25 customers (10 left)
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="pricing-card">
              <h3 className="text-2xl font-bold mb-2">Starter List</h3>
              <p className="mb-4">Ideal for newly launched websites</p>
              <div className="text-2xl font-bold mb-6">
                <span className="line-through text-gray-400">$149</span>
                <span className="ml-2">$99 USD</span>
              </div>
              <div className="feature-list">
                {[
                  "Manual submission to 30+ Directories",
                  "Done-for-you service",
                  "Boost SEO Performance",
                  "Save 20+ Hours of Your Time",
                  "Only Medium DR Directories",
                ].map((feature, index) => (
                  <div key={index} className="feature-item">
                    <CheckCircle2
                      className="text-[#198E49] shrink-0"
                      size={20}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button className="cta-primary w-full mt-8">Get Started</button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card border-4 border-[#AF583B]">
              <div className="inline-block bg-[#AF583B] text-white px-4 py-1 rounded-full text-sm mb-4">
                Most Popular!
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro List</h3>
              <p className="mb-4">Best for boosting SEO and online presence</p>
              <div className="text-2xl font-bold mb-6">
                <span className="line-through text-gray-400">$199</span>
                <span className="ml-2">$149 USD</span>
              </div>
              <div className="feature-list">
                {[
                  "Manual submission to 60+ Directories",
                  "Done-for-you service",
                  "Boost SEO Performance",
                  "Save 40+ Hours of Your Time",
                  "Only High DR Directories",
                ].map((feature, index) => (
                  <div key={index} className="feature-item">
                    <CheckCircle2
                      className="text-[#198E49] shrink-0"
                      size={20}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button className="cta-secondary w-full mt-8">Get Started</button>
            </div>

            {/* Premium Plan */}
            <div className="pricing-card">
              <h3 className="text-2xl font-bold mb-2">Premium List</h3>
              <p className="mb-4">The ultimate choice for aggressive growth</p>
              <div className="text-2xl font-bold mb-6">
                <span className="line-through text-gray-400">$249</span>
                <span className="ml-2">$199 USD</span>
              </div>
              <div className="feature-list">
                {[
                  "Manual submission to 100+ Directories",
                  "Done-for-you service",
                  "Boost SEO Performance",
                  "Save 70+ Hours of Your Time",
                  "Only High DR Directories",
                ].map((feature, index) => (
                  <div key={index} className="feature-item">
                    <CheckCircle2
                      className="text-[#198E49] shrink-0"
                      size={20}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button className="cta-primary w-full mt-8">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              100+ Founders Are Submitting Faster!
            </h2>
            <p className="text-lg mb-4">
              Don&apos;t just take our word for it&mdash;here&apos;s what
              successful founders are saying about Directories!
            </p>

            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="fill-[#AF583B] text-[#AF583B]"
                  size={24}
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.quote}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg mb-6">
              🚀 Get started today and supercharge your product&apos;s reach!
            </p>

            <button className="cta-primary inline-flex items-center gap-2">
              Get Started Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F5F5F5] px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do you submit to Product Hunt?",
                a: "No, we do not submit to Product Hunt. We recommend submitting to similar websites on your own.",
              },
              {
                q: "Do you use bots?",
                a: "No! All submissions are done manually by our team. Using bots can potentially harm your SEO efforts.",
              },
              {
                q: "Can you guarantee listings?",
                a: "No, each website has its own criteria for listings. Although we cannot guarantee a listing, we'll definitely try our best.",
              },
              {
                q: "Do you submit to paid-only directories?",
                a: "Yes, our service includes submissions to some paid-only directories but not all.",
              },
              {
                q: "What happens after I've paid?",
                a: "After you've paid, you'll be redirected to a short onboarding form where we'll ask you some simple questions about your startup.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Boost Your App, Submit, Earn!
          </h2>
          <p className="text-lg mb-8">
            Don&apos;t waste more time—increase your startup&apos;s online
            presence now!
          </p>

          <p className="text-[#AF583B] font-semibold mb-8">
            💰 $50 off – only 10 spots left!
          </p>
          <button className="cta-primary inline-flex items-center gap-2">
            Get Directories
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Submit;
