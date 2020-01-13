<template>
  <p>Signing in....</p>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import AbstractPresenter from '../abstracts/presentors/AbstractPresenter'
import { PageUri } from '../enums/PageUri'

@Component({})
export default class LoginPresentor extends AbstractPresenter {
  created() {
    this.$auth0.setTokenByQuery()
    this.redirectEdit()
  }

  redirectEdit() {
    this.$router.push({ path: PageUri.DASH_BOARD })
  }
}
</script>
