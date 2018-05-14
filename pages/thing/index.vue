<template>
    <div>
        <div id="main">
            <div id="content">
                <div class="row">
                    <div class="span12">
                        <ul>
                            <li class="menu">查詢模式</li>
                        </ul>
                        <div id="tab" class="btn-group" data-toggle="buttons-radio">
                            <a href="#search" class="btn btn-info" data-toggle="tab">搜尋</a>
                            <a href="#gps" class="btn btn-info" data-event="location" data-toggle="tab">定位</a>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane" id="search">
                                <div class="row">
                                    <div class="col-md-5">
                                        <ul>
                                            <li class="menu">主題項目
                                            </li>
                                        </ul>
                                        <form class="form-inline">
                                            <div class="form-group">
                                                <div id="tab" class="btn-group" data-toggle="buttons-radio">
                                                    <a href="#search" data-event="search" class="btn btn-info" data-toggle="tab">租售狀態</a>
                                                    <a href="#" data-event="water" class="btn btn-info">用水量
                                                        <small>(立方公尺/日)</small>
                                                    </a>
                                                    <a href="#" data-event="power" class="btn btn-info">用電量
                                                        <small>(千瓦/日)</small>
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div id="RentInfoButton" style="display:none;">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <ul>
                                                <li class="menu">供給類型</li>
                                            </ul>
                                            <form class="form-inline">
                                                <div class="form-group">
                                                    <div style="margin-left:20px;">
                                                        <label class="radio-inline">
                                                            <input type="radio" name="supply" id="supply1" value="1"> 土地
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="supply" id="supply2" value="2"> 廠房
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="supply" id="supply3" value="3"> 土地與廠房
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-md-5">
                                            <ul>
                                                <li class="menu">租售類型</li>
                                            </ul>
                                            <form class="form-inline">
                                                <div class="form-group">
                                                    <div style="margin-left:20px;">
                                                        <label class="radio-inline">
                                                            <input type="radio" name="renttype" id="renttype1" value="1"> 出租
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="renttype" id="renttype2" value="2"> 出售
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="renttype" id="renttype3" value="3"> 租售皆可
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-5">
                                            <ul>
                                                <li class="menu">交易狀態</li>
                                            </ul>
                                            <form class="form-inline">
                                                <div class="form-group">
                                                    <div style="margin-left:20px;">
                                                        <label class="radio-inline">
                                                            <input type="radio" name="trade_status" id="tradestatus1" value="1"> 待成交
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="trade_status" id="tradestatus2" value="2"> 已成交
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-md-5">
                                            <ul>
                                                <li class="menu">營運狀態
                                                </li>
                                            </ul>
                                            <form class="form-inline">
                                                <div class="form-group">
                                                    <div style="margin-left:20px;">
                                                        <label class="radio-inline">
                                                            <input type="radio" name="operate_status" id="operate_status1" value="1"> 正常營運
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="operate_status" id="operate_status1" value="2"> 未營運
                                                        </label>
                                                    </div>
                                                </div>
                                                <button type="button" id="rentInfo" style=" float:right" class="btn btn-default">查詢</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="gps">
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul>
                                            <li class="menu">依地籍
                                            </li>
                                        </ul>
                                        <div id="tab" class="btn-group" data-toggle="buttons-radio">
                                            <form class="form-inline">
                                                <div class="form-group">
                                                    <label for="地段">地段:</label>
                                                    <input type="地段" class="form-control" id="LandSectionName" placeholder="光復段">
                                                </div>
                                                <div class="form-group">
                                                    <label for="pwd">地號:</label>
                                                    <input type="地號" class="form-control" id="LandNumber" placeholder="145">
                                                </div>
                                                <button type="button" id="Cadastral" class="btn btn-default">定位</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- #main -->
            </div>
        </div>
        <div class="map-responsive">
            <div id="searchControl">
                工業區租售狀態
                <!--<hr size="1" style="margin:0px 0px 2px;" noshade="noshade" />-->
                <dt>
                    <img style="width:20px;" src="images/icon1.png">
                    <span id="rentinfo1"></span>
                </dt>
                <dt>
                    <img style="width:20px;" src="images/icon2.png">
                    <span id="rentinfo2"></span>
                </dt>
                <dt>
                    <img style="width:20px;" src="images/icon3.png">
                    <span id="rentinfo3"></span>
                </dt>
                <dt>
                    <img style="width:20px;" src="images/icon4.png">
                    <span id="rentinfo4"></span>
                </dt>
                <dt>
                    <img style="width:20px;" src="images/icon5.png">
                    <span id="rentinfo5"></span>
                </dt>
            </div>
            <div id="waterControl" style="width:150px">
                用水量
                <dt>
                    <div style="width:20px;height:20px;background-color: green;margin-bottom:5px;">
                        <span style="margin-left:30px;" id="pos1"></span>
                    </div>
                </dt>
                <dt>
                    <div style="width:20px;height:20px;background-color: yellow;margin-bottom:5px;">
                        <span style="margin-left:30px;" id="pos2"></span>
                    </div>
                </dt>
                <dt>
                    <div style="width:20px;height:20px;background-color: red;margin-bottom:5px;">
                        <span style="margin-left:30px;" id="pos3"></span>
                    </div>
                </dt>
            </div>
            <div id="powerControl" style="width:150px">
                用電量
                <dt>
                    <div style="width:20px;height:20px;background-color: green;margin-bottom:5px;">
                        <span style="margin-left:30px;" id="pow1"></span>
                    </div>
                </dt>
                <dt>
                    <div style="width:20px;height:20px;background-color: yellow;margin-bottom:5px;">
                        <span style="margin-left:30px;" id="pow2"></span>
                    </div>
                </dt>
                <dt>
                    <div style="width:20px;height:20px;background-color: red;margin-bottom:5px;">
                        <span style="margin-left:30px;" id="pow3"></span>
                    </div>
                </dt>
            </div>
            <div id="map"></div>
        </div>
    </div>
</template>

<script>
export default {
  head() {
    return {
      title: "工業用地物聯資訊平台",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "About our company Nuxt.js "
        }
      ],
      link: [{ rel: "stylesheet", href: "stylesheets/thing.css" }],
      script: [
        { src: "javascripts/self.F.js" },
        { src: "javascripts/thingSelf.js" },
        { src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDcN31bkhYDMDZyYF8V4mvyQw4LTd-Nn6Q&callback=initMap" },
      ]
    };
  }
};
</script>
