import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FORGETPASSWORD, navigationTimer } from "../constants/urlConstants";
import useCustomAlert from "../customHooks/customAlertHook";
import CustomAlert1 from "../layout/CustomAlert1";
import CustomAvatar from "../layout/CustomAvatar";
import CustomTextField from "../layout/CustomTextField";
import { CustomTitle } from "../layout/CustomTitle";
import { validateEmail } from "../utils/checkValidations";
import { getData } from "../utils/httpRequestUtils";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      showAlert("error", validationError);
      return;
    }
    setError("");

    try {
      const response = await getData(FORGETPASSWORD + "?email=" + email);

      if (typeof response === "string") {
        const errorMsg = response || "Something went wrong";
        setError(errorMsg);
        showAlert("error", errorMsg);
        return;
      }

      if (response.status === "success") {
        showAlert("success", "OTP sent successfully to your email");
        setTimeout(() => {
          navigate("/verify-otp", {
            state: {
              email: email,
            },
          });
        }, navigationTimer);
      } else {
        const errorMsg = response?.message || "Something went wrong";
        setError(errorMsg);
        showAlert("error", errorMsg);
      }
    } catch (error) {
      setError("Something went wrong");
      showAlert("error", "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto max-w-xs mt-16 flex flex-col items-center">
      <CustomAlert1 alert={alert} />
      <div className="w-full flex flex-col items-center">
        <CustomAvatar />
        <CustomTitle
          title=" Forgot Password"
          variant="h5"
          fontWeight="regular"
          fontSize="1rem"
          marginTop="0"
          marginBottom="0"
          color={"text-text-primary"}
        />
        <p className="text-sm text-gray-500 mt-1 mb-6 text-center">
          Enter your email address and we'll send you an OTP to reset your
          password
        </p>

        <form onSubmit={handleSubmit} noValidate className="w-full mt-2">
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 rounded text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {error}
            </div>
          )}

          <CustomTextField
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-title-main text-white py-2 px-4 rounded hover:bg-title-themecolor transition-colors duration-300 mt-6 mb-4"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
