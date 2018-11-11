'use strict'

const api = require('./api')
const port = process.env.PORT || 3001

api.listen(port, () =>
  console.log(`Server is listening on port ${port}.`)
)
