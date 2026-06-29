export const en = {
    nav: {
        about: 'About me',
        projects: 'Projects',
        expForm: 'Exp. and Formation',
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
            devEvent: {
                title: "DevEvent",
                description: "Aplicación full stack para descubrir, crear y reservar eventos orientados a desarrolladores como hackathons, meetups y conferencias. El proyecto implementa un backend con API Routes, persistencia en MongoDB, subida de imágenes con Cloudinary y optimizaciones de caching en Next.js para mejorar el rendimiento."
            },
            blogNest: {
                title: "Blog API with NestJS",
                description: "REST API for a blogging platform built with NestJS and PostgreSQL following the RealWorld specification. It includes JWT authentication, article management, user following system, and social features such as favorites and content filtering."
            },
            sportz: {
                title: "Sportz",
                description: "Real-time REST API for managing sports matches and live commentary. Supports event creation, automatic match status handling (scheduled, live, finished), and real-time updates via WebSockets. Features strict validation with Zod, a type-safe ORM with Drizzle, and advanced security using Arcjet (rate limiting, bot protection, and attack shielding)."
            }
        }
    },

    contact: {
        title: "Contact me",
        pHolderSubject: "Subject",
        pHolderMessage: "Message",
        loadButton: "Sending...",
        button: "Send"
    },
    footer: {
        description: {
            line1: "This portfolio brings together different ideas, decisions, and ways of working.",
            line2: "Behind each part there are tests, adjustments, and judgment, with a focus on simplicity and functionality.",
            line3: "Everything you see here is the result of a deliberate choice."
        },

        stack: "This site was developed using Next.js with TypeScript for the frontend structure, TailwindCSS for styling and design, and the project is deployed on Vercel.",

        repo: "View portfolio repository"
    }
}
