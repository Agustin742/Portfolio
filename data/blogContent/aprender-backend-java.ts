import { Content } from "./content.interface";

export const aprenderBackendJava: Content = {
  slug: "aprender-backend-java",
  title: "blogContent.backendJava.title",
  image: "/imgs/blog/aprenderJava.png",

  content: [
    {
      type: "paragraph",
      value: "blogContent.backendJava.content.intro1",
    },
    {
      type: "paragraph",
      value: "blogContent.backendJava.content.intro2",
    },

    {
      type: "code",
      language: "java",
      value: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hola Mundo");
    }
}`,
    },

    {
      type: "paragraph",
      value: "blogContent.backendJava.content.intro3",
    },

    {
      type: "subtitle",
      id: "primeros-pasos",
      value: "blogContent.backendJava.content.primerosPasosTitle",
    },

    {
      type: "paragraph",
      value: "blogContent.backendJava.content.primerosPasosText1",
    },
    {
      type: "paragraph",
      value: "blogContent.backendJava.content.primerosPasosText2",
    },

    {
      type: "subtitle",
      id: "camino-aprendizaje",
      value: "blogContent.backendJava.content.caminoAprendizajeTitle",
    },

    {
      type: "paragraph",
      value: "blogContent.backendJava.content.caminoAprendizajeText1",
    },
    {
      type: "paragraph",
      value: "blogContent.backendJava.content.caminoAprendizajeText2",
    },

    {
      type: "subtitle",
      id: "poo",
      value: "blogContent.backendJava.content.pooTitle",
    },

    {
      type: "paragraph",
      value: "blogContent.backendJava.content.pooText",
    },

    {
      type: "image",
      src: "/imgs/blog/aprenderJava/poo-example.jpg",
      alt: "blogContent.backendJava.content.pooAlt",
    },

    {
      type: "paragraph",
      value: "blogContent.backendJava.content.pooText2",
    },

    {
      type: "subtitle",
      id: "reflexion",
      value: "blogContent.backendJava.content.reflexionTitle",
    },

    {
      type: "paragraph",
      value: "blogContent.backendJava.content.reflexionText1",
    },
    {
      type: "paragraph",
      value: "blogContent.backendJava.content.reflexionText2",
    },
  ],
};