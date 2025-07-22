# Theresidentguy

**Theresidentguy** is an AI-powered platform designed to assist medical residency candidates and job seekers by simulating realistic interviews, providing personalized questions, assessing responses, and offering actionable feedback. The platform leverages modern web technologies to deliver a seamless, interactive experience.

## Features

- **AI Interview Copilot**: Real-time AI-powered assistance during interviews, including contextual awareness, personalized responses, and customizable preparation.
- **Mock Interviews**: Practice interviews with instant feedback and analytics.
- **AI Tools Suite**: Resume optimization, grading, ATS compatibility checks, and more.
- **Guided Tutorials**: Step-by-step guides for setting up permissions and using the platform.
- **User Dashboard**: Personalized dashboard to track progress, access tutorials, and manage your account.
- **Authentication**: Secure sign-up, sign-in, password reset, and verification flows.
- **Responsive UI**: Modern, mobile-friendly design using Tailwind CSS.


## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: Tailwind CSS, custom themes
- **UI Components**: Framer Motion, ApexCharts, SweetAlert2, React Multi Carousel, and more
- **Notifications**: React Toastify
- **APIs**: Integration with backend via REST API
- **Deployment**: Vercel (with SPA rewrites)


## Project Structure

```
.
├── public/                # Static assets (logo, images, favicon)
├── src/
│   ├── app.tsx            # Main app component and routing
│   ├── main.tsx           # React entry point
│   ├── index.css          # Global styles
│   ├── components/        # Reusable UI components
│   ├── context/           # Global state and API helpers
│   ├── pages/
│   │   ├── home/          # Landing and feature pages
│   │   ├── app/           # Authenticated app/dashboard pages
│   │   ├── auth/          # Authentication pages
│   │   └── ...            # Other feature modules
│   └── ...                # Types, config, etc.
├── package.json           # Project metadata and dependencies
├── tailwind.config.cjs    # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel deployment config
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Yarn or npm

### Installation

```bash
# Install dependencies
yarn install
# or
npm install
```

### Development

```bash
# Start the development server
yarn dev
# or
npm run dev
```

The app will be available at `http://localhost:5174`.

### Build

```bash
# Build for production
yarn build
# or
npm run build
```

### Preview Production Build

```bash
yarn preview
# or
npm run preview
```

## Customization

- **Tailwind CSS**: Customize styles in `tailwind.config.cjs`.
- **Assets**: Replace images and logos in the `public/` directory.
- **API Integration**: Update API endpoints in the context files as needed.

## License

This project is for educational and demonstration purposes. For commercial use, please contact the author.
