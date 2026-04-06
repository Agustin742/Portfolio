export const es = {
    nav: {
        about: 'Sobre mí',
        projects: 'Proyectos',
        expForm: 'Exp. y Formación',
        blog: 'Blog',
        contact: 'Contacto'
    },

    hero: {
        greeting: "Soy Agustin Tabarcache",
        role: {
            prefix: "Desarrollador",
            highlight: "FullStack"
        },
        description: "Desarrollador de software enfocado en construir aplicaciones funcionales, aprender constantemente y resolver problemas reales con código.",
        quote: "La única manera de ir rápido es ir bien - Robert C. Martin",
        downloadCV: "Abrir CV"
    },

    about: {
        title: "Sobre mi",
        description1:
            "Trabajo con estas tecnologías en proyectos y prácticas reales, aplicando buenas prácticas y una base sólida de desarrollo.",
        description2:
            "Además, continúo incorporando nuevas herramientas y lenguajes para fortalecer mi perfil full stack y ampliar mi capacidad para resolver problemas reales.",
        knowTitle: "Tengo conocimientos en:",
        learningTitle: "Estoy aprendiendo:",

        cards: {
            whoAmI: {
                title: "Quién soy",
                description:
                    "Soy desarrollador Full Stack con formación en programación y desarrollo web, enfocado en construir soluciones prácticas y escalables. Actualmente me encuentro en una etapa de crecimiento profesional, combinando formación técnica, aprendizaje continuo y experiencia en entornos reales de trabajo."
            },
            formation: {
                title: "Mi formación",
                description:
                    "Me formé en programación y desarrollo web a través de educación formal y programas intensivos. Participé del programa Fundación Pescar, que incluyó experiencias presenciales en empresas como Corteva y una pasantía formativa con JP Morgan, donde pude conocer de cerca el trabajo en entornos tecnológicos reales."
            },
            whatILookFor: {
                title: "Qué busco",
                description:
                    "Busco crecer en entornos profesionales donde pueda aprender, aportar y participar en proyectos reales, aplicando buenas prácticas y trabajo en equipo."
            }
        }
    },

    studies: {
        certified: 'Conocimientos avalados por:'
    },

    projects: {
        sectionTitle: "Proyectos",
        sectionSubtitle: "Soluciones reales",
        buttons: {
            gitButton: "Ver en Github",
            webButton: "Ir al sitio web"
        },
        items: {
            devEvent: {
                title: "DevEvent",
                description: "Full-stack web application for discovering, creating, and booking developer events such as hackathons, meetups, and conferences. The project includes API routes, MongoDB data persistence, image uploads with Cloudinary, and caching optimizations in Next.js for improved performance."
            },
            blogNest: {
                title: "Blog API con NestJS",
                description: "API REST para una plataforma de blogging desarrollada con NestJS y PostgreSQL siguiendo la especificación RealWorld. Incluye autenticación con JWT, gestión de artículos, sistema de seguidores entre usuarios y funcionalidades sociales como favoritos y filtrado de contenido."
            },
            sportz: {
                title: "Sportz",
                description: "API REST en tiempo real para la gestión de partidos y comentarios deportivos. Permite crear eventos, manejar estados automáticos (scheduled, live, finished) y transmitir comentarios en vivo mediante WebSockets. Incluye validación estricta con Zod, ORM tipado con Drizzle y una capa de seguridad avanzada con Arcjet (rate limiting, protección contra bots y ataques)."
            },
        }
    },

    blog: {
        button: 'Leer mas',
        items: {
            backendJava: {
                fecha: "09 de Marzo",
                title: "Aprendiendo Java: el inicio de un nuevo camino",
                description:
                    "Entre cursos estructurados y práctica autodidacta, encontré un camino claro",
                type: "Lenguaje"
            },
            desarrolloPortfolio: {
                fecha: "12 de Febrero",
                title: "Cómo desarrollé mi portfolio",
                description:
                    "El proceso detrás de mi portfolio: decisiones de diseño, estructura y cómo lo pensé en componentes",
                type: "Desarrollo"
            }
        }
    },

    contact: {
        title: 'Contacta conmigo',
        pHolderSubject: 'Asunto',
        pHolderMessage: 'Mensaje',
        loadButton: 'Enviando...',
        button: 'Enviar'
    },

    footer: {
        description: {
            line1: "Este portfolio reúne distintas ideas, decisiones y formas de trabajar.",
            line2: "Detrás de cada parte hay pruebas, ajustes y criterio, con foco en lo simple y funcional.",
            line3: "Todo lo que ves acá responde a una elección."
        },

        stack: "Este sitio fue desarrollado utilizando Next.js con TypeScript para la estructura del frontend, TailwindCSS para el diseño y estilos, y el proyecto se encuentra desplegado en Vercel.",

        repo: "Ver repositorio del portfolio"
    },

    blogContent: {
        backendJava: {
            title: "Aprendiendo Java: el inicio de un nuevo camino",
            content: {
                intro1:
                    "Es curioso cómo empieza casi siempre el aprendizaje de un lenguaje nuevo. Al principio todo suele ser bastante repetitivo —o al menos para mí lo es— porque me gusta empezar desde la raíz: entender lo más básico y construir desde ahí.",

                intro2:
                    "Por eso casi siempre comienzo con el clásico “Hola Mundo”. Aunque parezca simple, este pequeño programa suele ser el primer paso para entender cómo funciona realmente un lenguaje.",

                intro3:
                    "Sin embargo, con Java la sensación fue un poco distinta. En este caso no lo veo simplemente como otro lenguaje más que aprender, sino más bien como un objetivo claro dentro de mi camino como desarrollador. Más que curiosidad técnica, lo estoy abordando como una etapa importante de crecimiento profesional.",

                primerosPasosTitle: "Los primeros pasos con Java",

                primerosPasosText1:
                    "Comencé con un curso de introducción a Java en Educación IT, y algo que me resultó bastante cómodo —y hasta divertido— fue que prácticamente todo tiene que estar tipado.",

                primerosPasosText2:
                    "Puede sonar extraño decir que eso me gustó, pero me resulta muy natural trabajar en un entorno donde cada cosa tiene su lugar y su razón de ser dentro del código. Esa estructura y claridad es algo que valoro mucho cuando aprendo una tecnología nueva.",

                caminoAprendizajeTitle: "Un camino de aprendizaje",

                caminoAprendizajeText1:
                    "Actualmente me encuentro cursando el segundo de cinco cursos que elegí para profundizar en este lenguaje. Todavía queda bastante camino por recorrer, pero justamente eso es lo interesante del proceso.",

                caminoAprendizajeText2:
                    "No voy a adelantar demasiado sobre lo que viene después —las sorpresas también son parte divertida del aprendizaje—, pero ya empezando a entrar en temas relacionados con Java Standard y programación web, siento que cada paso me acerca un poco más a lo que quiero lograr.",

                pooTitle: "Primeros conceptos de programación orientada a objetos",

                pooText:
                    "Por ahora estamos viendo conceptos fundamentales como qué es un objeto —sí, con las clásicas analogías de la receta o del auto que seguramente muchos ya conocen—.",

                pooText2:
                    "Incluso en esta etapa inicial se puede ver hacia dónde apunta todo. Entender cómo funcionan las clases, los objetos y la estructura de los programas abre la puerta a construir sistemas mucho más complejos.",

                pooAlt:
                    "Conceptos básicos de programación orientada a objetos en Java",

                reflexionTitle: "Una sensación de progreso constante",

                reflexionText1:
                    "Lo mejor de todo es esa sensación de progreso: saber que cada concepto nuevo es una pieza más que se suma al conjunto. Cada tema aprendido empieza a conectarse con el anterior y el panorama general se vuelve cada vez más claro.",

                reflexionText2:
                    "Y aunque todavía estoy en las primeras etapas, todo indica que lo mejor está por venir."

            }
        },
        desarrolloPortfolio: {
            title: "Cómo desarrollé mi portfolio",

            intro1:
                "Empecé el desarrollo de este portfolio desde una perspectiva bastante nublada. Fue un reto pensar por dónde empezar y qué era exactamente lo que quería hacer.",

            intro2:
                "Siendo este el primer desafío, decidí buscar inspiración en distintos lugares y ver qué me gustaba de cada uno. Así, poco a poco, pude armar la estructura. Algo curioso es que, mientras la iba definiendo, se me ocurrían ideas de animaciones, funcionalidades o colores, y creo que ese fue el reto más complejo: no irme por las ramas y mantenerme enfocado únicamente en la estructura.",

            luchaColoresTitle: "La lucha con los colores",

            luchaColoresText1:
                "Una vez terminada esa etapa, llegó mi lucha con los colores. Realmente fue muy difícil decidir qué paleta usar. Cada vez que creía haber elegido una, la pasaba a Figma y… pum: no quedaba bien, se veía simple o perdía visibilidad.",

            luchaColoresText2:
                "Básicamente, fue una etapa de sufrimiento. Pero después de dedicación (y algo de llanto), pude seleccionar esta paleta que, la verdad, me encantó y siento que me representa.",

            temaIdiomaTitle: "Tema e idioma",

            temaIdiomaText1:
                "Llegado a este punto, tenía más dudas que certezas. Nunca había hecho algo que cambiara de tema o de idioma, así que me puse a investigar cómo se hacía normalmente.",

            temaIdiomaText2:
                "Fue una sorpresa agradable descubrir que no era algo tan complejo (aunque todavía no lo implementé al momento de escribir esto, así que más adelante veremos si sigo pensando lo mismo).",

            pensarComponentesTitle: "Pensar el proyecto como componentes",

            pensarComponentesText:
                "En este punto llegó el momento de tomar decisiones a nivel código y, como era de esperarse, también me llené de dudas. Al final decidí mirar a Figma a los ojos, como si estuviera desafiando a Dios.",

            quoteComponentes:
                "Escribir lo que veía en mi pizarra y analizar qué se repetía fue la mejor forma de empezar a pensar el proyecto como componentes.",

            componentesIntro:
                "Luego, tras una pequeña charla con mi gran amigo, la IA, lo separé en componentes básicos, layouts y contenido.",

            componentesBasicosTitle: "Componentes básicos",

            componentesBasicosList: [
                "Título → tamaño de fuente",
                "Texto plano → tamaño de fuente, si es itálica, si tiene borde",
                "Botones → tamaño de fuente, funcionalidad, si es bold, tipo de botón (primario, secundario, terciario), si tiene logo",
                "Subtítulos → tamaño, si es bold",
                "Link → logo y/o texto",
                "Barra → elemento visual simple",
                "Input → tipo de input, tamaño"
            ],

            layoutsTitle: "Layouts del sitio",

            layoutsList: [
                "Navbar",
                "Hero",
                "Sobre mí",
                "Carrusel de avales",
                "Proyectos",
                "Blog",
                "Contacto",
                "Footer"
            ],

            contenidoTitle: "Componentes de contenido",

            contenidoList: [
                "CardModal → título y texto plano",
                "CardPresentación → imagen y link con logo",
                "CardBlog → imagen, subtítulo, barra, texto y botón"
            ],

            botonesMagicosTitle: "Los botones mágicos",

            botonesMagicosText:
                "Hay dos botones que no supe bien dónde ubicar dentro de la estructura, pero que son los que hacen la magia de esta web.",

            botonesMagicosList: [
                "Botón de idioma",
                "Botón de tema"
            ],

            portfolioAlt: "Imagen del Portafolio",

            porQueCompartirTitle: "Por qué cuento todo esto",

            porQueCompartirText1:
                "Creo que mostrar cómo separé y pensé los componentes es una forma de compartir cómo razono y cómo se me hizo más fácil encarar ciertas decisiones.",

            porQueCompartirText2:
                "Como junior, descubrí muchas cosas durante este proceso y fue muy divertido poder escribirlo y expresarlo. Además, me sirve para recordarlo, porque mi memoria suele guardar solo código y no tanto el camino que me llevó hasta ahí.",

            quoteMemoria:
                "Mi memoria suele guardar el código… pero no siempre el camino que me llevó hasta él.",

            cierre:
                "Dicho esto, ahora viene la parte divertida: el código.",

            codeTitle: "Comenzar a Codear",

            codeIntro1:
                "Empecé el desarrollo de este portfolio con una idea bastante clara: quería que el código reflejara cómo me gusta trabajar. Como ya tenía experiencia usando React y componetizando interfaces, decidí empezar por la parte que más dudas me generaba y que al mismo tiempo me parecía más interesante: permitir que el sitio cambie de idioma y de tema (dark/light).",

            codeIntro2:
                "En lugar de usar librerías externas, opté por implementar estas funcionalidades con código propio. Esto me obligó a entender mejor cómo funcionan realmente React, el manejo de estado y la forma en que Tailwind gestiona los estilos. Aunque requería más trabajo que simplemente instalar una librería, fue una decisión que valió la pena porque me permitió profundizar mucho más en cómo funcionan estas herramientas por dentro.",

            codeIntro3:
                "Una vez que estas funcionalidades principales estuvieron listas, ocurrió algo curioso. Tuve la oportunidad de participar en una entrevista donde se pedía conocimiento en Next.js, así que decidí empezar a aprenderlo. Lo que empezó como una preparación terminó siendo algo que realmente me gustó mucho. Me atrajo especialmente su forma de estructurar aplicaciones, el sistema de rutas y las ventajas que aporta al desarrollo de sitios modernos.",

            codeIntro4:
                "En ese proceso también decidí incorporar TypeScript. Siempre me han gustado más los lenguajes con tipado fuerte y estructuras más claras, así que integrar TypeScript al proyecto fue un paso bastante natural.",

            migracionNextTitle: "La migración a Next.js",

            migracionNextText1:
                "En ese momento tuve que tomar una decisión: seguir con React 'vanilla' o migrar el proyecto a Next.js con TypeScript. La elección fue bastante clara. Decidí migrar todo lo que ya había desarrollado a esta nueva estructura. El proceso no fue especialmente complejo, pero sí fue muy útil para entender mejor las diferencias entre ambos enfoques y cómo Next organiza las aplicaciones.",

            migracionNextText2:
                "Uno de los aspectos que más disfruté implementar fue el sistema de páginas dinámicas del blog (como la que estás viendo ahora). El contenido se genera a partir de un objeto que define la estructura del post, y dependiendo del tipo de contenido se renderiza un componente distinto mediante un switch.",

            renderSystemText:
                "Este enfoque me gustó mucho porque separa claramente la estructura del contenido del código que lo renderiza. Gracias a esto, agregar nuevos artículos al blog es simple y escalable.",

            reflexionTitle: "Reflexión final",

            reflexionText1:
                "En general, la parte de programación del proyecto fue bastante fluida. Curiosamente, lo más desafiante no fue escribir el código en sí, sino el proceso de diseño y tomar decisiones antes de empezar a programar.",

            reflexionText2:
                "Una vez que tenía claro qué quería construir y cómo estructurarlo, el desarrollo avanzó mucho más rápido de lo que esperaba.",

            reflexionText3:
                "En definitiva, este proyecto terminó siendo mucho más que un simple portfolio. Fue una excusa perfecta para experimentar, aprender nuevas herramientas y mejorar mi forma de estructurar proyectos. Estoy muy contento con el resultado y con todo lo que aprendí durante el proceso.",

            finalAlt: "Proceso final del desarrollo del portfolio"

        }
    }
}