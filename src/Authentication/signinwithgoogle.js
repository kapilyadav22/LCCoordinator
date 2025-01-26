import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import googleImage from '../assets/icons/google.png';
import { HOMEROUTE, navigationTimer } from '../constants/urlConstants';
import { useMyContext } from '../Context/ContextProvider';
import useCustomAlert from '../customHooks/customAlertHook';
import { CustomTitle } from '../layout/CustomTitle';
import { auth, googleProvider } from './firebase';


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

            <CustomTitle
              title="Sign In with Google"
              variant="body1"
              textTransform="none"
              fontWeight="regular"
              fontSize="1rem"
              marginTop="0"
              marginBottom="0"
              xs={6}
              md={4}
              color={'text.primary'}
            />
           </Link>
        </Box>
    );
};


export default SignIn;
