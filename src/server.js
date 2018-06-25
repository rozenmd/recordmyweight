import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'

import { ApolloProvider, renderToStringWithData } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'

import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

import Helmet, { HelmetProvider } from 'react-helmet-async'
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        // uri: 'https://recordmyweight.com/graphql',
        uri: 'http://localhost:3002/graphql',
        fetch: fetch
      }),
      cache: new InMemoryCache()
    })

    const helmetContext = {}

    const context = {}
    const component = (
      <HelmetProvider context={helmetContext}>
        <ApolloProvider client={client}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      </HelmetProvider>
    )

    if (context.url) {
      res.redirect(context.url)
    } else {
      renderToStringWithData(component)
        .then(content => {
          const { cache } = client
          const { helmet } = helmetContext
          res.status(200).send(
            `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Record My Weight - Track your weight online for free</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <script>
              window.__APOLLO_STATE__=${JSON.stringify(cache.extract())};
          </script>
      </head>
      <body>
          <div id="root">${content}</div>
      </body>
  </html>`
          )
        })
        .catch(e => {
          console.error('RENDERING ERROR:', e) // eslint-disable-line no-console
          res.status(500)
          res.end(`${e}\n\nAn error occurred. Stack trace:\n\n${e.stack} `)
        })
    }
  })

export default server
