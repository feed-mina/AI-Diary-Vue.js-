
<script>
export default {
  name:'Modal',
  props:{
    open:{
      type : Boolean,
      required : true,
    },
    close:{
      type:Function,
      required : true,
    },
    header : {
      type: String,
      default : "Modal Header",
    },
  },
  computed: {
    isOpen(){
      return this.open;
    },
  },
};
</script>

<template>
  <div class="Modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <header class="modal-header">
          <h2>{{  header  }}</h2>
          <button class="close-button" @click="close">&times;</button>
        </header>
        <main class="modal-body">
          <slot></slot>
        </main>
        <footer class="modal-footer">
          <button class="modal-close-btn" @click="close">Close</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<style>

</style>
