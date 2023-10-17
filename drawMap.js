import proj4 from "proj4";

// 定义源坐标系的字符串
const sourceCrs = "+proj=longlat +datum=WGS84 +no_defs"; // WGS 84坐标系

// 定义目标坐标系的字符串，适用于 1920x1080 像素的 Canvas
const targetCrs = `+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=960.0 +y_0=540.0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs`;

// 创建坐标转换函数
const transformFunction = proj4(sourceCrs, targetCrs);

export function drawMap(geoJsonData, ctx, canvasHeight) {
  const features = geoJsonData.features;

  for (const feature of features) {
    const geometry = feature.geometry;
    const type = geometry.type;
    const coordinates = geometry.coordinates;

    ctx.beginPath();

    if (type === "Polygon" || type === "MultiPolygon") {
      for (const polygon of coordinates) {
        for (const ring of polygon) {
          for (const geoCoordinate of ring) {
            const projectedPoint = transformFunction.forward(geoCoordinate);

            // 将 projectedPoint 映射到 Canvas 的范围内
            const scaleOut = 10000;
            const screenX = projectedPoint[0] / scaleOut;
            const screenY = canvasHeight - projectedPoint[1] / scaleOut;
            console.log(`屏幕坐标 X: ${screenX}, Y: ${screenY}`);
            ctx.lineTo(screenX, screenY);
          }
          ctx.closePath();
        }
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.strokeStyle = "blue";
        ctx.stroke();
      }
    }

    ctx.closePath();
  }
}
