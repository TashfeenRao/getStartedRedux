import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/stateManagement/store'
import { Provider } from 'react-redux'

import { worker } from './api/server'
import {fetchUsers} from "./app/stateManagement/usersSlice";

// Start our mock API server
worker.start({ onUnhandledRequest: 'bypass' })


store.dispatch(fetchUsers())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
