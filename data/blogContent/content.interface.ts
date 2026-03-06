export type BlogContentBlock =
  | { type: "paragraph"; value: string }
  | { type: "subtitle"; id: string; value: string }
  | { type: "code"; language: string; value: string }
  | { type: "image"; src: string; alt: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; value: string }

export interface Content {
  slug: string;
  title: string;
  image: string;
  content: BlogContentBlock[];
}