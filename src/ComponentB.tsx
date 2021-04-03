import React from 'react';
import { observer } from 'mobx-react-lite';
import { authorizationService } from 'authorization/services/AuthorizationService';


export const ComponentB: React.FC = observer(() => {
  const logout = () => {
    // clientStore.clear();
    authorizationService.clear();
  };

  return (
    <div className='block'>
      Component: B <br />
      isAuthed: {String(authorizationService.isAuthed)} <br />
      <button type='button' onClick={logout}>Logout</button>
    </div>
  );
});
