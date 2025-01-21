const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Meeting-Room-Booking-System',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

