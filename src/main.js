import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './showcase/App';
import { ToastProvider } from './components/composite/toast';
import './tokens/index.css';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(ToastProvider, { children: _jsx(App, {}) }) }));
