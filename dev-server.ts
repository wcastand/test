import micro from 'micro'
import index from './functions/graphql'

const server = micro(async (req, res) => {
  const url: string | undefined = req.url
  return index(req, res)
})

server.listen(4000, () => console.log('listen on 4000'))
