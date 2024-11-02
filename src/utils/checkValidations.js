const validateFields = (type, email, password, name = '') => {
    if (!email || !password || (type === 'signup' && !name)) {
        return 'Please fill in all fields';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Please enter a valid email address';
    }
    return null;
};

export { validateFields };
