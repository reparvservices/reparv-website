import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-7">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>
        This Privacy Policy (“Policy”) is issued by Reparv Services Private
        Limited, a company incorporated under the Companies Act, 2013 and having
        its registered office at [Insert Address] (“Company”, “Reparv”, “we”,
        “us” or “our”).
      </p>
      <p className="mt-4">
        This Policy governs how Reparv collects, uses, discloses, and safeguards
        personal data in connection with:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li>The website https://www.reparv.in;</li>
        <li>
          All current and future mobile applications operated by Reparv
          (including but not limited to Reparv Main App, Reparv Sales Partner
          App, Reparv Territory Partner App, Reparv Project Partner App, and any
          other applications introduced in the future);
        </li>
        <li>
          Any related software platforms, tools, and services (together, the
          “Platform”).
        </li>
      </ul>
      <p className="mt-4">
        By accessing or using any part of the Platform, you (“User”, “you”)
        consent to the practices described in this Policy.
      </p>

      {/* Section 1 */}
      <h2 className="text-xl font-semibold mt-6">1. Collection of Personal Data</h2>
      <p>We may collect the following categories of personal data, either directly from you or automatically when you use the Platform:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Basic Information: Full name, contact number, email address, residential or business address, identification documents (Aadhaar, PAN, etc.).</li>
        <li>Financial Data: Bank details, payment history, and transaction records.</li>
        <li>Technical Data: IP address, browser type, device ID, operating system, crash logs, diagnostics, and usage activity.</li>
        <li>Location Data: GPS or approximate location, when you allow location services on mobile apps.</li>
        <li>App Usage Data: Login times, preferences, in-app actions, and interactions with features.</li>
        <li>Contacts & Media (with permission): Access to gallery, documents, or contacts when you upload KYC papers, property images, or referral details.</li>
        <li>Other Data: Any additional information you voluntarily provide while using the Platform.</li>
      </ul>

      {/* Section 2 */}
      <h2 className="text-xl font-semibold mt-6">2. Purpose & Legal Basis of Processing</h2>
      <p>We process your personal data for the following purposes:</p>
      <ul className="list-disc list-inside mt-2">
        <li>To register, verify, and manage user accounts;</li>
        <li>To provide property listings, site visits, and related real estate services;</li>
        <li>To assign Sales Partners, Territory Partners, or other service providers;</li>
        <li>To facilitate secure payments and loan/registration assistance;</li>
        <li>To improve Platform performance, features, and user experience;</li>
        <li>To send service updates, promotional offers (with consent), and push notifications;</li>
        <li>To comply with applicable laws and respond to lawful requests;</li>
        <li>To detect and prevent fraud, unauthorized activity, or misuse.</li>
      </ul>
      <p className="mt-2">Legal bases include:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Your consent;</li>
        <li>Performance of contractual obligations;</li>
        <li>Compliance with legal requirements;</li>
        <li>Legitimate business interests (without overriding your rights).</li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-xl font-semibold mt-6">3. Permissions & Access (Mobile Apps)</h2>
      <p>Our mobile applications may request access to certain device features, always based on your permission:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Location: To match you with properties, Sales Partners, or site visits nearby.</li>
        <li>Camera & Gallery: To capture/upload property photos, documents, or profile pictures.</li>
        <li>Microphone (if enabled): For communication or verification within the app.</li>
        <li>Storage: For securely saving or uploading necessary files.</li>
      </ul>
      <p className="mt-2">
        Denying permissions may limit certain features but will not stop core services.
      </p>

      {/* Section 4 */}
      <h2 className="text-xl font-semibold mt-6">4. Data Sharing</h2>
      <p>Your personal data may be shared with:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Service Providers: IT support, payment gateways, analytics providers, or cloud storage partners.</li>
        <li>Reparv Partners: Freelancers, Sales Partners, or Territory Partners working under our business model, for service fulfilment.</li>
        <li>Government & Legal Authorities: When required under applicable law or valid legal request.</li>
        <li>Corporate Events: Successors, acquirers, or affiliates in case of a merger, acquisition, or restructuring.</li>
      </ul>
      <p className="mt-2">
        All third parties are contractually bound to maintain confidentiality and data protection standards.
      </p>

      {/* Section 5 */}
      <h2 className="text-xl font-semibold mt-6">5. Third-Party Tools & SDKs</h2>
      <p>
        Reparv Apps may integrate third-party software (e.g., Google Firebase, Crashlytics, Google Maps, Payment Gateways). These tools may collect limited technical or usage data under their own privacy policies. Reparv ensures integration only with trusted providers.
      </p>

      {/* Section 6 */}
      <h2 className="text-xl font-semibold mt-6">6. Data Retention</h2>
      <p>
        We retain personal data only as long as necessary for the purposes stated, or as required by applicable law.
      </p>

      {/* Section 7 */}
      <h2 className="text-xl font-semibold mt-6">7. Data Security</h2>
      <p>
        We adopt reasonable technical and organizational safeguards to protect your data against unauthorized access, misuse, or accidental loss. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      {/* Section 8 */}
      <h2 className="text-xl font-semibold mt-6">8. User Rights</h2>
      <p>As per applicable laws, you have the right to:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Access and correct your personal data;</li>
        <li>Withdraw consent (where processing is consent-based);</li>
        <li>Request deletion or restriction of data;</li>
        <li>Object to processing, including for direct marketing;</li>
        <li>File a complaint with a relevant data protection authority.</li>
      </ul>
      <p className="mt-2">
        Requests may be sent in writing to the contact provided below.
      </p>

      {/* Section 9 */}
      <h2 className="text-xl font-semibold mt-6">9. Minors</h2>
      <p>
        Our Platform is not intended for individuals under the age of 18. We do not knowingly collect personal data from minors.
      </p>

      {/* Section 10 */}
      <h2 className="text-xl font-semibold mt-6">10. Changes to this Policy</h2>
      <p>
        We may update this Policy from time to time. Any material changes will be posted on the Platform with a revised effective date. Continued use after such updates will signify acceptance.
      </p>

      {/* Section 11 */}
      <h2 className="text-xl font-semibold mt-6">11. Grievance Redressal & Contact</h2>
      <p>
        For queries, concerns, or grievances regarding this Policy or your personal data, please contact:
      </p>
      <p className="mt-2">
        Name: Ravindra Harishchandra Wankhede <br />
        Email: management@reparv.in <br />
        Designation: Director & Grievance Officer
      </p>
      <p className="mt-4">
        This Policy is governed by the laws of India, and disputes will fall under the exclusive jurisdiction of the courts of Nagpur, Maharashtra.
      </p>
    </div>
  );
};

export default PrivacyPolicy;