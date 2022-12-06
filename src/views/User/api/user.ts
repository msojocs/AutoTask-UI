/* eslint-disable @typescript-eslint/no-unsafe-return */
import { POST } from '@/utils/server'

export const login = async (username: string, password: string) => {
  return await POST('/user/login', {
    username,
    password,
  })
}

export const changePass = async (oldPass: string, newPass: string, computer = 'EMS Client') => {
  return await POST('/user/password', {
    OLD_PASSWORD: oldPass,
    NEW_PASSWORD: newPass,
    CLIENT_COMPUTER: computer,
  })
}
