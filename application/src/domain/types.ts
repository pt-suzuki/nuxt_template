export interface Auth{
  access_token:string,
  refresh_tolen:string,
  id_token:string,
  firebase_token:string,
}

export interface User{
  id:number,
  name:string,
  mail_address:string,
}
