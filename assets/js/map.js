// d3.jsonの第一引数で読み込むJsonファイルへのパス、第二引数でJsonファイル読み込み後に実行する関数を指定します。
// 第二引数の無名関数の引数として、errorとjsonを渡しています。errorにはエラー発生時のメッセージ、jsonには読み込み成功時に読み込んだJsonデータが格納されます。
d3.csv('data.csv', function(error, data){

  // Google Mapを初期化してエレメントに適用
  // 緯度経度は例えばこちらのページを参考（http://imakoko.didit.jp/imakoko_html/memo/map_to_latlang.php）
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 34.2321, lng: 135.1911 },
    zoom: 11
  });

  //ヒートマップ用のデータの作成
  var pos, heatmapData = [];
  for (var i = 0; i < data.length; i++) {
    heatmapData.push({
      location : new google.maps.LatLng(data[i].lat, data[i].lng),
      weight : 15
    });
  }

  //ヒートマップレイヤオブジェクトを作成
  var heatmap = new google.maps.visualization.HeatmapLayer({
    radius: 100,
    opacity: 0.75
  });

  // ヒートマップレイヤにヒートマップデータを適用
  heatmap.setData(heatmapData);

  // ヒートマップレイヤをMapオブジェクトに紐付けてMap上に表示
  heatmap.setMap(map);

});
