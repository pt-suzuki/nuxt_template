import AuthUseCase from '../domain/auth/AuthUseCase'

export default (_:any, inject:any) => {
  inject('auth0', new AuthUseCase())
}
