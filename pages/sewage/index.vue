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
                    <div id="tab" class="btn-group" data-toggle="buttons-radio">
                        <form class="form-inline">
                            <div class="form-group">
                                <label for="地段">污水廠:</label>
                                <select class="form-control" id="WTP">
                                </select>
                            </div>
                            <button type="submit" class="btn btn-default  hollow">
                                <a href="#" id="addClass"> 查詢</a>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- #main -->
    </div>
    <div class="popup-box chat-popup" id="qnimate">
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
                        <td id="WPT_name"></td>
                    </tr>
                    <tr class="active">
                        <td>工業區</td>
                        <td id="InParkName"></td>
                    </tr>
                    <tr>
                        <td>地址</td>
                        <td id="WTPAddress"></td>
                    </tr>
                </tbody>
                <thead>
                    <tr class="info" colspan="2">
                        <th colspan="2">污水監測放流水資訊</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>懸浮固體
                            <small>(毫克/公升)</small>
                        </td>
                        <td id="SSIn"></td>
                    </tr>
                    <tr class="active">
                        <td>化學需氧量
                            <small>(毫克/公升)</small>
                        </td>
                        <td id="CODIn"></td>
                    </tr>
                    <tr>
                        <td>氫離子濃度指標</td>
                        <td id="DataTypeID"></td>

                    </tr>
                    <tr class="active">
                        <td>電度
                            <small>（微歐姆／公分）</small>
                        </td>
                        <td id="ElectricalConductivityIn"></td>
                    </tr>
                    <tr>
                        <td>水量
                            <small>（立方公尺）</small>
                        </td>
                        <td id="WaterQuantityIn"></td>
                    </tr>
                    <tr class="active">
                        <td>水溫度
                            <small>（度Ｃ</small>
                        </td>
                        <td id="WaterTemperatureIn"></td>
                    </tr>
                    <tr class="active">
                        <td>資料監測時間</td>
                        <td id="DataTime"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="map-responsive">
        <div id="Overlay">
            <input id="OverlayWater" type="checkbox">&nbsp;&nbsp;
            <span>水污染管制區範圍圖</span>&nbsp;&nbsp;&nbsp;
            <input id="OverlayGroundwater" type="checkbox">&nbsp;&nbsp;
            <span>地下水污染管制區範圍圖</span>
        </div>
        <div id="map"></div>
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
export default {
  head() {
    return {
      title: "污水監控影像資訊平台",
      link: [{ rel: "stylesheet", href: "../stylesheets/sewage.css" }],
      script: [
        { src: "../javascripts/self.F.js" },
        { src: "../javascripts/SewageSelf.js" },
        {
          src:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDcN31bkhYDMDZyYF8V4mvyQw4LTd-Nn6Q&callback=initMap"
        }
      ]
    };
  }
};
</script>
