import GphApiClient from 'giphy-js-sdk-core'
console.log(process.env.giphy_api_key)
export default GphApiClient(process.env.giphy_api_key)
