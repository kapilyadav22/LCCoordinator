import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import googleImage from '../assets/icons/google.png';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useMyContext } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { HOMEROUTE, navigationTimer } from '../constants/urlConstants';
import useCustomAlert from '../customHooks/customAlertHook';


const SignIn = () => {
    const { updateUserName, updateLogin } = useMyContext();
    const { alert, showAlert } = useCustomAlert();

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            showAlert("success",`Hi :, ${user}`);
            updateLogin(true);
            updateUserName(user.displayName);

            setTimeout(() => {
                navigate(HOMEROUTE);
              }, navigationTimer);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            showAlert("error",`Google Sign-In Error:', ${errorMessage}`);
        }
    };

    return (
        <Box
            onClick={()=>signInWithGoogle()}
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
