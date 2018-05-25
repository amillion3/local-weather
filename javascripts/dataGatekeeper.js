let userZipcode = '';

const setZipcode = input => { userZipcode = input; };
const getZipcode = () => userZipcode;

module.exports = {
  setZipcode,
  getZipcode,
};
