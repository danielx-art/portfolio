import { ContactButton } from "../components/ContactButton"


export const Footer = () => {


    return (
        <section className="w-full h-fit pb-16 flex justify-center place-items-center">
            <ContactButton className="opacity-100 bg-accent text-background hover:bg-transparent hover:text-accent hover:outline-accent"/>
        </section>
    )
}