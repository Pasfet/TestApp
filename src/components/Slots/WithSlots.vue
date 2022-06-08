<template>
  <div>
    With slots

    <slot></slot>

    <div>
      <slot name="warning"></slot>
    </div>


    <div>
      <slot name="success"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WithSlots'
}
</script>