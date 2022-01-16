<template>
  <my-modal @close='close'>
    <template v-slot:header>
      <p class="modal-card-title">About MasterMind</p>
    </template>
    <template v-slot:section>
      This is about master mind
    </template>
  </my-modal>
</template>

<script>
import MyModal from '@/components/my-modal'
export default {
  name: 'MasterMindSettings',
  components: { MyModal },
  methods: {
    close () {
      // json save
      this.$router.push({ name: 'master-mind' })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
