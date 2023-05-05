const { fakeDatabase } = require('../database/fakeDatabase');
const { urlPathOf, respondWith200OkJson } = require('../httpHelpers');
const { routerHandleResult } = require('../routerHandleResult');
const url = require('url');

function handle(request, response) {
  if (urlPathOf(request) !== '/contacts') {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }

  if (request.method == 'GET') {
    // parse the url
    const parsedUrl = url.parse(request.url, true);
    console.log(parsedUrl.params);
    const { name, limit } = parsedUrl.query;
    // const {query, limit} = request.query;
    let contacts = fakeDatabase.selectAllFromContacts();

    if (name) {
      const queryLowerCase = name.toLowerCase();
      contacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(queryLowerCase),
      );
    }
    // sort contact by name
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    // limit the contacts
    if (limit && Number.isInteger(Number(limit)) && limit > 0) {
      contacts = contacts.slice(0, limit);
    }

    respondWith200OkJson(response, contacts);
    return routerHandleResult.HANDLED;
  }
}

module.exports = {
  handle,
};



// the dark mode and the table 