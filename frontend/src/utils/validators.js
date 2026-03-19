export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
  if (!/[0-9]/.test(password)) errors.push("One number");
  return errors;
};

export const validateName = (name) =>
  name.trim().length >= 2;

export const validatePhone = (phone) =>
  /^\+?[\d\s\-()]{10,}$/.test(phone);
