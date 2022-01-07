// Setter function for storage prototype
Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

// Getter function for storage prototype
Storage.prototype.getObject = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

// Choose storage type local / session ()
const storage = sessionStorage;

// Add timeout ID to session storage
const addTimeoutToStorage = (timeoutID) => {
  let currentTimeouts = [];

  if (storage.getObject("timeouts") === null) {
    currentTimeouts.push(timeoutID);
    storage.setObject("timeouts", currentTimeouts);
    return;
  }

  currentTimeouts = storage.getObject("timeouts");
  currentTimeouts.push(timeoutID);

  storage.setObject("timeouts", currentTimeouts);
};

// Clear all timeouts
const clearAllTimeouts = () => {
  const currentTimeouts = storage.getObject("timeouts");
  if (currentTimeouts !== null) {
    currentTimeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
  }
  storage.clear();
};

export { addTimeoutToStorage, clearAllTimeouts };
