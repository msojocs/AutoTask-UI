/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TabData {
  title: Record<string, string>
  name: string
  route: string
}
export interface TabState {
  tabsOption: TabData[]
  currentIndex: string
  breadcrumbList: any[]
}
