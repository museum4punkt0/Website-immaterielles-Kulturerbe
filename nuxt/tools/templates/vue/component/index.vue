<template>
  <div class="__component__(kebabCase)" />
</template>

<script setup lang="ts">
// import here what you need
// import something from 'somewhere'
//    :
//    :

// define props
// define with const, if you use props in script.
// const props = defineProps({
//     :
// if not, don't define with const
// defineProps({
//   todo: {
//     type: Object as PropType<ToDo>,
//     required: true,
//   },
// });

// define ref
// const completed = ref(props.todo.isComplete);
//
// const priority = ref(props.todo.priority ?? 0);

// define computed
// const dataAsUrl = computed(() => (
//   (props.todo.dataType === 'file')
//     ? `https://host/${props.todo.data}`
//     : `https://host/search/${decodeData(props.todo.data)}`
// ));
//  :
//  :
//  :

// define emits
// const emit = defineEmits(['incrementPriority', 'decrementPriority']);
//
// const incrementPriority = () : void => {
//   emit('incrementPriority');
// };
//
// const decrementPriority = () : void => {
//   emit('decrementPriority');
// };
//  :
//  :
//  :

// methods as you like
// const doSomething = () : void => {
//   console.log('hello');
// };
//  :
//  :
//  :

// watch
// import { watch } from "vue";
//
// watch(() => [...level.value], (currentValue, oldValue) => {
//   console.log(currentValue);
//   console.log(oldValue);
// });

// Livecycle hooks
//   onMounted(), onUpdated(), onUnmounted(), onBeforeMount(), onBeforeUpdate(), onBeforeUnmount(),
//   onErrorCaptured(), onRenderTracked(), onRenderTriggered(), onActivated(), onDeactivated(),
//   onServerPrefetch()
//
// import { onMounted } from 'vue'
// onMounted(() => {
//   console.log('mounted')
// })
//  :
//  :

</script>

<style lang="scss">
  // .__component__(kebabCase) {}
</style>
