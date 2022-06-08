<template>
  <div>
    <div>
      {{ text }}
    </div>
    <div v-if="id">
      {{ $options.titleHashMap.get(id) || 'id props' }}
  </div>
  </div>
</template>

<script>
export default {
  name: 'WithWatch',
  props: {
    group: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      default: null
    }
  },

  data: () => ({
    text: 'Default'
  }),

  titleHashMap: new Map([
    [1, 'Title 1'],
    [2, 'Title 2'],
  ]),

  watch: {
    group(val) {
      this.text = this.$options.titleHashMap.get(val) ?? 'Render 1'
    }
  }
}
</script>