# JJK Promo

# Introduction

This website is dedicated to celebrating the anime and manga series "Jujutsu Kaisen."
My aim is to provide information and promote the series. I strive to respect the original creators and their work.

### _DISCLAIMER:_

> _I do not own the copyrights or any intellectual property associated with Jujutsu Kaisen. All images, characters, logos, and other content are the property of their respective owners, including but not limited to Gege Akutami, Shueisha, MAPPA, and other related entities. If you are the rightful owner of any content featured on this website and wish for it to be removed or credited differently, please contact me, and I will promptly address your concerns._

## Overview

The technical aim of this project is to experiment within an animation rich environment while promoting a product.

I have created a custom "magnetic" cursor and scroll to top button(which follows the mouse position) using framer-motion. To minimize bundle size gsap could also be used as an alternative, as it is already included in the project for its usage of timelines and ScrolLTrigger, but due to the cursor looking better with spring animated values I also went with framer-motion.

## Technologies Used

- Vite-React
- SCSS
- [studio-freight/lenis](https://github.com/studio-freight/lenis)
- [tanstack/react-router](https://github.com/TanStack/router)
- [framer-motion](https://github.com/framer/motion)
- [gsap](https://github.com/greensock/GSAP)

### Installation && Local Development

```bash
git clone https://github.com/EduardStroescu/JJK-promo.git
npm install
npm run dev
```

### To prepare for production/minify

```bash
npm run build
```
