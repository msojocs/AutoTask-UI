
export interface RequestType {
  method: 'GET' | 'POST'
  url: string
  params: ParamDataType[]
  header: HeaderDataType[]
  proxy?: string
  body: ReqeustBodyBodyType
  expected?: ExpectedType[]
}

// 校验数据类型
export interface RequestExpected {
  path: string
  value: string
  vtype: string
}

// 请求头数据类型
export interface HeaderDataType {
  id: string
  enable: boolean
  edit: string
  key: string
  value: string
  desc: string
  auto: boolean
}

// 参数数据类型
export interface ParamDataType {
  id: string
  enable: boolean | undefined
  edit: string
  key: string
  value: string
  desc: string
}

// BODY
export interface RequestBodyType {
  method: 'POST' | 'GET'
  url: string
  header: Record<string, string>
  proxy?: string
  body?: ReqeustBodyBodyType
  expected: ExpectedType[]
}

// 请求体数据类型
export interface ReqeustBodyBodyType {
  // 请求体类型
  type: 'none' | 'json' | 'html' | 'form' | 'text' | 'xml' | 'javascript' | 'formData' | 'binary'

  data: ReqeustBodyDataType
}

export interface ReqeustBodyDataType {
  none?: null
  raw?: string
  binary?: string

  form?: FormType
  formData?: FormDataType
}

export interface FormDataType {
  id: string
  enable: boolean
  edit: string
  key: string
  value: string
  desc: string
  type: 'file' | 'text'
}

export interface FormType {
  id: string
  enable: boolean
  edit: string
  key: string
  value: string
  desc: string
}

export interface ExpectedType {
  // 名称
  name: string
  // 是否启用
  enable: boolean
  // 断言对象
  target: string
  // json路径
  path?: string
  // 预期值
  value: string
  // 计算表达式类型
  exp: string
}
