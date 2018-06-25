import app from './server'
import http from 'http'

const server = http.createServer(app)

let currentApp = app

server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started')
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!')

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    server.removeListener('request', currentApp)
    const newApp = require('./server').default
    server.on('request', newApp)
    currentApp = newApp
  })
}
//
// import awsServerlessExpress from 'aws-serverless-express'
// import app from './server'
// const binaryMimeTypes = [
//   'application/octet-stream',
//   'font/eot',
//   'font/opentype',
//   'font/otf',
//   'image/jpeg',
//   'image/png',
//   'image/svg+xml',
// ]
// const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)
//
// export const handler = (event, context, callback) => {
//   awsServerlessExpress.proxy(server, event, context)
// }
