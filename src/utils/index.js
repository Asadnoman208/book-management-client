class Utils {

    getAuth_token = () => {
        return localStorage.getItem('auth-token');
    }
}
var utils = new Utils();
export { utils };