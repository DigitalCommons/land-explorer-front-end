
export function isTokenExist(){
    return localStorage.getItem('token') !== null && localStorage.getItem('token_expiry') !== null;
}

export function isTokenActive(){
    if(this.isTokenExist)
    {
        let now = new Date();
        return now < localStorage.getItem('token_expiry');
    }
    return false;
}

export function isLoggedIn(){
    return this.isTokenActive;
}

export function setToken(token, expires_in){
    localStorage.setItem('token', token);

    var expiry = new Date();
    //expires_in is the seconds from current time
    expiry.setSeconds(expiry.getSeconds() + expires_in);
    localStorage.setItem('token_expiry', expiry.toString());
}

export function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
}

export function getAuthHeader(){
    return {headers: {'Authorization': "bearer " + localStorage.getItem('token')}};
}

export function bootstrap(){
    return {headers: {'Authorization': "bearer " + localStorage.getItem('token')}};
}

export function test(){
    return "TESTING CALL TO AUTH CLASS";
}
