import { ReactNode } from 'react';

type SectionProps = {
  title?: string | undefined;
  // type the children prop
  children: ReactNode;
};

function Section({ children, title = 'My Subheading' }: SectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}

export default Section;
