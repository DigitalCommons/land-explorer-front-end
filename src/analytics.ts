import mixpanel from "mixpanel-browser";
import constants from "@/constants";

export function initializeMixpanel(): void {
  if (!constants.MIXPANEL_TOKEN || !constants.MIXPANEL_PEPPER) {
    console.warn(
      "No Mixpanel token or pepper provided, analytics will be disabled. Set VITE_MIXPANEL_TOKEN and VITE_MIXPANEL_PEPPER in your .env file to enable analytics.",
    );
    return;
  }

  console.log("Initializing Mixpanel analytics");

  mixpanel.init(constants.MIXPANEL_TOKEN, {
    debug: true,
    persistence: "localStorage",
  });
}

/** Set (anonymized) user in the Mixpanel event data */
export const setAnalyticsUser = async (userId: string, username: string) => {
  console.log(`[ANALYTICS] setUser`);
  const user = await getUserHash(userId, username);
  mixpanel.identify(user);
};

/** Reset the user in the Mixpanel event data e.g. when user logs out */
export const resetAnalyticsUser = () => {
  console.log(`[ANALYTICS] resetUser`);
  mixpanel.reset();
};

/**
 * Convert a userId to a hashed value, using their username as a salt, to anonymize it for
 * analytics. This must match with the back-end's implementation, so analytics can be correlated.
 */
const getUserHash = async (userId: string, username: string) => {
  const saltAndPepperedInput = `${userId}${username}${constants.MIXPANEL_PEPPER}`;

  // Compute SHA-256 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(saltAndPepperedInput);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert buffer to hex string and return first 10 characters
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .substring(0, 10);
};

export const trackEvent = <T extends Record<string, unknown>>(
  action: string,
  data: T,
) => {
  const event = `${action}`;
  console.log(`[ANALYTICS] ${event}`);
  mixpanel.track(event, data);
};
