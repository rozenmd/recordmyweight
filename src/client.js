import App from './App'
import { HelmetProvider } from 'react-helmet-async'

import BrowserRouter from 'react-router-dom/BrowserRouter'
import React from 'react'
import { hydrate } from 'react-dom'

import fetch from 'isomorphic-fetch'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  link: createHttpLink({
    // uri: 'https://recordmyweight.com/graphql',
    uri: 'http://localhost:3002/graphql',
    fetch: fetch
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  ssrForceFetchDelay: 100
})

hydrate(
  <HelmetProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </HelmetProvider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
