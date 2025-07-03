import { defineStorage } from '@aws-amplify/backend';

// User-isolated storage - each user only sees their own files
export const storage = defineStorage({
  name: 'userIsolatedBucket',
  isDefault: true,
  access: (allow) => ({
    // Each user gets their own isolated space using their unique sub ID
    'users/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]
  })
});



