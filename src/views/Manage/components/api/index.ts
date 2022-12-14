import type { RequestBodyType } from '../types'
import { POST } from '@/utils/server'

export const testRequest = async (data: RequestBodyType) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await POST('/request/test', data)
}
