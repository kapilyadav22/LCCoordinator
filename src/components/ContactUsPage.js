import { useState } from "react";
import { SENDEMAIL } from "../constants/urlConstants";
import { contactFormData } from "../dataFields/formData";
import CustomButton from "../layout/CustomButton";
import CustomTextField from "../layout/CustomTextField";
import { CustomTitle } from "../layout/CustomTitle";
import { postData } from "../utils/httpRequestUtils";

const ContactUsPage = () => {
  const [formData, setFormData] = useState(contactFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await postData(SENDEMAIL, formData);
    if (res.success) {
      console.log("success", formData);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-8">
        <CustomTitle title={"Contact Us"} />
        <p className="text-text-primary mt-2">
          We would love to hear from you! Please Help us grow and share your
          Valuable FeedBack and Suggestions.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center space-y-4"
      >
        <div className="w-full max-w-lg">
          <CustomTextField
            required
            fullWidth
            name="name"
            label="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full max-w-lg">
          <CustomTextField
            required
            fullWidth
            name="email"
            label="Email Address"
            value={formData.email}
            type="email"
            onChange={handleChange}
          />
        </div>
        <div className="w-full max-w-lg">
          <CustomTextField
            required
            fullWidth
            name="message"
            label="Message"
            value={formData.message}
            multiline
            rows={4}
            onChange={handleChange}
          />
        </div>
        <div className="w-full max-w-lg mt-4">
          <CustomButton type="submit">Send Message</CustomButton>
        </div>
      </form>
      <div className="mt-8 text-center text-text-primary">
        <h6 className="text-lg font-medium mb-2">Contact Information</h6>
        <p>Email: singhkapil347@gmail.com</p>
      </div>
    </div>
  );
};

export default ContactUsPage;
