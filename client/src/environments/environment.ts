import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://192.168.0.254:8180/auth/',
  realm: 'MyFinance',
  clientId: 'myfinance',
  "credentials": {
    "secret": "6aa32fc1-7c14-43da-b9c3-3b2f66b7bed9"
  }
};

export const environment = {
  production: false,
  keycloak: keycloakConfig,

};
