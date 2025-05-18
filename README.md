
# Blackdeep Registration Form

## Project Description
This project is a multi-step registration form built with React, TypeScript, and Chakra UI. It uses react-hook-form and Zod for form handling and validation, and features a mock server to simulate API requests. The form consists of two steps: selecting interests and providing personal details. It aims to demonstrate best practices in frontend development and form management.

## Setup and Running Locally

### Prerequisites
- Node.js (>=14.x)
- Yarn package manager (recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/IoannaTsenkova/blackdeep-form.git
   cd blackdeep-form
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Run the development server:
   ```bash
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:5173` to see the app running.

## Folder Structure Overview
```
blackdeep-form/
├── public/               # Static assets like favicon, robots.txt
├── src/
│   ├── components/       # Reusable UI components
│   ├── features/         # Components for each form step
│   ├── mocks/            # API and mock server setup
│   ├── styles/           # Global styles and theming
│   ├── schemas/          # Zod schemas for form validation
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Important Notes
- The project uses Vite as the build tool.
- Form validation is done with Zod integrated into react-hook-form.
- Mock server is implemented to simulate API calls for the interests list and registration submission.
- Chakra UI is used for consistent styling and responsive design.
- Multi-step form logic is managed via React state and form context.
