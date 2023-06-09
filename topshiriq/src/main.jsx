import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './stories/store.js'
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from './context/context.js'
import { server } from './utils/serverData.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Context.Provider value={{server}}>
      <BrowserRouter>
       <App />
      </BrowserRouter>,
    </Context.Provider>
  </Provider>
)
