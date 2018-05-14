<template>
    <div id="line-chart">
    </div>
</template>
<script>
export default {
    props:['morrisData'],
    data: function() {
        return {
            chart: null,
        };
    },
    mounted:function(){
        window.addEventListener("resize", this.getWindowResize);
    },
    watch: {
        morrisData: function (c) {
            const datetimes = c.map(function(v) {
                return v.DataTime;
            }).filter(function(element, index, arr) {
                return arr.indexOf(element) === index;
            });
            const positionLables = c.map(function(v) {
                return v.Position.trim();
            }).filter(function(element, index, arr) {
                return arr.indexOf(element) === index;
            });
            const datas = datetimes.map(function(t) {
                const filterData = c.filter(function(v) {
                    return v.DataTime === t;
                });
                return filterData.reduce( function(prev, curr) { 
                    prev[curr.Position.trim()] = curr.Value;  return prev; }
                    ,{ time: t });
            });
            if (c.length == 0) this.$swal({icon: "warning",text:"無資料"});
            else {
                $("#line-chart").html("");
                this.chart = Morris.Line({
                    element: "line-chart",
                    data: datas,
                    xkey: "time",
                    ykeys: positionLables,
                    xLabels: "hour",
                    labels: positionLables
                });
            }
        }
    },
    methods:{ 
          getWindowResize: function() {
            this.chart.redraw();
        }
    }
}
</script>