<template>
  <p>DashBoard</p>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import AbstractPresenter from '../abstracts/presentors/AbstractPresenter'
import { PageUri } from '../enums/PageUri'

@Component({})
export default class LoginPresentor extends AbstractPresenter {
  redirectEdit() {
    this.$router.push({ path: PageUri.AUTH.LOGIN })
  }
}
</script>
