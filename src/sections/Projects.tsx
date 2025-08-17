import cn from "../utils/cn";

type ProjectProps = {
    className?: string
}

export const Projects:React.FC<ProjectProps> = ({className}) => {
  return (
    <section id="projects" className={cn("h-[90dvh] bg-backrgound flex justify-center place-items-center", className)}>
        <h1>Projects</h1>
    </section>
  );
}