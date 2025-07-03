import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';
import './App.css';

import config from '../amplify_outputs.json';
import { Amplify } from 'aws-amplify';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
Amplify.configure(config);

const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

function UserContent({ signOut, user }) {
  const [displayName, setDisplayName] = useState(user?.username || '');

  useEffect(() => {
    const getUserAttributes = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setDisplayName(attributes.given_name || attributes.email || user?.username || 'User');
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getUserAttributes();
  }, [user]);

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src="/logo.svg" alt="MyStorage" className="logo-image" />
        </div>
        <div className="user-section">
          <div className="username">{`Welcome ${displayName}`}</div>
          <Button onClick={signOut}>Sign out</Button>
        </div>
      </div>
      <StorageBrowser />
    </>
  );
}

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => <UserContent signOut={signOut} user={user} />}
    </Authenticator>
  );
}

export default App;
