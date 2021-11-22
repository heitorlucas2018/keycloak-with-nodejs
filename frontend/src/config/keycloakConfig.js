
import Keycloak from 'keycloak-js'

const keycloakConfig = {
  realm: "reactApp",
  url: "http://localhost:8080/auth/",
  clientId: "react-client-app"
}

//login-required | check-sso
export const keycloakProviderInitConfig = {
  onLoad: "check-sso"
};

export default Keycloak(keycloakConfig);