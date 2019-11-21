<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    badge: {
      type: Number,
      default: 0,
    },
  },
  render(h, context) {
    const { icon, title, badge } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon class="svg-icon" icon={icon}/>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }

    if (badge) {
      vnodes.push(<el-badge slot='title' class="mark" value={badge}/>)
    }
    return vnodes
  },
}
</script>
