let userZipcode = '';
let apiCallType = 'weather';
let userCity = '';

const setZipcode = input => { userZipcode = input; };
const getZipcode = () => userZipcode;

const setApiCallType = input => { apiCallType = input; };
const getApiCallType = () => apiCallType;

const setCity = input => { userCity = input; };
const getCity = () => userCity;

module.exports = {
  setZipcode,
  getZipcode,
  setApiCallType,
  getApiCallType,
  setCity,
  getCity,
};
