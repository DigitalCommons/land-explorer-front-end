import { Action } from "../types";

type AuthenticationState = {
    authenticated: boolean;
    error: string | null;
};

const INITIAL_STATE: AuthenticationState = {
    authenticated: true,
    error: null
}

type FailedLoginPayload = {
    errorMessage: string;
};

type AuthenticationAction =
    | Action & { type: "LOGGED_IN" | "LOG_OUT" | "SESSION_TIMED_OUT" }
    | Action<FailedLoginPayload> & { type: "FAILED_LOGIN" }
    | Action;

export default (state: AuthenticationState = INITIAL_STATE, action: AuthenticationAction): AuthenticationState => {
    switch (action.type) {
        case 'LOGGED_IN': {
            return {
                authenticated: true,
                error: null
            }
        }
        case 'FAILED_LOGIN': {
            const payload = action.payload as FailedLoginPayload;
            return {
                authenticated: false,
                error: payload.errorMessage
            }
        }
        case 'LOG_OUT': {
            return {
                authenticated: false,
                error: null
            }
        }
        case 'SESSION_TIMED_OUT': {
            return {
                authenticated: false,
                error: 'Your session has timed out. Please log back in.'
            }
        }
        default:
            return state;
    }
}
