<template>
  <div :class="className">
    <div class="item-header">
      <span class="handler">o</span>
      <span class="text" v-on:click="toggle">{{ name }}</span>
    </div>
    <div class="item-body" v-if="body === true">
      <div class="form-group">
        <label>Type</label>
        <select v-model="options.type" class="form-control">
          <option v-for="type in types" :key="type.name" :value="type.name">{{ type.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <span class="btn btn-danger btn-xs" v-on:click="$emit('delete-item')">Delete</span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  props: {
    className: {
      type: String,
      default: 'widget-item'
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    opts () {
      return this.$store.getters['setting/getOptions']()
    }
  },
  async mounted () {
    this.types = this.opts.contents.tags
  },
  methods: {
    toggle () {
      this.body = !this.body
    }
  },
  data () {
    return {
      body: false,
      types: []
    }
  }
}

</script>
