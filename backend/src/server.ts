import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'

import 'config/firebase'
import 'config/mongoose-connect'
import env from 'config/env'
import authRouter from 'routes/auth'
import { validateToken, decodeTokenToUser } from 'middlewares/auth'

import schema from 'graphql-schema'
import { getCorsOptions } from 'config/cors'

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.use(cors(getCorsOptions()))

app.use('/auth', validateToken, decodeTokenToUser, authRouter)

const startServer = async () => {
  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req }) => ({
      user: req.user,
    }),
    plugins: [
      env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })

  await apolloServer.start()
  app.use(decodeTokenToUser)
  apolloServer.applyMiddleware({
    cors: false,
    app,
  })

  app.listen(env.port, () => {
    console.log(`Server is listening on port ${env.port}`)
  })
}
startServer()
