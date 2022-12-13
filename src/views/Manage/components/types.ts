
export interface RequestType {
  method: string
  url: string
  params: ParamDataType[]
  header: HeaderDataType[]
  proxy?: string
  body: RequestBody
}

// 请求体数据类型
export interface RequestBody {
  // 类型
  t: string
  data: string
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
