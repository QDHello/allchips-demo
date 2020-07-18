import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/cookies'

export interface UserState {
  token: string;
  name: string;
  avator: string;
  introduction: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public token = getToken() || '';
  public name = '';
  public avator = '';
  public introduction = '';
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATOR(avator: string) {
    this.avator = avator
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    let { username } = userInfo
    username = username.trim()
    const { data } = await login({ username, password: userInfo.password })
    setToken(data.accessToken)
    this.SET_TOKEN(data.accessToken)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undehined!')
    }
    const { data } = await getUserInfo({})
    const { roles, name, avatar, introduction } = data.user
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(roles)
    this.SET_NAME(name)
    this.SET_AVATOR(avatar)
    this.SET_INTRODUCTION(introduction)
  }

  @Action
  public async Logout() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined')
    }
    await logout()
    removeToken()
    this.SET_TOKEN('')
    this.SET_NAME('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)