import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";

import { auth } from "../firebase";


const provider = new GoogleAuthProvider();


// Email Login

export const loginWithEmail = async (
  email,
  password
) => {

  const result =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );


  return result.user;

};



// Google Login

export const loginWithGoogle = async()=>{


const result =
await signInWithPopup(
auth,
provider
);


return result.user;


};



// Reset Password

export const resetPassword = (email)=>{

return sendPasswordResetEmail(
auth,
email
);

};



// Logout

export const logoutUser = ()=>{

return signOut(auth);

};