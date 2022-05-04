const fetch = require('node-fetch');
const config = require('./config');

const cleanPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/\D/g, '');
}

const lookupPhoneNumber = async (phoneNumber) => {
  const simplePhoneNumber = cleanPhoneNumber(phoneNumber);
  const response = await fetch(`${config.messangerApiUrl}/lookup?phone=${simplePhoneNumber}`);
  const body = await response.json();
  return body;
}

module.exports = {
  lookupPhoneNumber,
}