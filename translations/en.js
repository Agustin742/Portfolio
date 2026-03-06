export const en = {
    nav: {
        about: 'About me',
        projects: 'Projects',
        expForm: 'Exp. and Formation',
        blog: 'Blog',
        contact: 'Contact'
    },

    hero: {
        greeting: "I'm Agustin Tabarcache",
        role: {
            prefix: "FullStack",
            highlight: "Developer"
        },
        description: "Software developer focused on building functional applications, continuously learning, and solving real-world problems with code.",
        quote: '"The only way to go fast is to go well" - Robert C. Martin',
        downloadCV: "Open CV"
    },

    about: {
        title: "About me",
        description1:
            "I work with these technologies in real projects and hands-on practice, applying best practices and a solid development foundation.",
        description2:
            "Additionally, I continue incorporating new tools and languages to strengthen my full stack profile and expand my ability to solve real-world problems.",
        knowTitle: "I have experience with:",
        learningTitle: "Currently learning:",
        cards: {
            whoAmI: {
                title: "Who I Am",
                description:
                    "I am a Full Stack developer with training in programming and web development, focused on building practical and scalable solutions. I am currently in a stage of professional growth, combining technical education, continuous learning, and experience in real work environments."
            },
            formation: {
                title: "My Education",
                description:
                    "I trained in programming and web development through formal education and intensive programs. I participated in the Fundación Pescar program, which included in-person experiences at companies such as Corteva and a formative internship with JP Morgan, where I gained first-hand exposure to real-world technological environments."
            },
            whatILookFor: {
                title: "What I’m Looking For",
                description:
                    "I aim to grow in professional environments where I can learn, contribute, and participate in real projects while applying best practices and teamwork."
            }
        }
    },

    studies: {
        certified: 'Skills certified by:'
    },

    projects: {
        sectionTitle: "Projects",
        sectionSubtitle: "Real solutions",
        buttons: {
            gitButton: "View in Github",
            webButton: "Go to the website"
        },
        items: {
            wasifix: {
                title: "Wasifix",
                description: "Web application focused on managing and hiring home services, designed to connect users with solutions in a simple and clear way. Developed as a full stack experience, with emphasis on clean interface, data organization, and scalability."
            },
            taskflow: {
                title: "TaskFlow",
                description: "Task and project management platform focused on small teams. It allows organizing tasks by status, assigning responsibilities, and tracking progress. Built with a modular architecture and secure authentication."
            },
            devconnect: {
                title: "DevConnect API",
                description: "REST API for a developer-oriented social network. Includes JWT authentication, posts, comments, and favorites system. Designed prioritizing best practices, strong validations, and clear separation of concerns."
            }
        }
    },

    blog: {
        button: 'Read more',
        items: {
            backendJava: {
                fecha: "January 23",
                title: "Learning backend without getting lost: my approach with Java",
                description:
                    "Between structured courses and self-taught practice, I found a clear path.",
                type: "Language"
            },
            desarrolloPortfolio: {
                fecha: "March 5",
                title: "How I built my portfolio",
                description:
                    "The process behind my portfolio: design decisions, structure and how I approached it with components",
                type: "Development"
            }
        }
    },

    blogContent: {
        backendJava: {
            title: "Learning Backend with Java",
            content: {
                intro:
                    "Learning backend with Java is one of the best decisions if you want to work in professional software development. Java remains one of the most widely used languages in enterprise systems.",

                queEsBackendTitle: "What is backend?",
                queEsBackendText:
                    "The backend is the part of the system responsible for business logic, data management, and communication with databases or external services.",

                springBootTitle: "Simple example with Spring Boot",
                springBootText:
                    "Frameworks like Spring Boot allow developers to quickly create REST APIs and structure backend applications following good practices."
            }
        },
        desarrolloPortfolio: {
            title: "How I built my portfolio",

            intro1:
                "I started developing this portfolio with a pretty unclear vision. It was a challenge to figure out where to begin and what I actually wanted to build.",

            intro2:
                "Since that was the first challenge, I decided to look for inspiration in different places and see what I liked about each one. Little by little I was able to build the structure. Something curious is that while defining it, ideas for animations, features, or colors kept appearing. I think that was the hardest challenge: not getting distracted and staying focused only on the structure.",

            luchaColoresTitle: "The struggle with colors",

            luchaColoresText1:
                "Once that stage was finished, my struggle with colors began. It was really difficult to decide which palette to use. Every time I thought I had chosen one, I moved it to Figma and… boom: it didn't look right, it felt too simple or lost visibility.",

            luchaColoresText2:
                "Basically, it was a stage of suffering. But after dedication (and a bit of crying), I managed to choose this palette that I honestly love and feel represents me.",

            temaIdiomaTitle: "Theme and language",

            temaIdiomaText1:
                "At this point I had more doubts than certainties. I had never built something that changed theme or language, so I started researching how it was usually implemented.",

            temaIdiomaText2:
                "It was a pleasant surprise to discover that it wasn't that complex (although I haven't implemented it yet while writing this, so we'll see later if I still think the same).",

            pensarComponentesTitle: "Thinking about the project as components",

            pensarComponentesText:
                "At this point it was time to make decisions at the code level and, as expected, doubts appeared again. In the end I decided to look Figma straight in the eyes, almost like challenging a god.",

            quoteComponentes:
                "Writing down what I saw on my board and analyzing what repeated itself was the best way to start thinking about the project as components.",

            componentesIntro:
                "Later, after a short conversation with my great friend, AI, I separated it into basic components, layouts, and content.",

            componentesBasicosTitle: "Basic components",

            componentesBasicosList: [
                "Title → font size",
                "Plain text → font size, italic option, borders",
                "Buttons → font size, functionality, bold, button type (primary, secondary, tertiary), optional icon",
                "Subtitles → size and bold option",
                "Link → icon and/or text",
                "Bar → simple visual element",
                "Input → input type and size"
            ],

            layoutsTitle: "Site layouts",

            layoutsList: [
                "Navbar",
                "Hero",
                "About me",
                "Testimonials carousel",
                "Projects",
                "Blog",
                "Contact",
                "Footer"
            ],

            contenidoTitle: "Content components",

            contenidoList: [
                "CardModal → title and plain text",
                "CardPresentation → image and link with icon",
                "CardBlog → image, subtitle, divider, text and button"
            ],

            botonesMagicosTitle: "The magic buttons",

            botonesMagicosText:
                "There are two buttons that I wasn't sure where to place in the structure, but they are the ones that make the magic happen on this website.",

            botonesMagicosList: [
                "Language button",
                "Theme button"
            ],

            porQueCompartirTitle: "Why I'm sharing this",

            porQueCompartirText1:
                "I think showing how I separated and thought about components is a way to share how I reason and how it became easier for me to approach certain decisions.",

            porQueCompartirText2:
                "As a junior developer I discovered many things during this process and it was really fun to write about it. It also helps me remember it, because my memory usually keeps the code but not the path that led me there.",

            quoteMemoria:
                "My memory tends to store the code… but not always the path that led me to it.",

            cierre:
                "With that said, now comes the fun part: the code."
        }
    }
}