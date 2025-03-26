import type { Component, DefineSetupFnComponent, VNode } from '@vue/runtime-core'

import type { NBoxProp, NTextProp, NWidget, NWidgetProp } from '@nekosu/nui'

export function jsxs(type: any, props?: any, key?: string): VNode<NWidget, NWidget>
export function jsx(type: any, props?: any, key?: string): VNode<NWidget, NWidget>

type BaseElementProps = {
  display?: 'flex' | 'none'

  width?: 'auto' | number | `${number}%`
  height?: 'auto' | number | `${number}%`
  minWidth?: number | `${number}%`
  maxWidth?: number | `${number}%`
  minHeight?: number | `${number}%`
  maxHeight?: number | `${number}%`

  margin?: 'auto' | number | `${number}%`
  marginLeft?: 'auto' | number | `${number}%`
  marginRight?: 'auto' | number | `${number}%`
  marginTop?: 'auto' | number | `${number}%`
  marginBottom?: 'auto' | number | `${number}%`
  padding?: number | `${number}%`
  paddingLeft?: number | `${number}%`
  paddingRight?: number | `${number}%`
  paddingTop?: number | `${number}%`
  paddingBottom?: number | `${number}%`

  position?: 'relative' | 'absolute' | 'static'
  left?: number | `${number}%`
  right?: number | `${number}%`
  top?: number | `${number}%`
  bottom?: number | `${number}%`

  alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'

  basis?: 'auto' | number | `${number}%`
  grow?: number
  shrink?: number

  aspectRatio?: number
} & NWidgetProp

type LayoutElementProps = {
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse'
  wrap?: 'no-wrap' | 'wrap' | 'wrap-reverse'
  gap?: number | `${number}%`
  rowGap?: number | `${number}%`
  columnGap?: number | `${number}%`

  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'

  children?: Element | Element[]
}

type TextPrim = string | number | boolean | null | undefined

declare namespace JSX {
  type Element = VNode<NWidget, NWidget>

  type ElementType = keyof IntrinsicElements | (() => Element) | Component

  interface ElementChildrenAttribute {
    children: {}
  }

  interface IntrinsicElements {
    layout: BaseElementProps & LayoutElementProps
    text: BaseElementProps &
      NTextProp & {
        children?: TextPrim | TextPrim[]
      }
    box: BaseElementProps & LayoutElementProps & NBoxProp
    input: BaseElementProps &
      NTextProp & {
        children?: []
      }
  }
}
