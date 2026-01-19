import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LOGIN, navigationTimer, VERIFYEMAIL } from "../constants/urlConstants";
import useCustomAlert from "../customHooks/customAlertHook";
import CustomAlert1 from "../layout/CustomAlert1";
import CustomAvatar from "../layout/CustomAvatar";
import { getData } from "../utils/httpRequestUtils";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { alert, showAlert } = useCustomAlert();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token) {
      setVerificationStatus("Invalid verification link");
      showAlert("error", "Invalid verification link");
      return;
    }

    try {
      const response = await getData(
        VERIFYEMAIL + `?email=${email}&token=${token}`
      );

      if (response.status === "success") {
        setVerificationStatus("Email verified successfully!");
        showAlert("success", "Email verified successfully");
        setTimeout(() => {
          navigate(LOGIN);
        }, navigationTimer);
      } else {
        setVerificationStatus("Email verification failed");
        showAlert("error", response);
      }
    } catch (error) {
      setVerificationStatus("Email verification failed");
      showAlert("error", "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto max-w-xs mt-16 flex flex-col items-center">
      <CustomAlert1 alert={alert} />
      <div className="w-full flex flex-col items-center">
        <CustomAvatar />
        <h1 className="text-2xl font-normal mt-2 text-text-primary text-center">
          Email Verification
        </h1>
        <p className="mt-2 text-center text-text-primary">
          {verificationStatus}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
