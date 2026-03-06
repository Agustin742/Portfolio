import { Content } from "./content.interface";

export const aprenderBackendJava: Content = {
  slug: "aprender-backend-java",
  title: "blogContent.backendJava.title",
  image: "/imgs/blog/aprenderJava.png",
  content: [
    {
      type: "paragraph",
      value: "blogContent.backendJava.content.intro"
    },
    {
      type: "subtitle",
      id: "what-is-backend",
      value: "blogContent.backendJava.content.queEsBackendTitle",
    },
    {
      type: "paragraph",
      value: "blogContent.backendJava.content.queEsBackendText"
    },
    {
      type: "subtitle",
      id: "spring-boot",
      value: "blogContent.backendJava.content.springBootTitle",
    },
    {
      type: "code",
      language: "java",
      value: `
        @RestController
        public class HelloController {

          @GetMapping("/hello")
          public String hello() {
            return "Hello World";
          }
        }`,
    },
    {
      type: "paragraph",
      value: "blogContent.backendJava.content.springBootText",
    },
  ],
};
