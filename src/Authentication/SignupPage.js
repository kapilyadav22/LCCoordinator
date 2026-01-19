import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HOMEROUTE,
  navigationTimer,
  REGISTERURL,
} from "../constants/urlConstants";
import useCustomAlert from "../customHooks/customAlertHook";
import { SignUpFormData } from "../dataFields/formData";
import CustomAlert1 from "../layout/CustomAlert1";
import CustomAvatar from "../layout/CustomAvatar";
import CustomButton from "../layout/CustomButton";
import CustomTextField from "../layout/CustomTextField";
import { CustomTitle } from "../layout/CustomTitle";
import { validateFields } from "../utils/checkValidations";
import { postData } from "../utils/httpRequestUtils";

const SignupPage = () => {
  const [formData, setFormData] = useState(SignUpFormData);
  const [error, setError] = useState("");
  const { alert, showAlert } = useCustomAlert();
  const navigate = useNavigate();

  const handleSignUpDetails = async (data) => {
    const res = await postData(REGISTERURL, data);
    if (res.status === "success") {
      showAlert(
        "success",
        "SignUp Successfully, Please Verify the Email using Verification Link"
      );
      setTimeout(() => {
        navigate(HOMEROUTE);
        setFormData(SignUpFormData);
        setError("");
      }, navigationTimer);
    } else {
      showAlert("error", res.error);
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

    const error = validateFields(
      "signup",
      formData.email,
      formData.password,
      formData.name
    );
    if (error) {
      setError(error);
      return;
    }
    handleSignUpDetails(formData);
  };

  return (
    <div className="container mx-auto max-w-xs mt-16 flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <CustomAvatar />
        <CustomTitle
          title=" Sign Up"
          variant="h5"
          fontWeight="regular"
          fontSize="1rem"
          marginTop="0"
          marginBottom="0"
          color={"text-title-main"}
        />
        <form onSubmit={handleSubmit} noValidate className="w-full mt-2">
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          <CustomTextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <CustomTextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <CustomTextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <CustomButton> SignUp</CustomButton>
          <div className="flex justify-center items-center space-x-2">
            <CustomTitle
              title="Already have an account?"
              variant="body1"
              fontWeight="regular"
              fontSize="1rem"
              marginTop="0"
              marginBottom="0"
              color={"text-text-primary"}
            />
            <Link to="/login" style={{ textDecoration: "none" }}>
              <CustomTitle
                title="Log In"
                variant="body1"
                fontWeight="regular"
                fontSize="1rem"
                marginTop="0"
                marginBottom="0"
                color={"text-title-main"}
              />
            </Link>
            <CustomAlert1 alert={alert} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
