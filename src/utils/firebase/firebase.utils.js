import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { 
    getFirestore, 
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCXVfDI6xYBtkm65WX7xHpmkCbF6Ex6xew",
  authDomain: "e-commmerce-43a25.firebaseapp.com",
  projectId: "e-commmerce-43a25",
  storageBucket: "e-commmerce-43a25.appspot.com",
  messagingSenderId: "922881711567",
  appId: "1:922881711567:web:d0a75b579759dac43646ba",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
 
export const db=getFirestore();  

export const createUserDocumnetFromAuth= async (userAuth) =>{
    const userDocRef= doc(db,"users",userAuth.uid);  
    console.log(userDocRef); 
    const userSnapshot=await  getDoc(userDocRef); 
    console.log(userSnapshot.exists());

 
if(!userSnapshot.exists()){
  const {displayName,email}=userAuth; 
  const createAt= new Date(); 

  try{
    await setDoc(userDocRef,{
      displayName, 
      email, 
      createAt, 
     
    });
  } catch(err){ 
     console.log("error creatin the user",err)

  } 
}  
return userDocRef;
};
