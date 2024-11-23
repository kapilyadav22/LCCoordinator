import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import googleImage from '../assets/icons/google.png';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


const SignIn = () => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('Google user signed in:', user);
            // updateLogin();
            // updateUserName(user.displayName);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Google Sign-In Error:', errorCode, errorMessage);
        }
    };

    return (
        <Box
            onClick={signInWithGoogle}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' , justifyContent:'center'}}
        >
            <Avatar
                alt="Google"
                src={googleImage}
                sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Link>
            <Typography variant="body1">Sign In with Google</Typography>
           </Link>
        </Box>
    );
};


export default SignIn;
