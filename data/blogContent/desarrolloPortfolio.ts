import { Content } from "./content.interface";

export const desarrolloPortfolio: Content = {
  slug: "desarrollo-portfolio",
  title: "blogContent.desarrolloPortfolio.title",
  image: "/imgs/blog/desarrolloPortfolio.png",

  content: [
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.intro1",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.intro2",
    },

    {
      type: "subtitle",
      id: "lucha-con-colores",
      value: "blogContent.desarrolloPortfolio.luchaColoresTitle",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.luchaColoresText1",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.luchaColoresText2",
    },

    {
      type: "image",
      src: "/imgs/blog/desarrolloPortfolioContent/paleteColor.png",
      alt: "blogContent.desarrolloPortfolio.paletteAlt",
    },

    {
      type: "subtitle",
      id: "tema-e-idioma",
      value: "blogContent.desarrolloPortfolio.temaIdiomaTitle",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.temaIdiomaText1",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.temaIdiomaText2",
    },

    {
      type: "subtitle",
      id: "pensar-componentes",
      value: "blogContent.desarrolloPortfolio.pensarComponentesTitle",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.pensarComponentesText",
    },

    {
      type: "quote",
      value: "blogContent.desarrolloPortfolio.quoteComponentes",
    },

    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.componentesIntro",
    },

    {
      type: "subtitle",
      id: "componentes-basicos",
      value: "blogContent.desarrolloPortfolio.componentesBasicosTitle",
    },

    {
      type: "list",
      items: [
        "blogContent.desarrolloPortfolio.componentesBasicosList.0",
        "blogContent.desarrolloPortfolio.componentesBasicosList.1",
        "blogContent.desarrolloPortfolio.componentesBasicosList.2",
        "blogContent.desarrolloPortfolio.componentesBasicosList.3",
        "blogContent.desarrolloPortfolio.componentesBasicosList.4",
        "blogContent.desarrolloPortfolio.componentesBasicosList.5",
        "blogContent.desarrolloPortfolio.componentesBasicosList.6",
      ],
    },

    {
      type: "subtitle",
      id: "layouts",
      value: "blogContent.desarrolloPortfolio.layoutsTitle",
    },

    {
      type: "list",
      items: [
        "blogContent.desarrolloPortfolio.layoutsList.0",
        "blogContent.desarrolloPortfolio.layoutsList.1",
        "blogContent.desarrolloPortfolio.layoutsList.2",
        "blogContent.desarrolloPortfolio.layoutsList.3",
        "blogContent.desarrolloPortfolio.layoutsList.4",
        "blogContent.desarrolloPortfolio.layoutsList.5",
        "blogContent.desarrolloPortfolio.layoutsList.6",
        "blogContent.desarrolloPortfolio.layoutsList.7",
      ],
    },

    {
      type: "subtitle",
      id: "contenido",
      value: "blogContent.desarrolloPortfolio.contenidoTitle",
    },

    {
      type: "list",
      items: [
        "blogContent.desarrolloPortfolio.contenidoList.0",
        "blogContent.desarrolloPortfolio.contenidoList.1",
        "blogContent.desarrolloPortfolio.contenidoList.2",
      ],
    },

    {
      type: "subtitle",
      id: "botones-magicos",
      value: "blogContent.desarrolloPortfolio.botonesMagicosTitle",
    },

    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.botonesMagicosText",
    },

    {
      type: "list",
      items: [
        "blogContent.desarrolloPortfolio.botonesMagicosList.0",
        "blogContent.desarrolloPortfolio.botonesMagicosList.1",
      ],
    },

    {
      type: "subtitle",
      id: "por-que-compartir",
      value: "blogContent.desarrolloPortfolio.porQueCompartirTitle",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.porQueCompartirText1",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.porQueCompartirText2",
    },

    {
      type: "quote",
      value: "blogContent.desarrolloPortfolio.quoteMemoria",
    },

    {
      type: "image",
      src: "/imgs/blog/desarrolloPortfolioContent/portfolio.png",
      alt: "blogContent.desarrolloPortfolio.portfolioAlt",
    },

    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.cierre",
    },

    {
      type: "subtitle",
      id: "code",
      value: "blogContent.desarrolloPortfolio.codeTitle",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.codeIntro1",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.codeIntro2",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.codeIntro3",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.codeIntro4",
    },

    {
      type: "subtitle",
      id: "migracion-next",
      value: "blogContent.desarrolloPortfolio.migracionNextTitle",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.migracionNextText1",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.migracionNextText2",
    },

    {
      type: "code",
      language: "ts",
      value: `switch(block.type) {
              case "paragraph":
                return <p>{block.value}</p>;

              case "subtitle":
                return <h2 id={block.id}>{block.value}</h2>;

              case "image":
                return <img src={block.src} alt={block.alt} />;

              default:
                return null;
            }`,
    },

    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.renderSystemText",
    },

    {
      type: "subtitle",
      id: "reflexion",
      value: "blogContent.desarrolloPortfolio.reflexionTitle",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.reflexionText1",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.reflexionText2",
    },
    {
      type: "paragraph",
      value: "blogContent.desarrolloPortfolio.reflexionText3",
    },

    {
      type: "image",
      src: "/imgs/blog/desarrolloPortfolioContent/final.png",
      alt: "blogContent.desarrolloPortfolio.finalAlt",
    },
  ],
};
