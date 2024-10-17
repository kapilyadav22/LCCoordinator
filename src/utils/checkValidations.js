const checkLoginValidations = (email, password) => {
    if (!email || !password) {
        return 'Please fill in all fields';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Please enter a valid email address';
    }
    return null; 
};

export {checkLoginValidations};