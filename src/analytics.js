import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.MIXPANEL_TOKEN, {
  debug: true,
  persistence: "localStorage",
});

let userId = null;
let user = null;

export const EventCategory = {
  LAND_OWNERSHIP: "LandOwnership",
  LEFT_PANE: "LeftPane",
  LOGIN: "Login",
  MAIN_MENU: "MainMenu",
  MAP_MENU: "MapMenu",
  PASSWORD_RESET: "PasswordReset",
  SEARCH: "Search",
  USER_MENU: "UserMenu",
};

export const EventAction = {
  // Generic
  OPEN: "Open",
  // LandOwnership
  TOGGLE_PROPERTY_DISPLAY: "TogglePropertyDisplay",
  HIGHLIGHT_PROPERTIES: "HighlightProperties",
  // LeftPane
  OPEN_DRAWING_TOOLS: "OpenDrawingTools",
  OPEN_LAND_DATA: "OpenLandData",
  OPEN_LAND_INFORMATION: "OpenLandInformation",
  OPEN_OWNERSHIP_SEARCH: "OpenOwnershipSearch",
};

/** Set (anonymized) user in the Mixpanel event data */
export const setUser = async (id, username) => {
  console.log(`[ANALYTICS] setUser`);
  if (userId !== id) {
    // Only need to re-compute hash if the user ID has changed
    userId = id;
    user = await getUserHash(id, username);
  }
  mixpanel.identify(user);
};

/** Reset the user in the Mixpanel event data e.g. when user logs out */
export const resetUser = () => {
  console.log(`[ANALYTICS] resetUser`);
  mixpanel.reset();
  userId = null;
  user = "LOGGED_OUT";
};

/**
 * Convert a userId to a hashed value, using their username as a salt, to anonymize it for
 * analytics. This must match with the back-end's implementation, so analytics can be correlated.
 */
const getUserHash = async (id, username) => {
  const saltedInput = `${username}${id}`;

  // Compute SHA-256 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(saltedInput);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert buffer to hex string and return first 10 characters
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .substring(0, 10);
};

export const trackEvent = (category, action, data) => {
  const event = `${category}_${action}`;
  console.log(`[ANALYTICS] ${event}`);
  mixpanel.track(event, data);
};
