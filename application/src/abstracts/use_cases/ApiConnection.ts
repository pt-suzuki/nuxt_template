import * as Axios from 'axios'
import {Token} from "../../enums/Token";
import {ApiUri} from "../../enums/ApiUri";

class CsrfController {
    static create_csrf_token() :string {
        if (!process.browser) {
            return "";
        }
        const obj = document.querySelector('meta[name=csrf-token]')
        const result = obj == null ? "" :obj.getAttribute('content');
        return result == null ? "":result;
    }
}

const AXIOS = Axios.default.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CsrfController.create_csrf_token(),
        'X-Requested-With': 'XMLHttpRequest',
    },
    validateStatus: function (status) {
        return status < 500;
    }
});

AXIOS.interceptors.response.use(async (response) =>{
    if (response.status !== 401) {
        return response;
    }
    const param = [];
    let token: string | null = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem(Token.REFRESH);
    }
    if(token === null || token === "") {
        return response;
    }
    param.push("refresh_token",token);
    param.push("client_id",String(1));
    param.push("client_secret",String("fIHnsRRbMC6aodkoI81lDwUtrJc1OTM6iaB72iDe"));
    param.push("grant_type","refresh_token");
    param.push("scope","");
    return AXIOS.post(ApiUri.OAUTH.ACCESS_TOKEN,param).then(responseLogin => {
        if(responseLogin.status == 401 || responseLogin.status == 400){
            if (typeof window !== 'undefined') {
                if(response.config.headers['Authorization'] != 'Bearer ' + localStorage.getItem(Token.ACCESS)){
                    response.config.headers['Authorization'] = 'Bearer '+ localStorage.getItem(Token.ACCESS);
                    return AXIOS(response.config);
                }
            }
            return response;
        }
        if (typeof window !== 'undefined') {
            localStorage.setItem(Token.ACCESS,responseLogin.data.access_token);
            localStorage.setItem(Token.REFRESH,responseLogin.data.refresh_token);
        }
        response.config.headers['Authorization'] = 'Bearer ' + responseLogin.data.access_token;
        return AXIOS(response.config);
    }).catch(errorResponse => {
        return response;
    });
}, function(error){
    return Promise.reject(error);
});

AXIOS.interceptors.request.use((config) =>{
    if (typeof window !== 'undefined') {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem(Token.ACCESS);
        config.headers.AuthorizationSub = 'Bearer ' + localStorage.getItem(Token.ACCESS);
    }
    return config
});

export default class ApiConnection {

    constructor() {}

    // getリクエスト
    async get(url:string, json: any) {
        json.csrfToken = CsrfController.create_csrf_token();
        return await AXIOS.get(url,{params:json});
    }
    // postリクエスト
    async post(url:string,json: any) {
        json.csrfToken = CsrfController.create_csrf_token();
        return AXIOS.post(url, json)
    }
    // putリクエスト
    async put(url:string,json:any) {
        json.csrfToken = CsrfController.create_csrf_token();
        return AXIOS.put(url, json)
    }
    // deleteリクエスト
    async delete(url:string,json:any) {
        json.csrfToken = CsrfController.create_csrf_token();
        return AXIOS.delete(url, json)
    }

    async post_file(url:string,params:FormData){
        return AXIOS.post(url,params)
    }
}