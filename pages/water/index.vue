<template>
  <div id="wrapper">
    <header>
        <div class=" clearfix">
            <a href="#" class="logo"></a>
        </div>
    </header>
    <div id="main">
        <div id="content">
            <div class="row">
                <div class="col-md-12">
                    <ul>
                        <li class="menu">依污水廠
                        </li>
                    </ul>
                    <div id="tab" class="btn-group">
                        <water-search :datas="WastewaterArray" @query="onQuery"></water-search>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-show="morrisShow">
      <waterMorris :morrisData="morrisData"></waterMorris>
    </div>
    <div class="popup-box2 chat-popup" v-show="chartShow">
        <waterCharts :chartData="chartData" ></waterCharts>
    </div>
    <footer>
      <div id="info-bar">
          <div class="clearfix">
              <div class="row">
                  <div class="col-lg-2">
                      <img src="~static/images/footer_01.png" class="img-responsive">
                  </div>
                  <div class="col-lg-10">
                      <p>服務時間：AM8:30~PM5:30</p>
                      <p>服務熱線：(02)2754-1255#2706</p>
                      <p>網站服務信箱：jjchang1@moeaidb.gov.tw</p>
                      <p>經濟部工業局 版權所有 © 2017</p>
                  </div>
              </div>
          </div>
      </div>
    </footer>
  </div>
</template>

<script>

function WTPAndInfo(WTPID, WTPName, InParkName, Lat, Lon, WTPAddress) {
    this.WTPID = WTPID;
    this.WTPName = WTPName;
    this.InParkName = InParkName;
    this.Lat = Lat;
    this.Lon = Lon;
    this.WTPAddress = WTPAddress;
}

import waterSearch from "~/components/water/waterSearch.vue";
import waterCharts from "~/components/water/waterCharts.vue";
import waterMorris from "~/components/water/waterMorris.vue";

export default {
  components: { waterSearch, waterCharts, waterMorris },
  head() {
    return {
      title: "水資源管理資訊平台",
      link: [{ rel: "stylesheet", href: "../stylesheets/water.css" }],
      script: [
        {
          src: "//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"
        },
        { src: "//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.js" },
        { src: "../javascripts/datepicker-zh-TW.js" },
        { src: "../javascripts/echarts.min.js" },
      ]
    };
  },
  data: function() {
    return {
      IndParkArray: [],
      WastewaterArray: [],
      WTPArray: [],
      morrisShow: true,
      chartShow: false,
      morrisData: [],
      chartData: []
    };
  },
  mounted: function() {
    $.blockUI({
        overlayCSS: { backgroundColor: '#fff' },
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
    const self = this;
    $.when(self.getIndPark(), self.getWastewater())
      .then(function(v1, v2) {
        self.IndParkArray = v1.data;
        self.WastewaterArray = v2.data;
      })
      .then(function(v1, v2) {
        self.WastewaterArray.map((m, i) => {
          let InParkName = self.IndParkArray.find(function(x) {
            return x.IndParkID === m.IndParkID;
          });
          self.WTPArray.push(
            new WTPAndInfo(
              m.WTPID,
              m.WTPName.Zh_tw,
              InParkName.IndParkName.Zh_tw,
              m.Coordinate.Lat,
              m.Coordinate.Lon,
              m.WTPAddress
            )
          );
        });
      })
      .catch(function(error) {
        self.$swal({ text: "API資料錯誤", icon: "error" });
      });
    $.unblockUI();
  },
  methods: {
    getIndPark: function() {
      return this.$axios.get(
        "http://210.59.250.98/moeaidbAPI/v1/IndPark/IndPark?$format=JSON"
      );
    },
    getWastewater: function(id) {
      return this.$axios.get(
        "http://210.59.250.98/moeaidbAPI/v1/Wastewater/WTP?$format=JSON"
      );
    },
    onQuery: function(val) {
      const self = this;
      if (val.radio === "now") {
        self.chartShow = true;
        self.morrisShow = false;
        self.WTPArray.map(m => {
          if (m.WTPID == val.wtpData) self.chartData = m;
        });
      } else {
        self.morrisShow = true;
        self.chartShow = false;
        if (val.hisDate != "")
          this.$axios
            .$get(
              "http://210.59.250.98/moeaidbAPI/v1/Wastewater/CWMSMonitorData/" +
                val.wtpData +
                "?DataTime=" +
                val.hisDate +
                "&$filter=DataTypeID%20eq%20'248'&$format=JSON"
            )
            .then(function(response) {
              self.morrisData = response.slice();
            })
            .catch(function(error) {
              self.$swal({ text: "CWMSMonitorData錯誤", icon: "error" });
            });
        else self.$swal({ text: "日期尚未輸入", icon: "warning" });
      }
    }
  }
};
</script>
<style>
#line-chart {
  width: 100%;
  height: 500px;
}
.echart {
  height: 250px;
}
</style>
