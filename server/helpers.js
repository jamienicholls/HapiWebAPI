const getCurrentAge = (dob) => {
  const currentYear = new Date().getFullYear();
  const birthYear = new Date(dob).getFullYear();

  return currentYear - birthYear;
}

const calculateAverageAge = (contacts) => {
  const ageArray = [];
  contacts.forEach(contact => {
    ageArray.push(getCurrentAge(contact.dob));
  });
  const sumOfAges = ageArray.reduce((partialSum, a) => partialSum + a, 0);
  return (sumOfAges / ageArray.length).toFixed(2);
}

module.exports = {
  getCurrentAge,
  calculateAverageAge,
}
