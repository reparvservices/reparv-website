import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../store/auth.jsx";

const Agreement = () => {
  const { showAgreement, setShowAgreement } = useAuth();
  // Format date (UI text stays same, only value improved)
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Lock background scroll
  useEffect(() => {
    if (showAgreement) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAgreement]);

  // Do not render if not open
  if (!showAgreement) return null;

  return (
    <div className="w-full overflow-scroll scrollbar-hide md:w-[700px] lg:w-[900px] h-[90vh] md:max-h-[80vh] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-tl-xl rounded-tr-xl md:rounded-lg">
      {/* Header */}

      {/* Agreement Content */}
      <div className="space-y-4 text-justify text-sm leading-relaxed">
        <p className="text-center font-bold uppercase">
          User Declaration, Risk Acknowledgement and Undertaking
        </p>

        <p>
          I have read and gone through all the terms, conditions and the risks
          involved in the transaction/s that I am about to enter; upon giving a
          careful and considerate thought, I agree and undertake as follows:
        </p>

        <p>
          That, I have carefully read and understood the terms and conditions
          displayed on the website “www.reparv.in” and/or mobile application
          “REPARV” owned and managed by ‘Reparv Services Private Limited’
          (hereinafter referred to as “RSPL”) and/or those explained to me by
          any of the agents or employees of RSPL.
        </p>

        <p>
          That, I shall be solely responsible for maintaining the
          confidentiality of my account and password created on the
          website/mobile application of RSPL and to prevent unauthorised access.
          I agree to accept responsibility for all activities that occur under
          my account.
        </p>

        <p>
          That, all information submitted by me on this website/mobile
          application shall be true and correct. In the event any information is
          found to be false or incorrect, I shall be solely responsible for such
          falsity.
        </p>

        <p>
          That, I understand and acknowledge that this website/mobile
          application is a virtual platform and RSPL merely acts as an
          intermediary listing properties on behalf of their actual owners. RSPL
          is only a facilitator and is not a party to any transaction between me
          and the property owner. All agreements entered into shall be strictly
          between me and the actual owner(s) of the property.
        </p>

        <p>
          That, I understand the risks involved in the transactions I may enter
          into through this platform. The property details are published as
          received from the actual owners or their agents upon basic
          verification. I undertake to conduct my own due diligence before
          entering into any financial transaction. I understand the principle of
          ‘Caveat Emptor’ (Buyer Beware) and shall not hold RSPL liable for any
          loss arising from such transactions.
        </p>

        <p>
          That, all content available on this website/mobile application
          including text, graphics, logos, images, and software is the property
          of RSPL and protected under Indian laws. I shall not use or reproduce
          any proprietary content without written consent.
        </p>

        <p>
          That, I access and transact on this platform at my own risk, prudence,
          and judgment.
        </p>

        <p>
          That, I agree to indemnify and hold harmless RSPL, its officers,
          directors, employees, and agents from any claims, liabilities, losses,
          or damages arising from transactions entered into by me with property
          owners or their agents.
        </p>

        <p>
          That, in case of any grievance or dispute, I shall first raise the
          concern through RSPL customer support at contact@reparv.in for
          resolution.
        </p>

        <p>
          That, these conditions are governed by the laws of India and I agree
          to submit to the exclusive jurisdiction of the courts at Nagpur.
        </p>

        <p className="font-semibold">IN WITNESS WHEREOF</p>

        <p>
          I confirm my acceptance of the above declaration on this day{" "}
          {currentDate}.
        </p>
      </div>
      {/* Actions */}
      <div className="flex mt-8 md:mt-6 justify-end gap-6">
        <button
          type="button"
          onClick={() => {
            setShowAgreement(false);
          }}
          className="px-4 py-2 text-white bg-[#5323DC] rounded active:scale-[0.98]"
        >
          Accept Agreement
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default Agreement;
