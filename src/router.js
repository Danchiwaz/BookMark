const { respondWith404NotFound } = require('./httpHelpers');
const { routerHandleResult } = require('./routerHandleResult');

const routers = [
  require('./contacts').contactsRouter,
  require('./contactDetails').contactDetailsRouter,

  require('./ping').pingRouter,
];

module.exports = function(request, response) {
  if (routers[0].handle(request, response) !== routerHandleResult.HANDLED) {
    respondWith404NotFound(response);
  }
};
