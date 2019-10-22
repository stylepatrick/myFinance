import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://192.168.0.254:8180/auth/',
  realm: 'myFinance',
  clientId: 'myfinance',
  "credentials": {
    "secret": "16155a5d-a38d-4dec-8437-47cd31d9f301"
  }
};

export const environment = {
  production: false,
  keycloak: keycloakConfig,

};
