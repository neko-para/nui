import {
  ComponentInternalInstance,
  ElementNamespace,
  type RendererOptions,
  VNodeProps,
  createRenderer
} from '@vue/runtime-core'
import { FlexDirection } from 'yoga-layout'

import { NBox } from '../base/box'
import { NLayout } from '../base/layout'
import { screen } from '../base/screen'
import { NText } from '../base/text'
import { NWidget } from '../base/widget'

const options: RendererOptions<NWidget, NWidget> = {
  patchProp: function (
    el: NWidget,
    key: string,
    prevValue: any,
    nextValue: any,
    namespace?: ElementNamespace,
    parentComponent?: ComponentInternalInstance | null
  ): void {
    if (el.patchProp(key, nextValue)) {
      screen?.scheduleLayout()
    }
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
    switch (type) {
      case 'text':
        return new NText()
      case 'layout':
        return new NLayout()
      case 'box':
        return new NBox()
    }
    return new NWidget()
  },
  createText: function (text: string): NWidget {
    return new NWidget()
  },
  createComment: function (text: string): NWidget {
    return new NWidget()
  },
  setText: function (node: NWidget, text: string): void {},
  setElementText: function (node: NWidget, text: string): void {
    if (node instanceof NText) {
      node.updateText(text)
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
