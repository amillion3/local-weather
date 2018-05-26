let userZipcode = '';
let key = '';

const setZipcode = input => { userZipcode = input; };
const getZipcode = () => userZipcode;

const setKey = input => { key = input; };
const getKey = () => key;

module.exports = {
  setZipcode,
  getZipcode,
  setKey,
  getKey,
};
