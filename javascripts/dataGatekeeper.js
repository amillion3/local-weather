let userZipcode = '';
let apiCallType = 'weather';

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
