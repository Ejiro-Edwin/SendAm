export function authHeader() {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('user_token'));

    if (token) {
        return { 'Authorization': 'x-auth-token' + token };
    } else {
        return {};
    }
}