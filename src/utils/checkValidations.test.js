import { validateFields, validateEmail, validateOTP } from './checkValidations';

describe('validateFields', () => {
  // --- Login validation ---
  describe('login type', () => {
    test('returns null for valid login credentials', () => {
      expect(validateFields('login', 'user@example.com', 'password123')).toBeNull();
    });

    test('returns error when email is empty', () => {
      expect(validateFields('login', '', 'password123')).toBe('Please fill in all fields');
    });

    test('returns error when password is empty', () => {
      expect(validateFields('login', 'user@example.com', '')).toBe('Please fill in all fields');
    });

    test('returns error when both email and password are empty', () => {
      expect(validateFields('login', '', '')).toBe('Please fill in all fields');
    });

    test('returns error for invalid email format', () => {
      expect(validateFields('login', 'invalidemail', 'password123')).toBe('Please enter a valid email address');
    });

    test('returns error for email without domain', () => {
      expect(validateFields('login', 'user@', 'password123')).toBe('Please enter a valid email address');
    });

    test('returns error for email without TLD', () => {
      expect(validateFields('login', 'user@domain', 'password123')).toBe('Please enter a valid email address');
    });

    test('returns error when password is too short', () => {
      expect(validateFields('login', 'user@example.com', '12345')).toBe('Password must be at least 6 characters');
    });

    test('accepts password with exactly 6 characters', () => {
      expect(validateFields('login', 'user@example.com', '123456')).toBeNull();
    });
  });

  // --- Signup validation ---
  describe('signup type', () => {
    test('returns null for valid signup data', () => {
      expect(validateFields('signup', 'user@example.com', 'password123', 'John')).toBeNull();
    });

    test('returns error when name is empty', () => {
      expect(validateFields('signup', 'user@example.com', 'password123', '')).toBe('Please fill in all fields');
    });

    test('returns error when name is missing (default param)', () => {
      expect(validateFields('signup', 'user@example.com', 'password123')).toBe('Please fill in all fields');
    });

    test('returns error when name is only 1 character', () => {
      expect(validateFields('signup', 'user@example.com', 'password123', 'A')).toBe('Name must be at least 2 characters');
    });

    test('returns error when name is only whitespace', () => {
      expect(validateFields('signup', 'user@example.com', 'password123', '  ')).toBe('Name must be at least 2 characters');
    });

    test('accepts name with exactly 2 characters', () => {
      expect(validateFields('signup', 'user@example.com', 'password123', 'AB')).toBeNull();
    });

    test('validates email even for signup', () => {
      expect(validateFields('signup', 'bad-email', 'password123', 'John')).toBe('Please enter a valid email address');
    });

    test('validates password even for signup', () => {
      expect(validateFields('signup', 'user@example.com', '123', 'John')).toBe('Password must be at least 6 characters');
    });
  });
});

describe('validateEmail', () => {
  test('returns null for a valid email', () => {
    expect(validateEmail('user@example.com')).toBeNull();
  });

  test('returns error for email without @', () => {
    expect(validateEmail('userexample.com')).toBe('Please enter a valid email address');
  });

  test('returns error for email without domain part', () => {
    expect(validateEmail('user@')).toBe('Please enter a valid email address');
  });

  test('returns error for empty email', () => {
    expect(validateEmail('')).toBe('Please enter a valid email address');
  });

  test('accepts email with subdomain', () => {
    expect(validateEmail('user@mail.example.com')).toBeNull();
  });
});

describe('validateOTP', () => {
  test('returns null for a valid 6-digit OTP', () => {
    expect(validateOTP('123456')).toBeNull();
  });

  test('returns error for OTP shorter than 6 digits', () => {
    expect(validateOTP('12345')).toBe('Please enter a valid 6-digit OTP');
  });

  test('returns error for OTP longer than 6 digits', () => {
    expect(validateOTP('1234567')).toBe('Please enter a valid 6-digit OTP');
  });

  test('returns error for OTP containing letters', () => {
    expect(validateOTP('12345a')).toBe('Please enter a valid 6-digit OTP');
  });

  test('returns error for OTP with special characters', () => {
    expect(validateOTP('12345!')).toBe('Please enter a valid 6-digit OTP');
  });

  test('returns error for OTP with spaces', () => {
    expect(validateOTP('123 56')).toBe('Please enter a valid 6-digit OTP');
  });

  test('accepts OTP starting with 0', () => {
    expect(validateOTP('012345')).toBeNull();
  });
});
