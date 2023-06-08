import { ImageObject } from '@/models/TextContent/Common'

export type Contact = {
  type: 'email' | 'phone';
  content: string;
};

export type ContactTeaser = {
  header: string;
  body: string;
  contacts: Array<Contact>;
  openingHours: string;
  image: ImageObject
};
