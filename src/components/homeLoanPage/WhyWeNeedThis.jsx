import { FaShieldAlt, FaFileAlt, FaPhoneAlt, FaLock } from "react-icons/fa";
import communicationImage from "../../assets/homeLoan/communication.svg";

export default function WhyWeNeedThis() {
  return (
    <div className="space-y-8 bg-[#FAF8FF] p-6 rounded-3xl">
      {/* Illustration Card */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex justify-center">
          <img
            src={communicationImage}
            alt="Why we need this"
            loading="lazy"
            className="max-h-48 object-contain"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-6">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-black">Why we need this?</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Verification */}
            <div className="flex gap-4 items-start">
              <div className="flex items-center justify-center">
                <FaShieldAlt className="text-[#8A38F5] w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold text-black">Verification Purpose</p>
                <p className="text-sm text-gray-600">
                  Required for KYC compliance
                </p>
              </div>
            </div>

            {/* Loan Docs */}
            <div className="flex gap-4 items-start">
              <div className="flex items-center justify-center">
                <FaFileAlt className="text-[#8A38F5] w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold text-black">Loan Documentation</p>
                <p className="text-sm text-gray-600">
                  For official loan agreements
                </p>
              </div>
            </div>

            {/* Communication */}
            <div className="flex gap-4 items-start">
              <div className="flex items-center justify-center">
                <FaPhoneAlt className="text-[#8A38F5] w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold text-black">Communication</p>
                <p className="text-sm text-gray-600">
                  To send important updates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Box */}
        <div className="border border-[#00DA3A] bg-[#E0FBF0] rounded-2xl p-6 flex gap-4 items-center">
          <div className="flex items-center justify-center">
            <FaLock className="text-[#04972B] text-xl w-9 h-9" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#04972B]">
              Bank-grade Security
            </p>
            <p className="text-sm text-[#04972B]">
              Your data is encrypted with 256-bit SSL and never shared with
              third parties
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
