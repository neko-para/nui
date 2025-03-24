import { h, isProxy } from '@vue/runtime-core'

export const jsxs = (type, { children, ...otherProps } = {}, key) => {
  const props = key ? { ...otherProps, key } : otherProps
  if (typeof type === 'object') {
    return h(type, props, isProxy(children) ? children : () => children)
  }
  if (typeof type === 'string' && type === 'text') {
    return h(type, props, children.join(''))
  }
  return h(type, props, children)
}

export const jsx = (type, { children, ...otherProps } = {}, key) => {
  const props = key ? { ...otherProps, key } : otherProps
  if (children) {
    if (typeof type === 'object') {
      return h(type, props, isProxy(children) ? children : () => children)
    }
    return h(type, props, children)
  }
  return h(type, props)
}
