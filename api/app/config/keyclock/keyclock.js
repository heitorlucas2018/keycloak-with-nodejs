var Keycloak = require('keycloak-connect');
var keycloakConfig = require('./keyclock.config')()

class KeycloakImpl {
    static _keycloak;
    init(memoryStore) {
        if (KeycloakImpl._keycloak) {
            console.warn("Trying to init Keycloak again!");
            return KeycloakImpl._keycloak;
        } else {
            if(!!process.env.DEBUG) {
                console.info("Initializing Keycloak...", keycloakConfig);
            }

            KeycloakImpl._keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
            return KeycloakImpl._keycloak;
        }
    }

    get() {
        if (!KeycloakImpl._keycloak) {
            console.error('Keycloak has not been initialized. Please called init first.');
        }
        console.info("Get Keycloak...");
        return KeycloakImpl._keycloak;
    }
}

module.exports = KeycloakImpl