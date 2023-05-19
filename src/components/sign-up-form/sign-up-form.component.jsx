import { useState } from "react";
// import { createAuthUserWithEmailAndPassword,createUserDocumnetFromAuth} from "../../utils/firebase/firebase.utils";  
import firebaseApp from "../../utils/firebase/firebase.utils";
import 'firebase/auth';

const defaultFormFeild = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
 

const SignUpForm = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeild);
  const { displayName, email, password, confirmPassword } = formFeilds;
  
  const resetFormFields=()=>{
    setFormFeilds(defaultFormFeild);
  }
  const handleSubmit = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Logged in successfully
        const user = userCredential.user;
        // await createUserDocumentFromAuth(user, displayName)
        resetFormFields();
      })
      .catch((error) => {
        // Handle login errors
        console.log(error.message);
      });
  };
  const handleChange = (event) => {
    const { name ,value} = event.target; 
     setFormFeilds({...formFeilds,[name]:value})
  };
console.log(formFeilds)
  return (
    <div>
      <h1>Sign up with your eamil and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
  }; 

export default SignUpForm;
