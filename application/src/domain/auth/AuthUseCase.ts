import queryString from 'query-string'
import {ParsedQuery} from 'query-string'
import jwtDecode from 'jwt-decode'
import Auth0 from 'auth0-js'
import nuxtConfig from '../../../nuxt.config'

const config = nuxtConfig.auth0

export default class AuthService{
  private _client:Auth0.WebAuth;

  constructor(){
    this._client = new Auth0.WebAuth({
      domain: config.domain,
      redirectUri: `${window.location.origin}/callback`,
      clientID: config.clientID,
      responseType: 'token id_token',
      scope: 'openid profile email'
    });
  }

  public login(email:string,password:string) {
    return new Promise(resolve => {
      this._client.login({
        realm: 'Username-Password-Authentication',
        username: email,
        password: password,
        redirectUri: `${this.getBaseUrl()}/callback`,
      },err=>{
        if(err){
          console.error(err);
          resolve({ errorMessage: err.description });
        }
        resolve({ success: true });
      });
    })
  }

  public setTokenByQuery(){
    this.setToken(this.getQueryParams())
  }

  public async approvalFireBaseByCustomToken(){
    const response = await fetch('http://localhost:5000/pig-allowance-book-core/us-central1/api/firebase', {
      headers: {
        'Authorization': `Bearer ${this.getIdToken()}`,
      },
    });
    const data = await response.json();
    this.setFireBaseAccessToken(this.switchBlank(data.firebaseToken));
  }

  private getBaseUrl() {
    return `${window.location.protocol}//${window.location.host}`
  }

  private getQueryParams(){
    return queryString.parse(location.hash)
  }

  private setToken(params:ParsedQuery<string>){
    const localStorage = window.localStorage
    localStorage.setItem('accessToken',this.switchBlank(params['access_token']))
    localStorage.setItem('idToken',this.switchBlank(params['id_token']))
    localStorage.setItem('accessToken',(Number(this.switchBlank(params['expires_in'])) * 1000 + new Date().getTime()).toString())
    localStorage.setItem('user', JSON.stringify(jwtDecode(this.switchBlank(params['id_token']))))
  }

  private unsetToken(params:ParsedQuery<string>){
    const localStorage = window.localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  }

  private setFireBaseAccessToken(firebaseToken:string){
    const localStorage = window.localStorage
    localStorage.setItem('firebaseAccessToken',firebaseToken)
  }

  private getIdToken(){
    return window.localStorage.getItem('idToken')
  }

  public getFirebaseToken(){
    return window.localStorage.getItem('firebaseAccessToken')
  }

  private switchBlank(value:string | string[] | null | undefined):string{
    if(value == undefined){
      return ''
    }
    if(value == null){
      return ''
    }
    return value.toString();
  }
}