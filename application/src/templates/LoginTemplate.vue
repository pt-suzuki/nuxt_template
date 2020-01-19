<template>
  <div>
    <input v-model="email" type="text" />
    <input v-model="password" type="password" />
    <input @click="auth()" type="button" value="ログイン" />
    <p>{{ email }}</p>
    <p>{{ password }}</p>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import AbstractPresenter from '../abstracts/presentors/AbstractPresenter'

@Component
export default class LoginPresentor extends AbstractPresenter {
  private email: string = ''
  private password: string = ''

  public auth() {
    this.$auth0.login(this.email, this.password)
  }
}
</script>
