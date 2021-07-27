import * as echarts from 'echarts/core'
import {
    BarChart,
    // 系列类型的定义后缀都为 SeriesOption
    LineChart,
    RadarChart,
    PieChart,
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    RadarComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components'
import {
    CanvasRenderer
} from 'echarts/renderers'


// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, LineChart, RadarChart, RadarComponent, PieChart, CanvasRenderer,LegendComponent]
)

export {
    echarts
}