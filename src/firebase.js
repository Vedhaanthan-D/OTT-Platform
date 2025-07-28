import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth/cordova";
import { getAuth } from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBdoHLse2-4clyFxlRVlMHQPMB5HrSA9pc",
  authDomain: "netflix-clone-498b7.firebaseapp.com",
  projectId: "netflix-clone-498b7",
  storageBucket: "netflix-clone-498b7.firebasestorage.app",
  messagingSenderId: "633599004459",
  appId: "1:633599004459:web:7eb31aa87acfecec767f6e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(name,email,password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user;
        await addDoc(collection(db ,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email ,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout =() => {
    signOut(auth)
}

export {auth,db,login,signup,logout}
