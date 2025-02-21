"use client";
import React, { useState } from "react";
import { Mail } from "lucide-react";

type Tab = "terms" | "privacy" | "cookies";

const Page = () => {
  const [activeTab, setActiveTab] = useState<Tab>("terms");

  const tabs = [
    { id: "terms" as Tab, label: "Terms of Service" },
    { id: "privacy" as Tab, label: "Privacy Policy" },
    { id: "cookies" as Tab, label: "Cookie Policy" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "terms":
        return <TermsContent />;
      case "privacy":
        return <PrivacyContent />;
      case "cookies":
        return <CookiesContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div>
          <h1 className="text-4xl font-bold text-[#1F1F1F] py-8">Legal</h1>
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-lg font-medium relative ${
                  activeTab === tab.id
                    ? "text-[#AF583B]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AF583B]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12">
        <div className="prose max-w-none">{renderContent()}</div>

        {/* Contact Section */}
        <div className="mt-16 p-8 bg-[#F5F5F5] rounded-lg">
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-[#AF583B]" />
            <h2 className="text-xl font-semibold text-[#1F1F1F]">Need Help?</h2>
          </div>
          <p className="mt-4 text-gray-600">
            If you have any questions about our legal policies, please don't
            hesitate to contact us at{" "}
            <a
              href="mailto:contact@launchap.com"
              className="text-[#AF583B] hover:underline"
            >
              contact@launchap.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

function TermsContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">
          Terms of Service
        </h2>
        <p className="text-gray-600 mb-4">Effective Date: March 15, 2024</p>
        <p className="text-gray-700">
          Welcome to Launchap. Please read on to learn the rules and
          restrictions that govern your use of our website(s), products,
          services, and applications (collectively, the "Services"). If you have
          any questions, comments, or concerns regarding these terms or the
          Services, please contact us at contact@launchap.com.
        </p>
        <p className="text-gray-700">
          These Terms of Service (the "Terms") form a binding agreement between
          you and Launchap Inc. ("Launchap," "we," or "us"). By using the
          Services in any way, you agree to these Terms. If you do not agree,
          you may not use the Services.
        </p>
        <p className="text-gray-700">
          These Terms include our Privacy Policy and any other policies
          referenced herein.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          1. Changes to These Terms
        </h3>
        <p className="text-gray-700">
          We are constantly improving our Services, so we may need to update
          these Terms from time to time. If we make significant changes, we will
          notify you through the website, by email, or other communication
          methods. Your continued use of the Services after changes take effect
          constitutes your acceptance of the revised Terms. If you do not agree,
          you must discontinue using the Services.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          2. Privacy Policy
        </h3>
        <p className="text-gray-700">
          Your privacy is important to us. Our Privacy Policy explains how we
          collect, use, and protect your personal data. By using our Services,
          you agree to our Privacy Policy.
        </p>
        <p className="text-gray-700">
          We do not knowingly collect personal data from children under 16. If
          we become aware that such data has been provided to us, we will delete
          it. If you believe we may have collected data from a child under 16,
          please contact us immediately.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          3. User Accounts
        </h3>
        <p className="text-gray-700">
          To access certain features of the Services, you may need to create an
          account. When registering:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            You must provide accurate, complete, and up-to-date information.
          </li>
          <li>
            You may not use a username that you do not have the right to use or
            impersonate someone else.
          </li>
          <li>
            You are responsible for maintaining the security of your account and
            password.
          </li>
          <li>
            You must notify us immediately of any unauthorized use of your
            account.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          4. Acceptable Use
        </h3>
        <p className="text-gray-700">
          You agree not to use the Services in ways that:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Violate any applicable laws or regulations.</li>
          <li>
            Infringe on the rights of others, including intellectual property
            rights.
          </li>
          <li>Distribute spam, malware, or harmful software.</li>
          <li>Attempt to hack, disrupt, or interfere with the Services.</li>
          <li>Engage in harassment, hate speech, or abusive behavior.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          A violation of these Terms may result in the termination of your
          account and access to the Services.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          5. Intellectual Property
        </h3>
        <p className="text-gray-700">
          All content and materials available on the Services, including text,
          graphics, logos, and software, are owned or licensed by Launchap and
          protected under intellectual property laws. You may not use, copy, or
          distribute content without permission.
        </p>
        <p className="text-gray-700">
          User-generated content ("User Submissions") remains your property.
          However, by submitting content to Launchap, you grant us a worldwide,
          non-exclusive, royalty-free license to use, modify, distribute, and
          display your content in connection with operating and promoting the
          Services.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          6. Copyright Infringement
        </h3>
        <p className="text-gray-700">
          We respect intellectual property rights. If you believe content on
          Launchap infringes on your copyright, please contact us with a
          detailed report, and we will investigate and take appropriate action.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          7. Third-Party Links and Services
        </h3>
        <p className="text-gray-700">
          The Services may contain links to third-party websites. We do not
          endorse or take responsibility for third-party content, services, or
          practices. Your interactions with third parties are solely between you
          and them.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          8. Disclaimers and Limitation of Liability
        </h3>
        <p className="text-gray-700">
          <strong>Disclaimers:</strong> The Services are provided "as is"
          without warranties of any kind. We do not guarantee uninterrupted or
          error-free operation.
        </p>
        <p className="text-gray-700">
          <strong>Limitation of Liability:</strong> To the fullest extent
          permitted by law, Launchap is not liable for indirect, incidental, or
          consequential damages arising from your use of the Services.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          9. Termination
        </h3>
        <p className="text-gray-700">
          We reserve the right to suspend or terminate your access to the
          Services at any time if you violate these Terms or if we decide to
          discontinue part or all of the Services.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          10. Governing Law and Dispute Resolution
        </h3>
        <p className="text-gray-700">
          These Terms are governed by the laws of Bangladesh. Any disputes
          arising from these Terms shall be resolved through binding arbitration
          in Bangladesh.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          11. Contact Us
        </h3>
        <p className="text-gray-700">
          For questions about these Terms, please contact us at{" "}
          <a
            href="mailto:contact@launchap.com"
            className="text-[#AF583B] hover:underline"
          >
            contact@launchap.com
          </a>
        </p>
      </section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">
          Privacy Policy
        </h2>
        <p className="text-gray-600 mb-4">Effective Date: March 15, 2024</p>
        <p className="text-gray-700">
          At Launchap, we value your privacy and take it seriously. This Privacy
          & Cookies Policy outlines our policies regarding the collection, use,
          and disclosure of your information when you use our services,
          websites, and applications (the "Services"). By using the Services,
          you agree to the collection and use of information in accordance with
          this Privacy & Cookies Policy. We do not share your personal data
          except as described in this policy.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">Overview</h3>
        <p className="text-gray-700">This policy is designed to explain:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Who we are and how to contact us</li>
          <li>Your rights relating to your personal data</li>
          <li>Marketing communications preferences</li>
          <li>What personal data we collect</li>
          <li>How we use your personal data and why</li>
          <li>How we use cookies and tracking technologies</li>
          <li>Who we share your personal data with</li>
          <li>How long we store your personal data</li>
          <li>Where we store your personal data</li>
          <li>How we protect your personal data</li>
          <li>Our policy on children's privacy</li>
          <li>Links to other websites</li>
          <li>Changes to this Privacy & Cookies Policy</li>
        </ul>
        <p className="text-gray-700 mt-4">
          This policy complies with the General Data Protection Regulation
          ("GDPR") and the California Consumer Privacy Act ("CCPA").
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Who We Are and How to Contact Us
        </h3>
        <p className="text-gray-700">
          <strong>Who we are:</strong> Launchap.com ("Launchap," "we," "us," or
          "our") is the data controller responsible for your personal data.
        </p>
        <p className="text-gray-700">
          <strong>How to contact us:</strong> If you have any questions
          regarding this policy, please email us at{" "}
          <a
            href="mailto:contact@launchap.com"
            className="text-[#AF583B] hover:underline"
          >
            contact@launchap.com
          </a>
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Your Rights Relating to Your Personal Data
        </h3>
        <p className="text-gray-700">
          You have rights under this Privacy & Cookies Policy, including:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>Accessing your data:</strong> Request a copy of the personal
            data we hold about you.
          </li>
          <li>
            <strong>Correcting your data:</strong> Request corrections to
            inaccurate or incomplete data.
          </li>
          <li>
            <strong>Erasing your data:</strong> Request deletion of personal
            data when no longer necessary.
          </li>
          <li>
            <strong>Objecting to processing:</strong> Object to the use of your
            personal data in certain cases.
          </li>
          <li>
            <strong>Restricting processing:</strong> Request limited processing
            of your data in certain circumstances.
          </li>
          <li>
            <strong>Transferring your data:</strong> Request transfer of your
            data to another party.
          </li>
          <li>
            <strong>Withdrawing consent:</strong> Withdraw consent where
            processing is based on it.
          </li>
        </ul>
        <p className="text-gray-700 mt-4">
          To exercise these rights, contact us using the details in "Who We Are
          and How to Contact Us."
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Marketing Communications Preferences
        </h3>
        <p className="text-gray-700">
          You can opt out of marketing communications at any time by:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Clicking the "unsubscribe" link in our emails</li>
          <li>Updating your account settings</li>
          <li>Contacting us directly</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          What Personal Data We Collect
        </h3>
        <p className="text-gray-700">
          We collect different types of data, including:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>Identity Data:</strong> Name, username, and profile
            information
          </li>
          <li>
            <strong>Contact Data:</strong> Email, phone number, and mailing
            address
          </li>
          <li>
            <strong>Professional Background Data:</strong> Work history and
            achievements
          </li>
          <li>
            <strong>Online Presence Data:</strong> Social media profiles and
            websites
          </li>
          <li>
            <strong>Financial Data:</strong> Payment information for purchases
            or transactions
          </li>
          <li>
            <strong>Transaction Data:</strong> Details about purchases,
            subscriptions, and services
          </li>
          <li>
            <strong>Content Data:</strong> User-generated content and messages
          </li>
          <li>
            <strong>Marketing and Communications Data:</strong> Preferences for
            receiving marketing materials
          </li>
          <li>
            <strong>Behavioral Data:</strong> Online activity, interests, and
            usage patterns
          </li>
          <li>
            <strong>Technical Data:</strong> IP address, browser type, operating
            system, and device information
          </li>
        </ul>
        <p className="text-gray-700 mt-4">
          We may also collect data from third-party sources, including social
          media sites, affiliates, analytics providers, and advertisers.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          How We Use Your Personal Data
        </h3>
        <p className="text-gray-700">
          We use personal data for purposes including:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Providing, maintaining, and improving our Services</li>
          <li>Processing payments</li>
          <li>Conducting research and analysis</li>
          <li>Communicating with users</li>
          <li>Enhancing security and fraud prevention</li>
          <li>Marketing and promoting our Services</li>
          <li>Complying with legal obligations</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          How We Use Cookies and Other Tracking Technologies
        </h3>
        <p className="text-gray-700">
          We use cookies and tracking technologies to enhance user experience,
          analyze traffic, and provide personalized content. By using our
          Services, you agree to our use of cookies. You can manage your cookie
          preferences through your browser settings.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Who We Share Your Personal Data With
        </h3>
        <p className="text-gray-700">We may share your data with:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Service providers assisting in platform functionality</li>
          <li>Payment processors for transaction purposes</li>
          <li>Legal authorities when required by law</li>
          <li>Third-party partners with your consent</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          How Long We Store Your Personal Data
        </h3>
        <p className="text-gray-700">
          We retain personal data for as long as necessary to fulfill the
          purposes outlined in this policy. When no longer needed, we securely
          delete or anonymize the data.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Where We Store Your Personal Data
        </h3>
        <p className="text-gray-700">
          Your data may be stored on servers located in different countries. We
          take appropriate measures to ensure secure storage and compliance with
          applicable laws.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          How We Protect Your Personal Data
        </h3>
        <p className="text-gray-700">
          We implement security measures such as encryption, access controls,
          and regular security audits to safeguard your personal data.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Our Policy on Children's Privacy
        </h3>
        <p className="text-gray-700">
          Our Services are not intended for users under 16 years of age. We do
          not knowingly collect personal data from children.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Links to Other Websites
        </h3>
        <p className="text-gray-700">
          Our Services may contain links to third-party websites. We are not
          responsible for their privacy practices and encourage you to review
          their policies.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Changes to Our Privacy & Cookies Policy
        </h3>
        <p className="text-gray-700">
          We may update this policy periodically. Any changes will be posted on
          this page, and we encourage you to review it regularly.
        </p>
        <p className="text-gray-700">
          For questions or concerns, contact us at{" "}
          <a
            href="mailto:contact@launchap.com"
            className="text-[#AF583B] hover:underline"
          >
            contact@launchap.com
          </a>
        </p>
      </section>
    </div>
  );
}

function CookiesContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">
          Cookies Policy
        </h2>
        <p className="text-gray-600 mb-4">Effective Date: March 15, 2024</p>
        <p className="text-gray-700">
          At Launchap.com ("Launchap," "we," "us," or "our"), we use cookies and
          similar tracking technologies to improve your experience on our
          platform. This Cookies Policy explains what cookies are, the types of
          cookies we use, and how you can manage them.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          What Are Cookies?
        </h3>
        <p className="text-gray-700">
          Cookies are small text files that are stored on your device (computer,
          tablet, or mobile) when you visit a website. They help identify your
          browser and improve your browsing experience by remembering your
          preferences, enabling core site functionality, and analyzing site
          performance.
        </p>
        <p className="text-gray-700">
          Cookies may be either "persistent" (remain on your device after you
          close your browser) or "session" (deleted once you close your
          browser).
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          What Cookies Do We Use?
        </h3>
        <p className="text-gray-700">
          We use the following types of cookies on Launchap.com:
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              1. Essential Cookies
            </h4>
            <p className="text-gray-700">
              These cookies are necessary for the website to function properly.
              They enable you to log in, navigate the site, and use essential
              features. Without these cookies, some services may not be
              available.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">
              2. Functionality Cookies
            </h4>
            <p className="text-gray-700">
              These cookies remember choices you make, such as login details,
              language preferences, and customization settings. They help
              enhance your experience by making interactions smoother and more
              personalized.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">
              3. Analytics and Performance Cookies
            </h4>
            <p className="text-gray-700">
              These cookies help us understand how visitors interact with our
              site by collecting aggregated and anonymized data. We use tools
              such as Google Analytics, Hotjar, and Segment to analyze site
              traffic, identify popular features, and improve performance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">
              4. Targeting and Advertising Cookies
            </h4>
            <p className="text-gray-700">
              These cookies track your browsing behavior to show relevant
              advertisements. Third-party advertisers may use them to serve ads
              based on your interests. Technologies like web beacons or
              JavaScript may also be used to measure ad effectiveness.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">
              5. Social Media Cookies
            </h4>
            <p className="text-gray-700">
              These cookies enable social sharing and engagement, allowing you
              to interact with social media platforms like Facebook, X (formerly
              Twitter), and LinkedIn. They may also track conversions and assist
              in targeted advertising.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Managing Cookies
        </h3>
        <p className="text-gray-700">
          You can control or delete cookies through your browser settings. Most
          browsers allow you to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>Block all cookies</li>
          <li>Delete existing cookies</li>
          <li>Receive alerts before a cookie is placed</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Please note that disabling cookies may affect your experience on
          Launchap.com, and some features may not function correctly.
        </p>
        <p className="text-gray-700 mt-2">
          For more information on managing cookies, visit{" "}
          <a
            href="http://www.allaboutcookies.org"
            className="text-[#AF583B] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.allaboutcookies.org
          </a>{" "}
          and{" "}
          <a
            href="http://www.youronlinechoices.com"
            className="text-[#AF583B] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.youronlinechoices.com
          </a>
          .
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Third-Party Services
        </h3>
        <p className="text-gray-700">
          We may use third-party services such as Google Analytics, Sentry,
          Segment, and Intercom to analyze user behavior and improve our
          platform. These services collect data in accordance with their privacy
          policies. You can opt out of Google Analytics tracking by installing
          the browser plugin available here:{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            className="text-[#AF583B] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://tools.google.com/dlpage/gaoptout
          </a>
          .
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Use of Social Media Data
        </h3>
        <p className="text-gray-700">
          If you connect your social media account to Launchap, we may collect
          publicly available profile data (such as your name, email, and profile
          picture) to enhance your experience. This data is not shared with
          third parties unless required for platform functionality.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          How Long We Store Your Data
        </h3>
        <p className="text-gray-700">
          We retain cookies and tracking data for as long as necessary to
          provide services and comply with legal obligations. You can clear
          stored cookies at any time through your browser settings.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-3">
          Updates to This Cookies Policy
        </h3>
        <p className="text-gray-700">
          We may update this policy from time to time. Changes will be posted on
          this page, and the "Effective Date" will be updated accordingly. Your
          continued use of Launchap.com constitutes acceptance of the updated
          policy.
        </p>
        <p className="text-gray-700 mt-4">
          If you have any questions about our Cookies Policy, contact us at{" "}
          <a
            href="mailto:contact@launchap.com"
            className="text-[#AF583B] hover:underline"
          >
            contact@launchap.com
          </a>
        </p>
      </section>
    </div>
  );
}

export default Page;
