import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { HOMEROUTE, navigationTimer } from "../constants/urlConstants";
import { useMyContext } from "../Context/ContextProvider";
import useCustomAlert from "../customHooks/customAlertHook";
import { CustomTitle } from "../layout/CustomTitle";
import { auth, googleProvider } from "./firebase";

const SignIn = () => {
  const googleImage = new URL("../assets/icons/google.png", import.meta.url)
    .href;
  const { updateUserName, updateLogin } = useMyContext();
  const { alert, showAlert } = useCustomAlert();

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      showAlert("success", `Hi :, ${user}`);
      updateLogin(true);
      updateUserName(user.displayName);

      setTimeout(() => {
        navigate(HOMEROUTE);
      }, navigationTimer);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      showAlert("error", `Google Sign-In Error:', ${errorMessage}`);
    }
  };

  return (
    <div
      onClick={() => signInWithGoogle()}
      className="flex items-center justify-center cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
    >
      <img
        alt="Google"
        src={googleImage}
        className="w-10 h-10 mr-4 rounded-full"
      />
      <div className="flex">
        <CustomTitle
          title="Sign In with Google"
          variant="body1"
          fontWeight="regular"
          fontSize="1rem"
          marginTop="0"
          marginBottom="0"
          color={"text-text-primary"}
        />
      </div>
    </div>
  );
};

export default SignIn;
