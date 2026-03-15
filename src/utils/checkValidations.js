const validateFields = (type, email, password, name = '') => {
    if (!email || !password || (type === 'signup' && !name)) {
        return 'Please fill in all fields';
    }
    if (type === 'signup' && name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Please enter a valid email address';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
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