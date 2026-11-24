import './sectionHeading.scss';

export const SectionHeading = ({ initial, children, id }) => (
  <h2 id={id} className="sectionHeading"><span className="sectionHeadingInitial">{initial}</span>{children}</h2>
);
