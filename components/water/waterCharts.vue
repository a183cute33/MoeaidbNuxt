<template>
    <div class="popup-messages">
        <table class="table">
            <thead>
                <tr class="info" colspan="2">
                    <th colspan="2">污水廠處理廠資訊</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>污水處理廠名稱</td>
                    <td>{{chartData.WTPName}}</td>
                </tr>
                <tr class="active">
                    <td>工業區</td>
                    <td>{{chartData.InParkName}}</td>
                </tr>
                <tr>
                    <td>地址</td>
                    <td>{{chartData.WTPAddress}}</td>
                </tr>
            </tbody>
            <thead>
                <tr class="info" colspan="2">
                    <th colspan="2">污水監測放流水資訊</th>
                </tr>
            </thead>
            <tbody>
                <tr class="active">
                    <td>資料監測時間</td>
                    <td id="DataTime">{{Time}}</td>
                </tr>
            </tbody>
        </table>
        <div class="col-lg-4 col-md-4 col-xs-12 echart" id="chart_div1"></div>
        <div class="col-lg-4 col-md-4 col-xs-12 echart" id="chart_div2"></div>
        <div class="col-lg-4 col-md-4 col-xs-12 echart" id="chart_div3"></div>
        <div class="col-lg-4 col-md-4 col-xs-12 echart" id="chart_div4"></div>
        <div class="col-lg-4 col-md-4 col-xs-12 echart" id="chart_div5"></div>
        <div class="col-lg-4 col-md-4 col-xs-12 echart" id="chart_div6"></div>
    </div>
</template>
<script>
export default {
    props:['chartData'],
    data: function() {
        return {
            Time: null,
            chartArray:[],
        };
    },
    mounted:function(){
        window.addEventListener("resize", this.getWindowResize);
    },
    watch:{
         'chartData.WTPID': function(val) {
            this.tableShow = true;
            this.nowInfo(val);
        }
    },
    methods:{
        getInFactoryLimit: function(id){
              return this.$axios.get("http://210.59.250.98/moeaidbAPI/v1/Wastewater/InFactoryLimit/" +id +"?$format=JSON");
        },
        getCWMSMLatest: function(id){
              return this.$axios.get("http://210.59.250.98/moeaidbAPI/v1/Wastewater/CWMSMLatest/" +id +"?$format=JSON");
        },
        nowInfo: function(id) {
            const self = this;
            $.when( self.getInFactoryLimit(id), self.getCWMSMLatest(id) ).then(function ( v1, v2 ) {
                const c = v1.data;
                const d = v2.data;         
                self.Time =  moment(d[0].DataTime).format("YYYY-MM-DD HH:mm");
                let s = d.filter(f => f.DataTypeID == 210)[0];
                s ? self.addEchart("chart_div1", s.Value, 9999, 0, "懸浮固體") : self.addEchart("chart_div1", null, 9999, 0, "懸浮固體");
                let c243 = d.filter(f => f.DataTypeID == 243)[0];
                c243 ? self.addEchart("chart_div2", c243.Value, 9999, 0, "化學需氧量") : self.addEchart("chart_div2", null, 9999, 0, "化學需氧量");
                let h = d.filter(f => f.DataTypeID == 246)[0];
                h ? self.addEchart("chart_div3", h.Value, 14, 0, "氫離子濃度指標") :  self.addEchart("chart_div3", null, 14, 0, "氫離子濃度指標");
                let e = d.filter(f => f.DataTypeID == 247)[0];
                e ? self.addEchart("chart_div4", e.Value, 99999, 0, "導電度") : self.addEchart("chart_div4", null, 99999, 0, "導電度");
                let w = d.filter(f => f.DataTypeID == 248)[0];
                w ? self.addEchart("chart_div5", w.Value, 999999, 0, "水量") : self.addEchart("chart_div5", null, 999999, 0, "水量");
                let q = d.filter(f => f.DataTypeID == 259)[0];
                q ? self.addEchart("chart_div6", q.Value, 100, 0, "水溫度") : self.addEchart("chart_div6", null, 100, 0, "水溫度");
            });
        },
        addEchart: function(id, value, max, min, name) {
            const chart = echarts.init(document.getElementById(id));
            const option = {
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                    }
                },
                series: [{
                    name: name,
                    type: 'gauge',
                    max: max,
                    min: min,
                    splitNumber: 2,
                    precision: 0,
                    splitLine: {
                        show:false
                    },
                    detail: {
                        formatter: '{value}',
                        offsetCenter:[0,'100%'],
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: [
                                [0.25, 'lightgreen'],
                                [0.75, 'skyblue'],
                                [1, '#ff4500']
                            ],
                            width: 20
                        }
                    },
                    data: [{
                        value: value,
                        name: name
                    }]
                }]
            };
            chart.setOption(option, true);
            this.chartArray.push(chart);
        },
        getWindowResize: function() {
            this.chartArray.map(function (m) {
                m.resize();
            })
        }
    }
}
</script>