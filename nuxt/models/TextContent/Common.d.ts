export type ImageObject = {
  src: string;
  alt: string;
};

export type ImageTeaser = {
  header: string;
  paragraphs: string[];
  image: ImageObject;
};

export type ContactItem = {
  icon: string;
  href: string;
  label: string;
};
