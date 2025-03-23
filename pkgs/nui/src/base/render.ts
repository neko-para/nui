import {
  ComponentInternalInstance,
  ElementNamespace,
  type RendererOptions,
  VNodeProps,
  createRenderer
} from '@vue/runtime-core'

import { NText } from './text'
import { NWidget } from './widget'

const options: RendererOptions<NWidget, NWidget> = {
  patchProp: function (
    el: NWidget,
    key: string,
    prevValue: any,
    nextValue: any,
    namespace?: ElementNamespace,
    parentComponent?: ComponentInternalInstance | null
  ): void {
    throw new Error('Function not implemented.')
  },
  insert: function (el: NWidget, parent: NWidget, anchor?: NWidget | null | undefined): void {
    el.insert(parent, anchor)
  },
  remove: function (el: NWidget): void {
    el.remove()
  },
  createElement: function (
    type: string,
    namespace?: ElementNamespace,
    isCustomizedBuiltIn?: string,
    vnodeProps?: (VNodeProps & { [key: string]: any }) | null
  ): NWidget {
    return new NWidget()
  },
  createText: function (text: string): NWidget {
    return new NText(text)
  },
  createComment: function (text: string): NWidget {
    return new NText(text)
  },
  setText: function (node: NWidget, text: string): void {
    if (node instanceof NText) {
      ;(node as NText).text = text
    }
  },
  setElementText: function (node: NWidget, text: string): void {
    if (node instanceof NText) {
      ;(node as NText).text = text
    }
  },
  parentNode: function (node: NWidget): NWidget | null {
    return node.parent
  },
  nextSibling: function (node: NWidget): NWidget | null {
    if (!node.parent) {
      return null
    }
    const index = node.parent.childs.indexOf(node)
    if (index === -1) {
      return null
    }
    return node.parent.childs[index + 1] ?? null
  }
}

export const { createApp, render } = createRenderer(options)
