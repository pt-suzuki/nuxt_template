export module ApiUri{
    
    const DOMAIN:string | undefined = process.env.API_URL;
    const BASE_URL:string = DOMAIN + '/api/';

    export module OAUTH{
        const OAUTH:string = DOMAIN + "/oauth/";
        export const ACCESS_TOKEN = OAUTH + "token/";
        export const LOGIN_CHECK = BASE_URL + "login/check";
        export const LOGIN_HISTORY = BASE_URL + "login/history";
    }
}