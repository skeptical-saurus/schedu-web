import { schemaComposer } from 'graphql-compose'

import * as queries from './query'
// import * as mutations from './mutation'

schemaComposer.Query.addFields(queries)
// schemaComposer.Mutation.addFields(mutations)

const schema = schemaComposer.buildSchema()

export default schema
