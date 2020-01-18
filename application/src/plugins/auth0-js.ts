import Auth0Js from 'auth0-js'
import nuxtConfig from '../../nuxt.config'
import queryString from 'query-string'
import {ParsedQuery} from 'query-string'
import jwtDecode from 'jwt-decode'
const config = nuxtConfig.auth0

class Auth0UseCase {

  private auth0 = new Auth0Js.WebAuth({
    clientID: 'CLIENT_ID',
    domain: 'DOMAIN'
  });

  showLock(email:string,password:string) {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username: email,
      password: password,
      scope: 'openid email'
    },(err, result)=>{
    })
  }

  getBaseUrl() {
    return `${window.location.protocol}//${window.location.host}`
  }

  getQueryParams(){
    return queryString.parse(location.hash)
  }

  setToken(params:ParsedQuery<string>){
    const localStorage = window.localStorage
    localStorage.setItem('accessToken',this.undifinedSwitch(params['access_token']))
    localStorage.setItem('idToken',this.undifinedSwitch(params['id_token']))
    localStorage.setItem('accessToken',(Number(this.undifinedSwitch(params['expires_in'])) * 1000 + new Date().getTime()).toString())
    localStorage.setItem('user', JSON.stringify(jwtDecode(this.undifinedSwitch(params['id_token']))))
  }

  unsetToken(params:ParsedQuery<string>){
    const localStorage = window.localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  }

  setTokenByQuery(){
    this.setToken(this.getQueryParams())
  }

  undifinedSwitch(value:string | string[] | null | undefined):string{
    if(value == undefined){
      return ''
    }
    if(value == null){
      return ''
    }
    return value.toString();
  }
}

export default (_:any, inject:any) => {
  inject('auth0', new Auth0UseCase())
}
