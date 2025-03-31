import constants from "./constants";

let umami;
let userId = null;
let user = "LOGGED_OUT";

export const EventCategory = {
  LAND_OWNERSHIP: "Land Ownership",
  LEFT_PANE: "Left Pane",
  LOGIN: "Login",
  MAIN_MENU: "Main Menu",
  MAP_MENU: "Map Menu",
  PASSWORD_RESET: "Password Reset",
  SEARCH: "Search",
  USER_MENU: "User Menu",
};

export const init = () => {
  if (isEnabled()) {
    console.log("Initialise Umami analytics");
    localStorage.removeItem("umami.disabled");
    umami = window.umami;
  } else {
    console.log("Umami analytics are disabled");
    localStorage.setItem("umami.disabled", 1);
  }
};

/** Set (anonymized) user in Umami session data and as a property in all events */
export const setUser = async (id, username) => {
  if (isEnabled()) {
    console.log(`[ANALYTICS] setUser`);
    if (userId !== id) {
      // Only need to re-compute hash if the user ID has changed
      userId = id;
      user = await hashUsername(id, username);
    }
    umami?.identify({ user });
  } else if (constants.DEV_MODE) {
    console.log(`[ANALYTICS DISABLED IN DEV] setUser`);
  }
};

/** Hash a username, using user ID as the salt, to anonymize it */
const hashUsername = async (id, username) => {
  const saltedInput = id + username;

  // Compute SHA-256 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(saltedInput);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert buffer to hex string and return first 10 characters
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .substring(0, 10)
    .concat(" (hash)");
};

/** Track an event with Umami */
export const event = (category, action, data) => {
  const event = `${category} - ${action}`;
  if (isEnabled()) {
    console.log(`[ANALYTICS] ${event}`);
    umami?.track((props) => ({
      ...props,
      name: event,
      data: {
        user,
        ...data,
      },
    }));
  } else if (constants.DEV_MODE) {
    console.log(`[ANALYTICS DISABLED IN DEV] ${event}`);
  }
};

/** Don't send analytics if in dev mode */
export const isEnabled = () => {
  return true;
  // eventually we will disable in dev mode, but enable for now, whilst we create the new feature
  return !constants.DEV_MODE;
};
