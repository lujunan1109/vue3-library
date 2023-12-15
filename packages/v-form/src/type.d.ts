export interface FormOptionType {
  label: string,
  prop: string,
  componentName: string,
  value?: string | number | boolean | null,
  name?: string,
  childName?: string,
  attrs?: any,
  slotName?: string,
  children?: FormItemChildType[]
}

export interface RuleForm {
  [key: string]: any
}

export type defineRenderComponentType = {
  [key: string]: any
}

export type FormItemChildType = {
  label: string,
  value?: string,
  name?: string
}

export type Arrayable<T> = T | T[];
