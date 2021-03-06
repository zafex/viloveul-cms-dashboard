import initial from '@/modules/user/store/initial'

export default {
  setProfile: (state, profile) => {
    state.profile = Object.assign({}, initial.profile, profile)
  },
  setUser: (state, user) => {
    state.user = Object.assign({}, initial.user, user)
  },
  setMe: (state, me) => {
    state.me = Object.assign({}, initial.user, me)
  },
  setMine: (state, mine) => {
    for (let a in mine) {
      state.mine[a] = mine[a]
    }
  },
  setRole: (state, role) => {
    state.role = Object.assign({}, initial.role, role)
  },
  setRoles: (state, roles) => {
    state.roles = [...roles]
  }
}
