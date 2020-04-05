export const isValidEmail = (email) => {
  const regularExpression = /^.+@.+\..+$/;
  return regularExpression.test(email);
};

export default {
  isValidEmail,
};
