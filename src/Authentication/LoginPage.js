import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HOMEROUTE,
  LOGINURL,
  navigationTimer,
} from "../constants/urlConstants";
import { useMyContext } from "../Context/ContextProvider";
import useCustomAlert from "../customHooks/customAlertHook";
import { LoginFormData } from "../dataFields/formData";
import CustomAlert1 from "../layout/CustomAlert1";
import CustomAvatar from "../layout/CustomAvatar";
import CustomTextField from "../layout/CustomTextField";
import { CustomTitle } from "../layout/CustomTitle";
import { validateFields } from "../utils/checkValidations";
import { postData } from "../utils/httpRequestUtils";
import SignIn from "./Signinwithgoogle";

const LoginPage = () => {
  const [formData, setFormData] = useState(LoginFormData);
  const [error, setError] = useState("");

  const { updateUserName, updateLogin, updateAdminStatus } = useMyContext();
  const { alert, showAlert } = useCustomAlert();

  const navigate = useNavigate();

  const handleLoginDetails = async (data) => {
    const res = await postData(LOGINURL, data);
    const name = res?.data?.name != null ? res?.data?.name : "Alien";
    const role = res?.data?.role != null ? res.data.role : "User";

    if (res.status === "success") {
      showAlert("success", "Login Successfull");
      updateAdminStatus(role);
      updateUserName(name);
      updateLogin(true);

      setTimeout(() => {
        setFormData(LoginFormData);
        setError("");
        navigate(HOMEROUTE);
      }, navigationTimer);
    } else {
      showAlert("error", res);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const error = validateFields("login", formData.email, formData.password);
    if (error) {
      setError(error);
      return;
    }
    handleLoginDetails(formData);
  };

  return (
    <div className="container mx-auto max-w-xs mt-16 flex flex-col items-center">
      <CustomAlert1 alert={alert} />

      <div className="w-full flex flex-col items-center">
        <CustomAvatar />
        <CustomTitle
          title="Log In"
          variant="h5"
          fontWeight="regular"
          fontSize="1rem"
          marginTop="0"
          marginBottom="0"
          color="text-title-main"
        />

        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full mt-6 space-y-4"
        >
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 rounded text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {error}
            </div>
          )}

          <CustomTextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />

          <CustomTextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />

          <button
            type="submit"
            className="w-full bg-title-main text-white py-2.5 px-4 rounded-lg hover:bg-title-themecolor transition-all duration-300 font-medium shadow-sm hover:shadow-md mt-6"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 w-full flex justify-center">
          <Link to="/forgetpassword" style={{ textDecoration: "none" }}>
            <span className="text-text-secondary hover:text-title-main transition-colors text-sm">
              Forgot Password?
            </span>
          </Link>
        </div>
      </div>

      <div className="w-full border-t border-gray-200 dark:border-gray-700 my-6"></div>

      <div className="flex items-center justify-center gap-1 text-sm">
        <span className="text-text-primary">New User?</span>
        <Link
          to="/signup"
          className="text-title-main hover:text-title-themecolor font-medium hover:underline"
        >
          Sign Up
        </Link>
      </div>

      <div className="my-4 text-text-secondary text-sm">OR</div>

      <SignIn />
    </div>
  );
};

export default LoginPage;
