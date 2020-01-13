<template>
  <div id="show-auth" />
</template>

<script lang="ts">
import Component from 'vue-class-component'
import AbstractPresenter from '../abstracts/presentors/AbstractPresenter'

@Component
export default class LoginPresentor extends AbstractPresenter {
  mounted() {
    this.$auth0.showLock('show-auth')
  }
}
</script>
