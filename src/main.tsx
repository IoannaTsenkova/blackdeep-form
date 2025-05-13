import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { Provider } from "@/components/ui/provider"

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);