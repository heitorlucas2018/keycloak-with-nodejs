/**
 * Configuration to connections keyclock
 *
 * @example {
 *    clientId: string,
 *    bearerOnly: bool,
 *    serverUrl: string,
 *    realm: string,
 *    credentials:{
 *         secret:string
 *    }
 * }}
 */
const config = () => ({
    clientId: process.env.KEYCLOCK_CLIENT_ID,
    bearerOnly: false,
    serverUrl: process.env.KEYCLOCK_SERVER_URL,
    realm: process.env.KEYCLOCK_REALM,
    credentials: {
        secret: process.env.KEYCLOCK_SECRET
    }
})

module.exports = config;