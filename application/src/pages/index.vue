<template>
  <Login />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Login from '../templates/LoginTemplate.vue'

@Component({
  components: {
    Login
  }
})
export default class IndexPresentor extends Vue {}
</script>
