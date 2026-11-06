# Kevin Varghees | Developer Portfolio

A minimalist, responsive personal portfolio with subtle 3D and motion effects.

## About

This is the personal portfolio of **Kevin Varghees**, a second-year B.Tech Computer Science and Engineering
(AI & Data Science) student at Marwadi University, Rajkot. It presents his skills, hackathon experience,
workshops, education and contact details in a clean editorial style.

## Technologies Used

- [React 18](https://react.dev) and [TypeScript](https://www.typescriptlang.org)
- [Vite 5](https://vitejs.dev) for development and builds
- [Tailwind CSS 3](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals, parallax and tilt effects
- [Three.js](https://threejs.org) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) for the 3D hero and About scenes
- [Lucide](https://lucide.dev) and [Simple Icons](https://simpleicons.org) for icons
- [Formspree](https://formspree.io) for the contact form

## Features

- Responsive layout for phones, tablets and desktops
- Sections: Hero, Tech strip, About, Skills, Hackathons & Experiences, Beyond the Classroom, Education, Contact
- Interactive 3D shapes and sculpture, loaded lazily and paused when off screen
- Smooth scroll animations, with a reduced-motion fallback and a flat fallback when WebGL is unavailable
- Skills shown with honest levels (Fundamentals, Learning, Project Experience)
- Working contact form with validation, a sending state, duplicate-submit protection, and clear success and error messages
- All content kept in a single file (`src/data.ts`) for easy editing

## Run Locally

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build    # type-check and build into dist/
npm run preview  # preview the production build
```

## Project Structure

```
src/
  data.ts          All site content (profile, skills, hackathons, links)
  components/      One file per section, plus animation helpers
  three/           3D scenes
  lib/             Small helpers
public/            Photo and favicon
```

## Contact Form

The form sends submissions to Formspree (`https://formspree.io/f/xwllwkvl`). The endpoint is set in
`src/data.ts`. To use a different Formspree form, copy `.env.example` to `.env` and set
`VITE_FORM_ENDPOINT`, then restart the dev server. A Formspree endpoint is public by design and is not a secret.

## Deploy

Run `npm run build` and upload the `dist/` folder to Netlify, Vercel or GitHub Pages. For GitHub Pages under a
sub-path, set `base` in `vite.config.ts`.

## Contact

- Email: [kevinvarghees043@gmail.com](mailto:kevinvarghees043@gmail.com)
- GitHub: [github.com/kevin-varghees](https://github.com/kevin-varghees)
- LinkedIn: [linkedin.com/in/kevin-varghees-72a413373](https://linkedin.com/in/kevin-varghees-72a413373)
- X: [x.com/KevinVarghees](https://x.com/KevinVarghees)

© 2026 Kevin Varghees. All rights reserved.
