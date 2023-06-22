import ethers from 'ethers'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fetch from 'node-fetch'


/*
 * Setup an Express app for returning JSON to the client
 */
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.options('*', cors())

/*
 * Test endpoint for server status
 */
app.get('/', (req, res) => res.send('Working!'))

app.get('/:contractaddress/:id', async (req, res) => {
  const contractaddress = req.params.contractaddress
  const id = req.params.id

  if (!contractaddress) {
    res.status(404).send('No contract address')
    return
  }

  if (!id) {
    res.status(404).send('No token id')
    return
  }

  const functionSignatureHash = '0xc87b56dd' // Keccak-256 hash of "tokenURI(uint256)" and take the first 4 bytes
  const encodedArgs = ethers.utils.defaultAbiCoder.encode(['uint256'], [id])
  const functionData = functionSignatureHash + encodedArgs.substring(2) // Remove the "0x" prefix from the encoded arguments
  try {
    const response = await fetch('https://cloudflare-eth.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_call',
        params: [
          {
            to: ethers.utils.getAddress(contractaddress),
            data: functionData,
          },
          'latest',
        ],
      }),
    })
    const responseJSONFromRPC = await response.json()
    const decodedResult = ethers.utils.toUtf8String(responseJSONFromRPC.result)
    // @dev: this is not flexible at all and is specific to on-chain data:application URLs
    // @dev: it solves for the fact that ressy/result are left-padded with 0s when returning strings
    const trimIndex = decodedResult.indexOf('data:application')
    let urlOfNFTJSON = ressy.substring(trimIndex) // cut out all text before the data:application occurence
    const theNFTJSONResponse = await fetch(urlOfNFTJSON)
    const theNFTJSON = await theactualJSONResponse.json()
    res.json(theNFTJSON)
  } catch(e) {
    res.status(500).send(e)
  }

  return
})
/*
 * Start the server on port 3000
 */
app.listen(process.env.PORT || 3000, () => {
  console.log('app is running on port 3000')
})
