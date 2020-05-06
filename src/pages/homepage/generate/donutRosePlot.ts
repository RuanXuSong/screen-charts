/*
 * @文件描述: 玫瑰图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-04-28 16:35:04
 */
import { PlotCreateProps } from './config';
import CustomDonutRose, { CustomRoseConfig } from '../g2components/CustomDonutRose';

const createDonutRosePlot = ({ dom, data, config }: PlotCreateProps<CustomRoseConfig>) => {
  const rosePlot = new CustomDonutRose(dom, {
    data,
    ...config,
  });
  rosePlot.render();
};
export default createDonutRosePlot;
