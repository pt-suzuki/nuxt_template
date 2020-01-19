const cookieparser = process.server ? require('cookieparser') : undefined

export const auth_state = () =>{
  return {
    auth : null
  }
}

export const mutations = {
  setAuth (auth_state:any, auth:any) {
    auth_state.auth = auth
  }
}

export const actions = {
  nuxtServerInit ({ commit } :{ commit :any }, { req } :{ req :any }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        console.log('No valid cookie found')
      }
    }
    commit('setAuth', auth)
  }
}