const validateFields = (type, email, password, name = '') => {
    if (!email || !password || (type === 'signup' && !name)) {
        return 'Please fill in all fields';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Please enter a valid email address';
    }
    return null;
};

const validateOTP = (otp)=> {
    if(otp.length !== 6 || !/^\d+$/.test(otp)) {
        return 'Please enter a valid 6-digit OTP';
    }
    return null;
}

const validateEmail = (email)=> {
    if(!/\S+@\S+\.\S+/.test(email)) {
        return 'Please enter a valid email address';
    }
    return null;
}


export { validateFields, validateEmail, validateOTP };