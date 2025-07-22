const generateRandomString = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const validateEmail = (value) => {
  try {

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }

    // You can add more rules here (e.g., block certain domains)
    return true;
  } catch (error) {
    return error instanceof Error ? error.message : 'Invalid email';
  }
};


const Utils = {
  generateRandomString,
  validateEmail
};

export default Utils;
