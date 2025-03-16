import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Components/Hooks/useAxiosPublic";
import auth from '../../src/Firebase/firebase.init';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();


    // Current User State Observer.
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            const userInfo = { email: currentUser.email };
            // setLoading(false);
            if (currentUser?.email) {
                axiosPublic.post('/jwt', userInfo, { withCredentials: true })
                    .then(res => {
                        // console.log(res.data);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
            else {
                // Call Logout Api.
                axiosPublic.post("/logout", userInfo, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        setLoading(false);
                    })
            }
        });

        return () => {
            return unSubscribe();
        }
    }, []);


    // Create A New User.
    const CreateUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };


    // Update User Information.
    const UpdateUserInfo = (userInfo) => {
        const { name, image = null } = userInfo;
        return updateProfile(auth.currentUser, { displayName: name, photoURL: image });
    };


    // Login/SignUP User.
    const LoginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };


    // Login With Google.
    const GoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    // Logout Current User
    const LogoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };


    // Context Value.
    const authInfo = {
        user,
        loading,
        CreateUser,
        UpdateUserInfo,
        LoginUser,
        GoogleLogin,
        LogoutUser
    }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;