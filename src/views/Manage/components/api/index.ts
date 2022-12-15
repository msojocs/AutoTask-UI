import type { RequestBodyType } from '../types'
import { POST } from '@/utils/server'

export const testRequest = async (data: RequestBodyType) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await POST('/request/test', data)
}

export const uploadFile = async (form: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await POST('/request/file/upload', form, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
  })
}
