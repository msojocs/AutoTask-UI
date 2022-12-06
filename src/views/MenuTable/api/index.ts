/* eslint-disable @typescript-eslint/no-unsafe-return */
import { POST } from '@/utils/server'

// FunctionSetByPlatformRequest
// 获取菜单列表
export const getMenuListReq = async () => {
  return await POST('/Platform/FunctionSetByPlatformRequest', {
    BODY: {
      PLATFORMNAME: 'EMS',
    },
  })
}

// SaveFunctionSetRequest
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postSaveMenu = async (...funcList: any[]) => {
  return await POST('/Platform/SaveFunctionSetRequest', {
    BODY: {
      FUNCTIONLIST: funcList,
    },
  })
}
