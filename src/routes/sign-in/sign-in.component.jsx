// import {signInWithGooglePopup,createUserDocumnetFromAuth} from "../../utils/firebase/firebase.utils";
import  SignUpForm from "../../components/sign-up-form/sign-up-form.component"; 
 
 const SignIn =()=>{
//     const logGoogleUser= async () =>{  
//         try{
//         const {user} =await  signInWithGooglePopup(); 
//          const userDocRef=  await createUserDocumnetFromAuth(user);
//     } catch(err){ 
//         alert("error resolved");
//     } 
// } 

    return(
        <div> 
            <h1>Sign In page </h1> 
            {/* <button onClick={logGoogleUser}>Sing in with Google</button>  */}
          <SignUpForm/> 
        
        
        </div>
    )
}
 
export default SignIn;