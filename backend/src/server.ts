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

const app = express()
app.disable('x-powered-by')
app.use(express.json())

if (env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  )
}

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
  apolloServer.applyMiddleware({ app })

  app.listen(env.port, () => {
    console.log(`Server is listening on port ${env.port}`)
  })
}
startServer()
