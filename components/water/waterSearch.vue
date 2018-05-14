<template>
  <div class="form-inline">
    <div class="col-md-12">
        <div class="form-group">
            <label for="地段">查詢水量:</label>
            <select class="form-control" v-model="select">
              <option v-for="data in datas" v-bind:key='data.WTPID' :value="data.WTPID">
                {{ data.WTPName.Zh_tw }}
                </option>
            </select>
        </div>
    </div>
   <div class="col-md-12">
        <div class="radio">
            <label>
                <input type="radio" value="now" v-model="radioValue"> 即時資料
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" value="his" v-model="radioValue"> 歷史資料
            </label>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" id="datepicker">
        </div>
        <button type="button" class="btn btn-default  hollow" v-on:click="btnSearchClick">
           查詢
        </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["datas"],
  data: function() {
    return {
      radioValue: "now",
      select: null,
    };
  },
  watch: {
    radioValue: function(val) {
      if (val === "his") $("#datepicker").css("display", "block");
      if (val === "now") $("#datepicker").css("display", "none");
    },
    datas:function(){
        this.select = this.datas[0].WTPID;
    }
  },
  methods: {
    btnSearchClick: function() {
      this.$emit("query", {
        radio: this.radioValue,
        wtpData: this.select,
        hisDate: $('#datepicker').val()
      });
    }
  },
  mounted: function() {
    $.datepicker.setDefaults( $.datepicker.regional[ "zh-TW" ] );
    $("#datepicker").datepicker({
      maxDate: '0',
      dateFormat: "yy/mm/dd"
    }).datepicker("setDate", new Date());;
  }
};
</script>

<style scoped>
  .col-md-12 {
    margin-left: 40px;
    margin-top: 10px;
  }
  #datepicker {
    display: none;
  }
</style>
