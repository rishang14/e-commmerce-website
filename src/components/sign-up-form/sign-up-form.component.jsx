import { useState } from 'react';

// import FormInput from '../form-input/form-input.component';
// import Button from '../button/button.component';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

// import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
        <h1>Sign up with your email  and password</h1>
  <form onSubmit={handleSubmit}>
      <label htmlFor="displayName">Dispaly Name</label>
      <input type="text" required value={displayName} onChange={handleChange} name='displayName'/>
      <label htmlFor="email">Email</label>
      <input type="email" required value={email} onChange={handleChange}  name='email'/>
      <label htmlFor="password">Password</label>
      <input type="password" required value={password} onChange={handleChange}  name='password'/>
      <label htmlFor="password">Confirm Password</label>
      <input type="password" required value={confirmPassword} onChange={handleChange}  name='confirmPassword'/>
      <button type='submit'>Sign Up</button>
  </form>
  </div>
);
};

export default SignUpForm;