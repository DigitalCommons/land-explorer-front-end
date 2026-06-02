import mixpanel from "mixpanel-browser";
import constants from "@/constants";
import { AnalyticsEvent } from "./types/analytics-events";

const analyticsEnabled =
  !!constants.MIXPANEL_TOKEN && !!constants.MIXPANEL_PEPPER;

export const initializeMixpanel = (): void => {
  if (!constants.MIXPANEL_TOKEN || !constants.MIXPANEL_PEPPER) {
    return;
  }

  mixpanel.init(constants.MIXPANEL_TOKEN, {
    debug: constants.DEV_MODE || false,
    persistence: "localStorage",
    ip: false,
    opt_out_tracking_by_default: true,
  });
};

/** Set (anonymized) user in the Mixpanel event data */
export const optInAndSetAnalyticsUser = async (
  userId: string,
  username: string,
) => {
  if (!analyticsEnabled) {
    return;
  }

  const user = await getUserHash(userId, username);
  mixpanel.identify(user);
  if (!mixpanel.has_opted_in_tracking()) {
    mixpanel.opt_in_tracking();
  }
};

/** Reset the user in the Mixpanel event data e.g. when user logs out */
export const optOutAndResetAnalyticsUser = () => {
  if (!analyticsEnabled) {
    return;
  }
  mixpanel.opt_out_tracking();
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

  // Convert buffer to hex string and return first 16 characters
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .substring(0, 16);
};

export const trackEvent = <T extends Record<string, unknown>>(
  action: AnalyticsEvent,
  data: T,
  consent: boolean,
) => {
  if (!analyticsEnabled || !consent) {
    return;
  }

  mixpanel.track(action, data);
};
