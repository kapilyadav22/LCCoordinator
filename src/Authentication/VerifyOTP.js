import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN,
  navigationTimer,
  RESETPASSWORD,
  VERIFYOTP,
} from "../constants/urlConstants";
import useCustomAlert from "../customHooks/customAlertHook";
import CustomAlert1 from "../layout/CustomAlert1";
import CustomAvatar from "../layout/CustomAvatar";
import CustomTextField from "../layout/CustomTextField";
import { validateOTP } from "../utils/checkValidations";
import { postData } from "../utils/httpRequestUtils";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { alert, showAlert } = useCustomAlert();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(5);
  const [isResendOTP, setIsResendOTP] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const ResetPassword = async (email, password) => {
    try {
      const response = await postData(RESETPASSWORD, { email, password });
      if (response.status === "success") {
        showAlert("success", "Password reset successfully");
        setTimeout(() => {
          navigate(LOGIN);
        }, navigationTimer);
      } else {
        showAlert("error", "Something went wrong");
      }
    } catch (error) {
      showAlert("error", "Something went wrong");
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      ResetPassword(email, password);
    } else {
      showAlert("error", "Password and Confirm Password do not match");
    }
  };

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    if (validateOTP(otp)) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await postData(VERIFYOTP, { email, otp });

      if (response.status === "success") {
        showAlert("success", "OTP verified successfully");
      } else {
        showAlert("error", "Invalid OTP");
      }
    } catch (error) {
      showAlert("error", "Something went wrong");
    }
  };

  const handleResendOTP = () => {
    setIsActive(isActive);
    setIsResendOTP(true);
    setTimer(60);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="container mx-auto max-w-xs mt-16 flex flex-col items-center">
      <CustomAlert1 alert={alert} />
      <div className="w-full flex flex-col items-center">
        <CustomAvatar />
        <h1 className="text-2xl font-normal mt-2 text-text-primary">
          Verify OTP
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-6 text-center">
          Please enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit} noValidate className="w-full mt-2">
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {timer > 0 && (
            <p className="text-sm text-gray-500 mb-4 text-center">
              Resend OTP in {Math.floor(timer / 60)}:
              {(timer % 60).toString().padStart(2, "0")}
            </p>
          )}

          <div className="flex items-center gap-4 w-full mb-4">
            <div className="flex-1">
              <CustomTextField
                label="Enter OTP"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                required
                inputProps={{
                  maxLength: 6,
                  pattern: "[0-9]*",
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyOTP}
              className="h-[56px] text-primary hover:bg-gray-100 dark:hover:bg-gray-800 px-4 rounded transition-colors"
            >
              Verify OTP
            </button>
          </div>

          <CustomTextField
            label="Enter New Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <CustomTextField
            label="Enter Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-title-main text-white py-2 px-4 rounded hover:bg-title-themecolor transition-colors duration-300 mt-6"
            onClick={handleSubmit}
          >
            Reset Password
          </button>

          <button
            type="button"
            disabled={timer !== 0}
            onClick={handleResendOTP}
            className={`
                w-full mt-2 h-[56px] text-center flex items-center justify-center
                ${
                  timer === 0
                    ? "text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "text-gray-400 cursor-not-allowed"
                }
                rounded transition-colors
            `}
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
