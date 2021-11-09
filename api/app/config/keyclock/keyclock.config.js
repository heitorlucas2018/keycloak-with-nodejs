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
    clientId: process.env.KEYCLOCK_CLIENT_ID, /** Nome do cliente cadastrado */
    bearerOnly: false, /** se este for true não deve utilizar o secret */
    verifyTokenAudience: false, /** Verifique as declarações de público do token. */
    serverUrl: process.env.KEYCLOCK_SERVER_URL, /** Host do server para autenticação */
    realm: process.env.KEYCLOCK_REALM,
    credentials: {
        secret: process.env.KEYCLOCK_SECRET
    }
})

module.exports = config;