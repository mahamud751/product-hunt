"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Link,
  Megaphone,
  ChevronDown,
  Star,
  Clock,
  BarChart3,
  Briefcase,
  RefreshCw,
  CreditCard,
  LineChart,
} from "lucide-react";

function Affiliate() {
  const [planType, setPlanType] = useState("pro");
  const [paymentInterval, setPaymentInterval] = useState("monthly");
  const [referralCount, setReferralCount] = useState(10);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Commission rates based on plan
  const commissionRates = {
    basic: { monthly: 0.15, annually: 0.2 },
    pro: { monthly: 0.25, annually: 0.3 },
    premium: { monthly: 0.35, annually: 0.4 },
  };

  // Average sale price based on plan
  const averageSalePrice = {
    basic: { monthly: 29, annually: 290 },
    pro: { monthly: 59, annually: 590 },
    premium: { monthly: 99, annually: 990 },
  };

  // Calculate estimated earnings
  const calculateEarnings = () => {
    const rate =
      commissionRates[planType as keyof typeof commissionRates][
        paymentInterval as keyof typeof commissionRates.basic
      ];
    const price =
      averageSalePrice[planType as keyof typeof averageSalePrice][
        paymentInterval as keyof typeof averageSalePrice.basic
      ];
    return (rate * price * referralCount).toFixed(2);
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="font-sans text-[#1F1F1F]">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Turn Your Audience into Passive Income!
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Join our affiliate program and earn high commissions for every
            successful referral. No limits, no upfront investment – just pure
            earnings!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-[#AF583B] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold mb-2">Up to 40% Commission</h3>
              <p className="text-sm text-gray-600">
                Earn substantial revenue on every sale you refer
              </p>
            </div>

            <div className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-[#AF583B] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold mb-2">Recurring Payouts</h3>
              <p className="text-sm text-gray-600">
                Get paid for renewals, building passive income
              </p>
            </div>

            <div className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-[#AF583B] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold mb-2">Fast Reliable Payments</h3>
              <p className="text-sm text-gray-600">
                Via PayPal & Bank Transfer with no delays
              </p>
            </div>

            <div className="bg-[#F5F5F5] p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-[#AF583B] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold mb-2">Real-Time Tracking</h3>
              <p className="text-sm text-gray-600">
                Monitor performance with detailed insights
              </p>
            </div>
          </div>

          <button className="bg-[#AF583B] hover:bg-[#964a32] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center mx-auto">
            Become an Affiliate Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F5F5F5] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Getting started is simple! Follow these 3 easy steps and start
              earning today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-[#AF583B] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Sign Up for Free</h3>
              <p>Register in under 2 minutes. No fees, no hidden costs.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-[#AF583B] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">
                Get Your Unique Referral Link
              </h3>
              <p>
                Access your affiliate dashboard and copy your unique tracking
                link.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-[#AF583B] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Promote & Earn</h3>
              <p>
                Share your link via your website, social media, email, or ads.
                Earn a commission every time someone signs up through your
                referral!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#198E49] hover:bg-[#147a3e] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center mx-auto">
              Start Earning Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See How Much You Can Earn!
            </h2>
            <p className="text-xl">
              Use the slider below to estimate your earnings based on the number
              of referrals.
            </p>
          </div>

          <div className="bg-[#F5F5F5] p-8 rounded-xl shadow-md">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Plan
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  value={planType}
                  onChange={(e) => setPlanType(e.target.value)}
                >
                  <option value="basic">Basic Plan</option>
                  <option value="pro">Pro Plan</option>
                  <option value="premium">Premium Plan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Interval
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
                  value={paymentInterval}
                  onChange={(e) => setPaymentInterval(e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Number of Referrals:{" "}
                <span className="font-bold">{referralCount}</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={referralCount}
                onChange={(e) => setReferralCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100+</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <p className="text-lg mb-2">Your Estimated Monthly Earnings</p>
              <p className="text-4xl font-bold text-[#198E49]">
                ${calculateEarnings()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Based on {referralCount} referrals with{" "}
                {commissionRates[planType as keyof typeof commissionRates][
                  paymentInterval as keyof typeof commissionRates.basic
                ] * 100}
                % commission rate
              </p>
            </div>

            <div className="text-center mt-8">
              <button className="bg-[#AF583B] hover:bg-[#964a32] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center mx-auto">
                Start Earning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#F5F5F5] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Join Our Affiliate Program?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md flex">
              <div className="mr-4">
                <DollarSign className="h-12 w-12 text-[#AF583B]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Earn Big, Work Less</h3>
                <p>
                  High commission rates, no earning limits. The more you refer,
                  the more you earn.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex">
              <div className="mr-4">
                <Clock className="h-12 w-12 text-[#AF583B]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Recurring Commissions
                </h3>
                <p>
                  Get paid for every renewal. Build a sustainable passive income
                  stream that grows over time.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex">
              <div className="mr-4">
                <BarChart3 className="h-12 w-12 text-[#AF583B]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
                <p>
                  Monitor clicks, conversions & payouts with our intuitive
                  dashboard. Always know how you're performing.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex">
              <div className="mr-4">
                <Briefcase className="h-12 w-12 text-[#AF583B]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Marketing Toolkit</h3>
                <p>
                  Banners, emails & social media graphics provided. Everything
                  you need to promote effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Affiliate Success Stories
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              See how our affiliates are making thousands in passive income!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F5F5F5] p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="John D."
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold">John D.</h3>
                  <p className="text-sm text-gray-600">Marketing Consultant</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-[#AF583B]">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="italic">
                "I made over $3,500 in my first month! The recurring commissions
                are a game-changer. This is the easiest way to generate passive
                income online."
              </p>
            </div>

            <div className="bg-[#F5F5F5] p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Sarah M."
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold">Sarah M.</h3>
                  <p className="text-sm text-gray-600">Content Creator</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-[#AF583B]">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="italic">
                "As a blogger, I've tried many affiliate programs, but this one
                has the best conversion rates by far. The recurring commissions
                have doubled my monthly income!"
              </p>
            </div>

            <div className="bg-[#F5F5F5] p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Michael T."
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold">Michael T.</h3>
                  <p className="text-sm text-gray-600">Digital Entrepreneur</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-[#AF583B]">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="italic">
                "The tracking dashboard is incredible. I can see exactly where
                my conversions are coming from and optimize my strategy. I'm now
                earning $5,000+ monthly!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F5F5F5] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Got Questions? We've Got Answers!
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How does the affiliate program work?",
                answer:
                  "After signing up, you'll receive a unique referral link. When someone signs up through your link and makes a purchase, you earn a commission.",
              },
              {
                question: "How much can I earn?",
                answer:
                  "Commissions vary based on the plan. You can earn up to 40% per sale + recurring commissions for renewals.",
              },
              {
                question: "When do I get paid?",
                answer:
                  "Payments are processed on the 15th of each month via PayPal, Bank Transfer, or Crypto.",
              },
              {
                question: "Is there a minimum payout?",
                answer:
                  "Yes, the minimum payout is $50. If you don't reach this in a month, your earnings roll over.",
              },
              {
                question: "Can I promote via ads?",
                answer:
                  "Yes, but bidding on our brand name is not allowed. Other ad methods are accepted.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left font-bold flex justify-between items-center"
                  onClick={() => toggleAccordion(index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      activeAccordion === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    activeAccordion === index ? "max-h-40 py-4" : "max-h-0 py-0"
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#AF583B] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Earnings Start Here!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of affiliates earning passive income with us. Sign up
            today and start making money!
          </p>

          <div className="bg-white text-[#1F1F1F] p-4 rounded-lg inline-block mb-8">
            <p className="font-bold">
              Limited-time bonus: Earn 10% extra in your first 30 days!
            </p>
          </div>

          <button className="bg-[#198E49] hover:bg-[#147a3e] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center mx-auto">
            Join Now & Start Earning!
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F1F1F] text-white py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>© 2025 Affiliate Program. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Affiliate;
