<template>
  <p>DashBoard{{ test }}</p>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import AbstractPresenter from '../abstracts/presentors/AbstractPresenter'
import { PageUri } from '../enums/PageUri'

@Component({})
export default class LoginPresentor extends AbstractPresenter {
  private test: string = ''
  created() {
    this.test = this.$auth0.getFirebaseToken()
  }

  redirectEdit() {
    this.$router.push({ path: PageUri.AUTH.LOGIN })
  }
}
</script>
