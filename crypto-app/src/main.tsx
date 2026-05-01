import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { TransactionProvider } from './Wallet/context/TransactionContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TransactionProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color: '#F0EFFF',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#22C55E', secondary: '#F0EFFF' } },
            error: { iconTheme: { primary: '#EF4444', secondary: '#F0EFFF' } },
          }}
        />
        <App />
        </TransactionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
