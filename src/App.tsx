import { authorizationService } from 'authorization/services/AuthorizationService';
import React, { useState } from 'react';
import { ComponentA } from './ComponentA';
import { ComponentB } from './ComponentB';


export default () => {
  // Handle input email
  const [email, setEmail] = useState('');
  // Handle input password
  const [password, setPassword] = useState('');


  const loginRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authorizationService.requestLogin({ email, password }).then((response) => {
      console.log('Response: ', response);
    });
  };

  return (
    <section className='app'>

      <form onSubmit={loginRequest} className='block'>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type='submit'>Login Request</button>
      </form>

      <div className='component-list'>
        <div className='component-list__item'>
          <ComponentA />
        </div>

        <div className='component-list__item'>
          <ComponentB />
        </div>
      </div>
    </section>
  );
};
