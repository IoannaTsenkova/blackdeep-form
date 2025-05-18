
# 📝 Blackdeep Registration Form

This multi-step registration form is built with **React**, **TypeScript**, **Chakra UI**, **React Hook Form**, **Zod**, and **Mock Service Worker (MSW)**. The form includes two steps:

1. **Step 1**: Collects full name, password, confirm password, and interests (with multiselect).
2. **Step 2**: Allows uploading an avatar image with preview functionality.

The form includes validation, navigation between steps, and runs in both development and production environments.


## 🚀 Live Demo

👉 [https://blackdeep-form.vercel.app](https://blackdeep-form.vercel.app)


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

## 🧪 Running Tests

This project uses **Vitest** and **React Testing Library**.

### Run all tests:

```bash
yarn test
```

### Run tests with coverage:

```bash
yarn test --coverage
```

Test coverage includes:

- Validation logic and error handling in Step 1
- Dynamic interests selection (mocked from MSW)
- File upload, image preview, and validation in Step 2
- Integration tests for navigating between steps

## Folder Structure Overview
```
blackdeep-form/
├── public/               # Static assets like favicon, robots.txt
├── src/
|   ├── tests             # Vitest test files
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
