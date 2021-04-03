import React from 'react';
import { observer } from 'mobx-react-lite';
import { fetchProfile } from 'authorization/requests/fetchProfile';


export const ComponentA: React.FC = observer(() => {
  const handleFetchProfile = () => {
    fetchProfile().then((response) => {
      console.log('Profile response: ', response);
    });
  };

  return (
    <div className='block'>
      Component: A <br />
      Get profile <br />
      <button type='button' onClick={handleFetchProfile}>
        Submit request
      </button>
    </div>
  );
});
