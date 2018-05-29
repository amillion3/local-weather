let userZipcode = '';
// let apiCallType = 'weather';
let apiCallType = 'forecast';

const setZipcode = input => { userZipcode = input; };
const getZipcode = () => userZipcode;

const setApiCallType = input => { apiCallType = input; };
const getApiCallType = () => apiCallType;

module.exports = {
  setZipcode,
  getZipcode,
  setApiCallType,
  getApiCallType,
};
