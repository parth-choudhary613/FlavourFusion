# 🌌 HORIZON — Experimental Horizontal Scrolling Website

A lightweight, modern experimental web application built with **React**, **Vite**, and **Tailwind CSS**.

---

## ⚡ Core Concept: Vertical Input ➔ Horizontal Forward Movement

The primary mechanic of this website is converting standard **vertical mouse-wheel ticks, trackpad scrolling, touch swipes, and keyboard down/up arrows** into smooth **horizontal forward motion** along a continuous spatial track.

### ✨ Key Features

- **Physics & Motion**:
  - `requestAnimationFrame` continuous Linear Interpolation (LERP) loop.
  - Zero-jitter hardware-accelerated CSS `translate3d` transform on the horizontal track.
  - Dynamic velocity tracking with subtle parallax depth on background elements.
- **Multi-Input Controls**:
  - 🖱️ **Mouse Wheel & Trackpad**: Scroll vertically to travel horizontally forward/backward.
  - 📱 **Touch Gestures**: Swipe vertically or horizontally on mobile/tablet devices.
  - ⌨️ **Keyboard Navigation**: Use `Arrow Right`, `Arrow Down`, `Page Down`, or `Space` to advance; `Arrow Left`, `Arrow Up`, `Page Up` to retreat; `Home` and `End` to jump.
  - 🎯 **Interactive HUD Dock**: Click any section tab (`Hero`, `About`, `Features`, `Contact`) or arrow buttons to glide directly to any section.
- **Minimal Aesthetic**:
  - Dark sleek palette (`#07080D`) with glassmorphic cards and ambient glowing orbs.
  - Clean typography using *Space Grotesk*, *Inter*, and *JetBrains Mono*.
  - Rounded cards, clean spacing, and zero bloated 3D libraries.

---

## 🚀 Getting Started

### 1. Navigate to Project
```bash
cd C:\Users\ASUS\.gemini\antigravity\scratch\horizontal-scroll-site
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.jsx        # 01. Hero & visual scroll cue
│   │   ├── AboutSection.jsx       # 02. Spatial concept & glass card
│   │   ├── FeaturesSection.jsx    # 03. 3 Minimal feature cards
│   │   └── ContactSection.jsx     # 04. Minimal CTA & copy email button
│   ├── BackgroundElements.jsx     # Parallax ambient glow orbs & spatial grid
│   └── Navigation.jsx             # Top progress bar & floating HUD dock
├── hooks/
│   └── useHorizontalScroll.js     # Vertical-to-horizontal conversion engine
├── App.jsx                        # Main viewport & track container
├── main.jsx                       # Entry point
└── index.css                      # Tailwind base layers & glassmorphic classes
```
