import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
)
