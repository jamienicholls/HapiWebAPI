const repository = require('./repository');

const getUsers = async () => {
  return repository.getUsers();
}


module.exports = {
  getUsers,
}