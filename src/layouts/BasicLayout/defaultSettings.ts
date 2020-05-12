/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-22 16:22:12
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-12 11:18:23
 */
import { Settings } from '@ant-design/pro-layout';

const defaultSettings: Partial<Settings> = {
  navTheme: 'dark',
  primaryColor: '#1890ff',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
    defaultOpenAll: false,
  },
  title: '大屏组件模板',
};

export default defaultSettings;
