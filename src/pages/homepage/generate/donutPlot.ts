/*
 * @文件描述: 基础环图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-06 17:52:31
 */
import { Donut, RingConfig, DataItem } from '@antv/g2plot';
import {
  PlotCreateProps,
  chartColorArr,
  basePieConfig,
  baseLegendColor,
} from './config';
import { DonutViewConfig } from '@antv/g2plot/lib/plots/donut/layer';

interface CustomRingConfig extends Partial<RingConfig> {
  // 是否为单例图,如果是单例图，data必须要是number类型（传入百分比）
  isSingle?: boolean;
  // 数据名称
  titleName?: string;
}

interface DonutConfigProps {
  titleName: string;
  isSingle: boolean;
}

type RingPlotCreateProps = Merge<
  PlotCreateProps<CustomRingConfig>,
  { data: number | DataItem[] }
>;

/**
 * @功能描述: 得到不同类型图表配置
 * @参数: @param:data:单例图表数据，@param:config:图表配置
 * @返回值: 图表配置
 */
const getDonutConfig = (
  data: number | DataItem[],
  config: DonutConfigProps,
) => {
  const { titleName, isSingle } = config;
  let formatedData = '' + data;
  if (isSingle) {
    formatedData = (data as number).toFixed(1);
  }
  const donutConfig = {
    single: {
      color: ['rgba(0, 187, 255, 1)', 'rgba(13, 37, 67, 1)'],
      lineWidth: 0,
      statistic: {
        visible: true,
        /** 触发显示的事件 */
        triggerOn: 'none',
        /** 触发隐藏的事件 */
        triggerOff: 'none',
        htmlContent: () => {
          return `<div>
            <div class="ring-guide-name">${titleName}</div>
            <div class="ring-guide-value">${formatedData}<span class="percent-sign">%</span></div>
          </div>`;
        },
      },
    },
    default: {
      color: chartColorArr,
      lineWidth: 6,
      statistic: {
        visible: true,
      },
    },
  };
  return donutConfig[isSingle ? 'single' : 'default'];
};

const createDonutPlot = ({ dom, data, config }: RingPlotCreateProps) => {
  const { isSingle = false, titleName = '图例' } = config || {};
  const plotConfig = getDonutConfig(data, { titleName, isSingle });
  let newData = data as DataItem[];
  if (isSingle) {
    const dataNumber = data as number;
    newData = [
      { value: dataNumber, type: titleName },
      { value: 100 - dataNumber, type: '空' },
    ];
  }
  const donutChart = new Donut(dom, {
    ...basePieConfig,
    radius: 1,
    innerRadius: 0.8,
    data: newData,
    angleField: 'value',
    colorField: 'type',
    color: plotConfig.color,
    statistic: plotConfig.statistic as DonutViewConfig['statistic'],
    label: {
      visible: false,
    },
    pieStyle: {
      stroke: '#091437',
      lineWidth: plotConfig.lineWidth,
      style: {
        marginTop: -10,
      },
    },
    legend: {
      position: 'bottom-center',
      flipPage: false,
      text: {
        ...baseLegendColor,
        formatter: (txt) => {
          if (txt !== '空') {
            return txt;
          }
          return '';
        },
      },
      title: {
        visible: false,
      },
    },
    ...config,
  });
  donutChart.render();
};

export default createDonutPlot;
