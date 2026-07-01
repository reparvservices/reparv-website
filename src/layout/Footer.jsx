import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaRegCopyright,
} from "react-icons/fa";
import {
  FOOTER_APP_LINKS,
  FOOTER_BUYER_GUIDE_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_HOME_LOAN_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_NAGPUR_PROPERTY_LINKS,
  FOOTER_PARTNER_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_TOOL_LINKS,
} from "@/config/footerLinks";
import FooterLinkColumn from "./FooterLinkColumn";
import FooterMobileSection from "./FooterMobileSection";

const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

function SocialLinks({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 lg:gap-4 ${className}`}>
      {FOOTER_SOCIAL_LINKS.map((social) => {
        const Icon = SOCIAL_ICONS[social.icon];
        return (
          <Link
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.title}
            className="flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 bg-white/15 rounded-full hover:bg-white/25 transition-colors text-lg lg:text-xl"
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
}

function Footer({ footerRef }) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Desktop Footer */}
      <footer
        ref={footerRef}
        className="w-full hidden md:block bg-[#5E23DC] text-white"
      >
        <div className="w-full max-w-[1380px] mx-auto flex flex-col gap-8 py-10 px-8 lg:px-10">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" aria-label="Reparv home">
              <img
                src="/assets/footerLogo.svg"
                alt="Reparv Logo"
                className="w-[160px]"
              />
            </Link>
            <SocialLinks />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-6">
            <FooterLinkColumn title="Company" links={FOOTER_COMPANY_LINKS} />
            <FooterLinkColumn
              title="Become a Professional"
              links={FOOTER_PARTNER_LINKS}
            />
            <FooterLinkColumn title="Download Apps" links={FOOTER_APP_LINKS} />
            <FooterLinkColumn title="Tools & Guides" links={FOOTER_TOOL_LINKS} />
            <FooterLinkColumn
              title="Properties in Nagpur"
              links={FOOTER_NAGPUR_PROPERTY_LINKS}
            />
            <FooterLinkColumn
              title="Buyer Stories"
              links={FOOTER_BUYER_GUIDE_LINKS}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-white/20">
            <FooterLinkColumn title="Buy, Rent & Sell" links={FOOTER_HOME_LOAN_LINKS} />
            <div className="flex flex-col justify-end text-sm text-white/80 lg:text-right">
              <p>
                Explore verified properties, calculators, and home loan tools
                across Nagpur — all in one place.
              </p>
            </div>
          </div>

          <hr className="w-full h-px bg-white/20 border-0" />

          <div className="text-xs lg:text-sm flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            <span className="flex items-center gap-1.5">
              <FaRegCopyright /> {currentYear} reparv.in All Rights Reserved
            </span>
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:underline"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className="md:hidden w-full bg-[#5E23DC] text-white py-8 px-5 mb-[70px]">
        <div className="flex flex-col gap-6 max-w-md mx-auto">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label="Reparv home">
              <img
                src="/assets/footerLogo.svg"
                alt="Reparv logo"
                className="w-[140px]"
              />
            </Link>
            <SocialLinks />
          </div>

          <FooterMobileSection title="Company" links={FOOTER_COMPANY_LINKS} />
          <FooterMobileSection
            title="Become a Professional"
            links={FOOTER_PARTNER_LINKS}
          />
          <FooterMobileSection title="Download Apps" links={FOOTER_APP_LINKS} />
          <FooterMobileSection title="Tools & Guides" links={FOOTER_TOOL_LINKS} />
          <FooterMobileSection
            title="Properties in Nagpur"
            links={FOOTER_NAGPUR_PROPERTY_LINKS}
          />
          <FooterMobileSection
            title="Buyer Stories"
            links={FOOTER_BUYER_GUIDE_LINKS}
          />
          <FooterMobileSection
            title="Buy, Rent & Sell"
            links={FOOTER_HOME_LOAN_LINKS}
          />

          <hr className="w-full h-px bg-white/20 border-0" />

          <div className="flex flex-col items-center gap-3 text-xs text-center">
            <span className="flex items-center gap-1.5">
              <FaRegCopyright /> {currentYear} reparv.in All Rights Reserved
            </span>
            <div className="flex flex-wrap justify-center gap-4">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:underline">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
