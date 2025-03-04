import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/app'
import './index.css'
import store from './services/store.js';
import { Provider } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
      <BrowserRouter>
    <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
    <App />
    </DndProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
