<template>
    <div id="container"></div>
</template>

<script>
export default {
  // props: {
  //   hotelInfo: {
  //     type: Object,
  //     default: {}
  //   }
  // },
  mounted() {
    let latitude = localStorage.getItem('loc_one')
    let longitude = localStorage.getItem('loc_two')

    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 25, //级别
        center: [longitude, latitude], //中心点坐标
      });

      var marker = new AMap.Marker({
        position: [longitude, latitude]
      })
      map.add(marker);
    };
    var url ="https://webapi.amap.com/maps?v=1.4.15&key=76d5492d2fec8caa3d2b7a9df110f6c0&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);

  }
};
</script>

<style scoped lang="less">
#container {
  width: 650px;
  height: 360px;
}
</style>