function isTokenExist(): boolean {
    return localStorage.getItem('token') !== null && localStorage.getItem('token_expiry') !== null;
}

export function isTokenActive(): boolean {
    if (isTokenExist()) {
        const now = new Date();
        const expiry = new Date(localStorage.getItem('token_expiry') as string);
        return now.getTime() < expiry.getTime();
    }
    return false;
}

export function setToken(token: string, expires_in: number): void {
    localStorage.setItem('token', token);

    const expiry = new Date();
    //expires_in is the seconds from current time
    expiry.setSeconds(expiry.getSeconds() + expires_in);
    localStorage.setItem('token_expiry', expiry.toString());
}

export function removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
}

export type AuthHeader = {
    headers: {
        Authorization: string;
    };
};

export function getAuthHeader(): AuthHeader {
    return { headers: { 'Authorization': "bearer " + localStorage.getItem('token') } };
}

export function getToken(): string | null {
    return localStorage.getItem('token');
}
