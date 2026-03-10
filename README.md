# 🌿 Portfolio — Agustin Tabarcache

Portfolio personal desarrollado con **Next.js 15**, **TypeScript** y **Tailwind CSS v4**. Diseñado para mostrar proyectos, habilidades, entradas de blog y un formulario de contacto.

---

## ✨ Características

- **Modo oscuro / claro** con toggle personalizado
- **Multilenguaje** (Español / Inglés) con sistema de traducciones propio
- **Blog** con páginas dinámicas por slug
- **Secciones:** Hero, Sobre mí, Estudios, Proyectos, Blog, Contacto
- **Formulario de contacto** integrado con EmailJS
- **Animaciones** de carrusel y gradiente en CSS puro
- **Diseño responsive** para mobile y desktop

---

## 🛠️ Tech Stack

| Categoría | Tecnologías |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Íconos | React Icons |
| Email | EmailJS |
| Fuentes | Google Fonts — Poppins |

---

## 📁 Estructura del proyecto

```
├── app/
│   ├── page.tsx              # Página principal
│   ├── layout.tsx            # Layout raíz con providers
│   ├── globals.css           # Estilos globales y animaciones
│   └── blog/[slug]/page.tsx  # Páginas dinámicas del blog
├── components/
│   ├── commons/              # BlogCard, BlogPage, ProfileCard, etc.
│   ├── layout/               # Navbar, Footer
│   └── ui/                   # Button, ThemeToggle, LanguageToggle, etc.
├── context/                  # ThemeProvider, LanguageProvider
├── hooks/                    # useTheme, useLanguage
├── data/                     # Datos de proyectos, blog, tecnologías
└── translations/             # Archivos de i18n (es / en)
```

---

## 📬 Contacto

- **Email:** agustintabarcache74@gmail.com
- **LinkedIn:** [agustin-tabarcache](https://www.linkedin.com/in/agustin-tabarcache-42060b2a1)
- **GitHub:** [@Agustin742](https://github.com/Agustin742)
