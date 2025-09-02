import { ContactButton } from "../components/ContactButton";
import { useUserPreferences } from "../context/useUserPreferences";

export const Footer = () => {
  const { lang } = useUserPreferences();

  return (
    <section className="w-full h-fit pb-24 flex flex-col justify-center place-items-center">
      <ContactButton
        lang={lang}
        className="opacity-100 bg-accent text-background hover:bg-transparent hover:text-accent hover:outline-accent"
        show={true}
      />
    </section>
  );
};
