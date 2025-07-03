import { defineHosting } from '@aws-amplify/backend';

export const hosting = defineHosting({
  name: 'storageApp',
  customDomain: {
    domainName: 'clad-playground.devtest.aws.scania.com', // Replace with your domain
    subDomainPrefix: 's3'     // Creates storage.your-domain.com
  }
});