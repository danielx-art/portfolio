import { useState } from "react";
import { useUserPreferences } from "../context/useUserPreferences";
import cn from "../utils/cn";

export const ContactButton:React.FC<{className?:string}> = ({className}) => {
  const [copied, setCopied] = useState(false);
  const { prefersReducedMotion } = useUserPreferences();
  const email = "danie.rangel.guedes@gmail.com";

  const handleClick = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // On mobile → open mail app
      window.location.href = `mailto:${email}`;
    } else {
      // On desktop → copy to clipboard
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(" relative overflow-hidden min-h-11 boidsReactBtn flex flex-nowrap px-4 py-2 rounded-sm font-fira font-bold text-lg min-w-[9rem] text-accent hover:text-background  hover:bg-accent bg-transparent  outline-dashed outline-2 hover:outline-transparent outline-accent outline-offset-[-2px] opacity-50 hover:opacity-100 focus:opacity-100 shadow-lg cursor-pointer  focus:outline-offset-2 focus:outline focus:outline-accent focus:bg-accent focus:text-background group transition-all duration-300 ease-in-out", className)}
        aria-label="Contact by Email"
    >
      {prefersReducedMotion ? (
        <span className="min-w-[8rem]">{copied ? "Copied!" : "Contact Me"}</span>
      ) : (
        <>
          <span
            className={`absolute inset-2 transition-transform duration-200 ${
              copied ? "-translate-y-[150%]" : "translate-y-0"
            }`}
          >
            Contact Me!
          </span>
          <span
            className={`absolute inset-2 transition-transform duration-200 ${
              copied ? "translate-y-0" : "translate-y-[150%]"
            }`}
          >
            Copied!
          </span>
        </>
      )}
    </button>
  );
};