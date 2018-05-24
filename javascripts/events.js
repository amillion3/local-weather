const searchWindowClicked = e => {
  if (e.target.type === 'button') {
    // now gather the input
  } else if (e.type === 'keypress') {
    // now gather the input
  }
};

const bindEvents = () => {
  $('#div-search').on('click keypress', searchWindowClicked);

};

module.exports = {
  bindEvents,
};
