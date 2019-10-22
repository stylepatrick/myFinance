import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://192.168.0.254:8010/auth/',
  realm: 'myFinance',
  clientId: 'myfinance',
  "credentials": {
    "secret": "85434a46-21be-4374-96c3-ce9afdd12af0"
  }
};

export const environment = {
  production: true,
  keycloak: keycloakConfig,

};
