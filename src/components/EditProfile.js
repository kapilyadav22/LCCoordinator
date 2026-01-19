import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EDITPROFILE, PROFILE } from "../constants/urlConstants";
import CustomButton from "../layout/CustomButton";
import CustomTextField from "../layout/CustomTextField";
import { postData } from "../utils/httpRequestUtils";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    userName: "",
    codechef: "",
    codeforces: "",
    leetcode: "",
    gfg: "",
    github: "",
    linkedin: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await postData(EDITPROFILE, formData);
    if (res.success) {
      console.log("success", formData);
      navigate(PROFILE);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-4 px-4">
      <div className="mt-1">
        <h5 className="text-xl font-medium text-center mb-6 text-text-primary">
          Edit Profile
        </h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomTextField
            label="UserName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <CustomTextField
            label="CodeChef Handle"
            name="codechef"
            value={formData.codechef}
            onChange={handleChange}
          />
          <CustomTextField
            label="Codeforces Handle"
            name="codeforces"
            value={formData.codeforces}
            onChange={handleChange}
          />
          <CustomTextField
            label="LeetCode Handle"
            name="leetcode"
            value={formData.leetcode}
            onChange={handleChange}
          />
          <CustomTextField
            label="GFG Handle"
            name="gfg"
            value={formData.gfg}
            onChange={handleChange}
          />
          <CustomTextField
            label="GitHub Handle"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
          <CustomTextField
            label="LinkedIn Handle"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />

          <div className="mt-6">
            <CustomButton type="submit" fullWidth>
              Submit
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
