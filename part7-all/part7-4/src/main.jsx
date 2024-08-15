import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import { Provider } from 'react-redux'
import store from './store/rootReducer'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary fallback={<h1>Something went wrong...</h1>}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
