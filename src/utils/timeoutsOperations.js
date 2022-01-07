// Setter function for storage prototype
Storage.prototype.setObject = function (key, value) {
  // console.log(value);
  // console.log(JSON.stringify(value));
  this.setItem(key, JSON.stringify(value));
};

// Getter function for storage prototype
Storage.prototype.getObject = function (key) {
  var value = this.getItem(key);
  // console.log(value);
  // console.log(JSON.parse(value));
  return value && JSON.parse(value);
};

// Choose storage type local / session ()
const storage = sessionStorage;

// Add timeout ID to session storage
const addTimeoutToStorage = (timeoutID) => {
  let currentTimeouts = [];

  // console.log("-|-|-|-");
  // console.log(`TimeoutID: ${timeoutID}`);
  // console.log(`Timeouts is null ${storage.getObject("timeouts") === null}`);

  if (storage.getObject("timeouts") === null) {
    currentTimeouts.push(timeoutID);
    // console.log(`Current timeout ${currentTimeouts}`);
    storage.setObject("timeouts", currentTimeouts);
    return;
  }

  // console.log("Adding to existing timeout in sessionStorage");

  currentTimeouts = storage.getObject("timeouts");
  currentTimeouts.push(timeoutID);

  // console.log(`Current timeouts: ${currentTimeouts}`);
  // console.log(currentTimeouts);

  storage.setObject("timeouts", currentTimeouts);
};

// Clear all timeouts
const clearAllTimeouts = () => {
  const currentTimeouts = storage.getObject("timeouts");
  if (currentTimeouts !== null) {
    currentTimeouts.forEach((timeout) => {
      // console.log(`Timeout for clearing ID: ${timeout}`);
      clearTimeout(timeout);
    });
  }
  storage.clear();
};

export { addTimeoutToStorage, clearAllTimeouts };
