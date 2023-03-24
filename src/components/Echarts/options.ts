export const options = {
    title: {
        show: true, // 是否显示标题组件,（true/false）
        text: '', // 主标题文本，支持使用\n换行
        textAlign: 'auto', //整体水平对齐（包括text和subtext）
        textVerticalAlign: 'auto', //整体的垂直对齐（包括text和subtext）
        padding: 0, // 标题内边距 写法如[5,10]||[ 5,6, 7, 8] ,
        left: 'auto', // title组件离容器左侧距离，写法如'5'||'5%'
        right: 'auto', //'title组件离容器右侧距离
        top: 'auto', // title组件离容器上侧距离
        bottom: 'auto', // title组件离容器下侧距离
        borderColor: '', // 标题边框颜色
        borderWidth: 1, // 边框宽度（默认单位px）
        textStyle: {
            // 标题样式
            color: '', //字体颜色
            fontStyle: '', //字体风格
            fontSize: 14, //字体大小
            fontWeight: 400, //字体粗细
            fontFamily: '', //文字字体
            lineHeight: '', //字体行高
            align: 'center', //文字水平对齐方式（left/right）
            verticalAlign: 'middle', //文字垂直对齐方式（top/bottom）
        },
        subtext: '', // 副标题
        subtextStyle: {
            // 副标题样式
            color: '#ccc',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 18,
            lineHeight: 18,
        },
    },
    tooltip: {
        show: true, //是否显示提示框组件
        trigger: 'item', //触发类型，属性值：item数据项触发/axis坐标轴触发/none不触发
        axisPointer: {
            type: 'line', //指示器类型，属性值：line直线/shadow阴影/none/cross十字准星
            axis: 'auto', //指示器坐标轴，属性值：x/y/radius/angle
            snap: true, //坐标轴指示器是否自动吸附到点上。默认自动判断，布尔值
            z: 0, //坐标轴指示器z值，控制图形的前后顺序，属性值：number
            label: {
                show: false, //是否显示文本标签
                precision: 'auto', //文本标签中数值小数点精度。默认根据当前轴的值自动判断
                formatter: {}, //文本标签文字格式化器
                margin: 3, //label距离轴的距离
                color: '#fff',
                fontStyle: '',
                fontWeight: '',
                fontFamily: '',
                fontSize: 12,
                lineHeigh: 20,
                width: 20,
                height: 100,
                textBorderColor: '', //文字本身描边颜色
                textBorderWidth: 0, //文字本身描边宽度
                textBorderType: 'solid', //文字本身描边类型，属性值：solid/dashed/dotted/number/array
                textBorderDashOffset: 0, //虚线偏移量，搭配textBorderType指定dashed/array实现虚线效果
                textShadowColor: 'transparent', //文字本身阴影颜色
                textShadowBlur: 0, //文字本身的阴影长度
                textShadowOffsetX: 0, //文字本身的阴影 X 偏移
                textShadowOffsetY: 0, //文字本身的阴影 Y 偏移
                overflow: 'none', //文字超出宽度是否截断或换行,配置width时有效,truncate/break/breakAll
                ellipsis: '', //在overflow配置为'truncate'的时候，可以通过该属性配置末尾显示的文本
                padding: 0,
                backgroundColor: 'auto', //背景颜色，默认是和axis.axisLine.lineStyle.color 相同
                borderColor: '', //文本标签的边框颜色
                borderWidth: 0, //文本标签的边框宽度
                shadowBlur: 3, //图形阴影模糊大小，配合shadowColor,shadowOffsetX,shadowOffsetY设置阴影效果
                shadowColor: '#aaa', //阴影颜色，支持的格式同color
                shadowOffsetX: 0, //阴影水平方向上的偏移距离
                shadowOffsetY: 0, //阴影垂直方向上的偏移距离
            },
            lineStyle: {
                color: '#555', // /颜色/
                width: 1, //线宽
                type: 'solid', //线的类型，属性值：solid/dashed/dotted/number/array
                dashOffset: 0, //虚线偏移量，搭配type指定dashed/array实现虚线效果
                cap: 'butt', //线段末端的绘制，butt方形/round圆形/square也是方形效果与butt不同
                join: 'bevel', //设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性，bevel默认/round/miter
                miterLimit: 10, //设置斜接面限制比例，只有当join为miter才有效，属性值：10默认值/number
                shadowBlur: 10, //阴影模糊大小，该属性配合shadowColor/shadowOffsetX/shadowOffsetY一起设置图形的阴影效果
                shadowColor: '', //阴影颜色，支持的格式同color
                shadowOffsetX: 0, //阴影水平方向上的偏移距离
                shadowOffsetY: 0, //阴影垂直方向上的偏移距离
                opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
            },
            shadowStyle: {
                color: '#fff', ///颜色，文章链接如下  Echart图表之颜色color配置项大全/
                shadowBlur: 10,
                shadowColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
            },
            crossStyle: {
                color: '#fff', // /颜色，/
                shadowBlur: 10,
                shadowColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
            },
            animation: 'line', //是否开启动画
            animationThreshold: 2000, //是否开启动画的阈值
            animationDuration: 1000, //初始动画的时长，支持回调函数
            animationEasing: 'cubicOut', //初始动画的缓动效果
            animationDelay: 0, //初始动画的延迟，支持回调函数
            animationDurationUpdate: 200, //数据更新动画的时长，支持回调函数
            animationEasingUpdate: 'exponentialOut', //数据更新动画的缓动效果
        },
        showContent: true, //是否显示提示框浮层，默认显示
        alwaysShowContent: false, //是否永远显示提示框内容
        triggerOn: 'mousemove|click', //提示框触发条件，mousemove/click/mousemove|click/none。none时可通过action.tooltip.showTip和action.tooltip.hideTip来手动触发和隐藏。也可通过axisPointer.handle来触发或隐藏
        showDelay: 0, //浮层显示的延迟，默认0ms
        hideDelay: 100, //浮层隐藏的延迟
        enterable: false, //鼠标是否可进入提示框浮层中，默认为false
        renderMode: 'html', //浮层的渲染模式，html默认/richText富文本形式
        confine: false, //是否将 tooltip 框限制在图表的区域内
        appendToBody: false, //是否将组件DOM节点添加为HTML的<body>子节点。只有当renderMode为html有意义
        className: 'echarts-tooltip echarts-tooltip-dark', //指定tooltip的DOM节点CSS类，只在html模式下生效
        transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是s
        position: [], //提示框浮层的位置
        formatter: () => {}, //提示框浮层内容格式器，用这个可以修改提示框默认内容/
        valueFormatter: (value: number | string) => value, //数值显示部分的格式化回调函数
        backgroundColor: '', //背景颜色，格式同color
        borderColor: '', //提示框浮层边框颜色，格式同color
        borderWidth: 0, //提示框浮层的边框宽
        padding: 5,
        textStyle: {
            color: '#fff', //颜色，文章链接如下  Echart图表之颜色color配置项大全/
            fontStyle: '',
            fontWeight: '',
            fontFamily: '',
            fontSize: 14,
            lineHeight: 20,
            width: 220,
            height: 20,
            textBorderColor: '', //文字本身的描边颜色
            textBorderWidth: '', //文字本身的描边宽度
            textBorderType: 'solid', //文字本身描边类型，属性值：solid/dashed/dotted/number/array
            textBorderDashOffset: 0, //虚线偏移量，可搭配textBorderType指定dashed/array实现灵活的虚线效果
            textShadowColor: 'transparent', //文字本身阴影颜色
            textShadowBlur: 0, //文字本身阴影长度
            textShadowOffsetX: 0, //文字本身阴影 X 偏移
            textShadowOffsetY: 0, //文字本身阴影 Y 偏移
            overflow: 'none', //文字超出宽度是否截断或者换行，配置width时有效，属性值：truncate/break/breakAll
            ellipsis: '', //在overflow配置为'truncate'的时，该属性配置末尾显示文本
            rich: {}, //自定义富文本样式
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);', //额外附加到浮层的 css 样式
        order: 'seriesAsc', //多系列提示框浮层排列顺序，seriesAsc默认/seriesDesc/valueAsc/valueDesc
    },
    legend: {
        orient: 'vertical',
        x: 'right', //可设定图例在左、右、居中
        y: 'center', //可设定图例在上、下、居中
        padding: [0, 50, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
    },
    grid: {
        show: true,
        left: '5%',
        top: '5%',
        right: '5%',
        bottom: '5%',
        backgroundColor: 'rgba(224, 17, 17, 1)',
        borderColor: 'rgba(96, 67, 67, 1)',
        containLabel: true,
    },
    // 区域缩放控制器
    dataZoom: {
        orient: 'horizontal', // 布局方式，默认为水平布局，可选为：
        // 'horizontal' ¦ 'vertical'
        // x: {number},              // 水平安放位置，默认为根据grid参数适配，可选为：
        // {number}（x坐标，单位px）
        // y: {number},              // 垂直安放位置，默认为根据grid参数适配，可选为：
        // {number}（y坐标，单位px）
        // width: {number},           // 指定宽度，横向布局时默认为根据grid参数适配
        // height: {number},          // 指定高度，纵向布局时默认为根据grid参数适配
        backgroundColor: 'rgba(0,0,0,0)', // 背景颜色
        dataBackgroundColor: '#eee', // 数据背景颜色
        fillerColor: 'rgba(144,197,237,0.2)', // 填充颜色
        handleColor: 'rgba(70,130,180,0.8)', // 手柄颜色
    },
}

