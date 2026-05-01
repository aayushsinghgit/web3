# 🔐 Vaulta — Web3 Crypto Wallet Platform

> A production-ready, dark glassmorphic Web3 platform built on Ethereum. Send ETH, explore DeFi swaps, launch fundraisers, track ROI, and grow your network — all from a single premium interface.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Architecture](#project-architecture)
5. [Getting Started](#getting-started)
6. [Route Map](#route-map)
7. [State Management](#state-management)
8. [Performance Optimization](#performance-optimization)
9. [Design System](#design-system)
10. [Known Issues & Limitations](#known-issues--limitations)
11. [Future Roadmap](#future-roadmap)

---

## Overview

**Vaulta** is a full-featured Web3 wallet and financial tools platform. It connects to MetaMask via `ethers.js`, enables real Ethereum transactions, and wraps that capability in a suite of DeFi productivity tools including an ROI calculator, community fundraiser, referral network, and token sale UI.

The application is designed around a **dark glassmorphism** design language — every surface uses blurred, semi-transparent layers that give the UI a premium, futuristic feel.

---

## Features

| Feature | Route | Description |
|---|---|---|
| 🏠 Home | `/` | Hero landing with animated globe, live stats, and platform overview |
| 👛 Wallet | `/wallet` | Connect MetaMask, send ETH, view portfolio, live transaction history |
| 💰 Token Sale | `/token-sale` | Live VLT token sale with countdown timer and purchase flow |
| 🏦 Fundraiser | `/fundraiser` | Browse and launch on-chain community fundraisers |
| 🔁 Exchanges | `/exchanges` | Top exchange listings with live prices |
| 📊 ROI Calculator | `/calculator` | Calculate token investment returns, save to portfolio |
| ℹ️ About | `/about` | Platform story and mission |
| 👥 Referral | `/referral` | Referral program with tiered commission system |
| 📝 Careers | `/careers` | Open positions |
| 📰 Blog | `/blog` | Ecosystem news and updates |
| 🚀 Vision | `/vision` | Long-term platform roadmap |
| 🎬 Demo | `/demo` | Product video demo tour |
| ✨ Get Started | `/get-started` | Onboarding flow with wallet connection options |
| 🔗 Share Link | `/share-link` | Referral link generator with social sharing |
| 🏆 Rankings | `/rankings` | Global referral leaderboard |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **UI Framework** | React | 19.x |
| **Language** | TypeScript | 6.x |
| **Bundler** | Vite | 5.x |
| **Styling** | Tailwind CSS | 3.x |
| **Animations** | Framer Motion | 12.x |
| **3D Graphics** | Three.js + React Three Fiber | 0.184 / 9.x |
| **Blockchain** | Ethers.js | 5.7.x |
| **Routing** | React Router DOM | 5.x |
| **Charts** | Recharts | 3.x |
| **Notifications** | React Hot Toast | 2.x |
| **Date Utils** | date-fns | 4.x |
| **Icons** | Lucide React | 0.400 |

---

## Project Architecture

```
crypto-app/
├── src/
│   ├── App.tsx                    # Root router with lazy loading + RouteWrapper
│   ├── main.tsx                   # React entry point with TransactionProvider
│   │
│   ├── Screens/                   # Full-page route components
│   │   ├── Homepage.tsx           # Landing page
│   │   ├── Walletpage.tsx         # Wallet dashboard
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── Careers.tsx
│   │   ├── Demo.tsx
│   │   ├── Exchanges.tsx
│   │   ├── Footer.tsx             # Shared footer component
│   │   ├── Fundraiser.tsx         # Fundraiser + modal
│   │   ├── GetStarted.tsx         # Onboarding
│   │   ├── Rankings.tsx           # Leaderboard
│   │   ├── Referral.tsx
│   │   ├── ReturnCalculator.tsx   # ROI calculator with localStorage
│   │   ├── ShareLink.tsx
│   │   ├── TokenSale.tsx
│   │   └── Vision.tsx
│   │
│   ├── Components/                # Reusable UI components
│   │   ├── Header.tsx             # Sticky nav with wallet connect
│   │   ├── Chatbot.tsx            # Floating AI support widget
│   │   ├── Exchange.tsx           # Price ticker component
│   │   ├── NetworkBanner.tsx      # Network status bar
│   │   ├── Portfolio.tsx          # Portfolio pie chart + holdings
│   │   ├── TransactionList.tsx    # On-chain tx list + ROI records
│   │   ├── Blockchain.tsx         # Animated blockchain visualization
│   │   ├── Referral.tsx           # Referral stats component
│   │   ├── Skeleton.tsx           # Loading skeleton UI
│   │   └── Vision.tsx             # Vision section component
│   │
│   ├── Wallet/
│   │   ├── context/
│   │   │   └── TransactionContext.tsx  # Global wallet + tx state
│   │   └── utils/
│   │       └── shortAddress.ts         # Address formatting utility
│   │
│   └── data/
│       └── content.json           # Centralized copy/content
│
├── public/                        # Static assets
├── vite.config.ts                 # Build config with chunk splitting
├── tailwind.config.js             # Tailwind + CSS variables
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MetaMask browser extension

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd crypto-wallet/crypto-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app runs at **http://localhost:5173**

### Build for Production

```bash
npm run build       # Compile TypeScript + bundle with Vite
npm run preview     # Preview the production build locally
```

---

## Route Map

All routes use **React Router v5** with `<Switch>` and `<Route>`. Every route except `/` is automatically wrapped by the `RouteWrapper` component in `App.tsx`, which applies `pt-20` top padding to clear the sticky header.

All screens are **lazy-loaded** via `React.lazy()` + `<Suspense>`, which means each screen is only downloaded when a user navigates to it. The fallback shows a branded spinner with a rotating crypto/finance quote.

---

## State Management

Global state is managed via a single React Context:

### `TransactionContext` (`src/Wallet/context/TransactionContext.tsx`)

| Value | Type | Description |
|---|---|---|
| `currentAccount` | `string` | Connected wallet address |
| `transactions` | `Transaction[]` | On-chain transaction history |
| `isLoading` | `boolean` | Loading state for async operations |
| `connectWallet` | `() => void` | Triggers MetaMask connection |
| `sendTransaction` | `(data) => void` | Sends ETH transaction via ethers.js |

### localStorage Keys

| Key | Used In | Description |
|---|---|---|
| `vaulta_holdings` | Portfolio component | User's manually added token holdings |
| `vaulta_portfolio_calcs` | ReturnCalculator + TransactionList | Saved ROI calculations |

---

## Performance Optimization

The Vite build is configured with **manual chunk splitting** in `vite.config.ts`:

| Chunk | Libraries | Benefit |
|---|---|---|
| `vendor-react` | react, react-dom, react-router-dom | Cached forever, changes rarely |
| `vendor-three` | three, @react-three/fiber, @react-three/drei | Isolated — only loaded on pages needing 3D |
| `vendor-motion` | framer-motion | Shared animation runtime |
| `vendor-ethers` | ethers | Wallet/blockchain logic |
| `vendor-charts` | recharts | Only loaded on wallet/portfolio pages |
| `vendor-ui` | lucide-react, react-hot-toast, react-countup, date-fns | Small UI utilities |

> **Note:** `three.js` is inherently large (~1MB minified). This is expected for any 3D web experience. The chunk isolation means it only loads once and is cached by the browser.

---

## Design System

The project uses **Tailwind CSS + CSS Custom Properties** for theming. All colors are defined as CSS variables to support light/dark mode switching.

### Core Variables

```css
--bg-primary       /* Page background */
--surface          /* Card / panel background */
--surface-hover    /* Hovered card state */
--border           /* Border color */
--text-primary     /* Main text */
--text-muted       /* Secondary / subdued text */
--brand            /* Primary brand purple (#6C63FF) */
```

### Typography
- **Font:** System sans-serif (Tailwind default)
- **Headings:** `font-black` with `tracking-tighter` for the editorial look
- **Labels:** `text-[10px] font-black uppercase tracking-widest` — used throughout for section labels

### Animation Patterns
- **Page enter:** `initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}`
- **Hover cards:** `whileHover={{ y: -10 }}` or `whileHover={{ x: 10 }}`
- **Easing:** `[0.16, 1, 0.3, 1]` — a custom spring curve used throughout (cast with `as any` due to Framer Motion v12 strict typing)
- **Parallax:** `useScroll + useTransform` for depth layering on hero sections

---

## Known Issues & Limitations

| Issue | Details | Workaround |
|---|---|---|
| Framer Motion `ease` typing | v12 has strict `ease` array types causing TS errors | Cast with `as any` — does not affect runtime behavior |
| `three.js` chunk size | ~1MB minified, triggers Vite warning | Isolated in its own chunk; warning threshold set to 600kB |
| MetaMask required | Wallet features only work with MetaMask installed | App gracefully shows "Connect Wallet" prompts |
| Fundraiser form | Currently simulates contract deploy (2s timeout) | Replace `setTimeout` with actual `ethers.js` contract deployment |
| Referral codes | Generated from wallet address client-side | Should be generated server-side for production |

---

## Future Roadmap

- [ ] Real smart contract integration for Fundraiser using Hardhat/Foundry
- [ ] WalletConnect support (beyond MetaMask only)
- [ ] Server-side referral code generation + leaderboard from real DB
- [ ] Live VLT token price feed via CoinGecko or CryptoCompare
- [ ] Push notifications for transaction confirmations
- [ ] Mobile-responsive improvements for wallet page
- [ ] Unit + integration tests with Vitest + Testing Library
- [ ] i18n internationalization support

---

*Built with ❤️ by the Vaulta team. Powered by Ethereum.*
