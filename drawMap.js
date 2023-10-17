import proj4 from "proj4";

const sourceCrs = "EPSG:4326";

/**
EPSG:3857，也称为Web Mercator投影，使用米（meters）作为单位。这意味着在EPSG:3857坐标系统中，水平和垂直方向上的坐标值表示地球表面上的位置时，以米为单位。这与纬度（度）和经度（度）不同，它们在地理坐标系中以角度为单位表示。 EPSG:3857的平面坐标使其在在线地图和Web地图应用程序中更容易进行测量和渲染，因此它在Web地图领域中非常流行。
*/

const targetCrs = `EPSG:3857`;

// 创建坐标转换函数
const transformFunction = proj4(sourceCrs, targetCrs);

export function drawMap(geoJsonData, ctx, width, height) {
  const features = geoJsonData.features;

  const temp = features.map((feature) => {
    const geometry = feature.geometry;
    const coordinates = geometry.coordinates;
    const polygons = coordinates.map((polygon) => {
      return polygon.map((ring) => {
        return ring.map((coord) => {
          return {
            projectedPoint: transformFunction.forward(coord),
            coord,
          };
        });
      });
    });
    return polygons;
  });

  const flattened = temp.flat(3);

  const boundingCoords = calcBoundingCoords(flattened);
  const minX = boundingCoords[0][0];
  const maxX = boundingCoords[1][0];
  const minY = boundingCoords[1][1];
  const maxY = boundingCoords[0][1];

  const scaleX = width / (maxX - minX);
  const scaleY = height / (maxY - minY);

  console.log("scaleX", scaleX);
  console.log("scaleY", scaleY);

  for (const feature of temp) {
    ctx.beginPath();
    for (const polygon of feature) {
      // 绘制一个多边形
      for (const ring of polygon) {
        // 绘制一个环
        for (const geoCoordinate of ring) {
          const { projectedPoint } = geoCoordinate;
          const [x, y] = projectedPoint;
          const screenX = (x - minX) * scaleX;
          const screenY = height - (y - minY) * scaleY;

          ctx.lineTo(screenX, screenY);
        }
        ctx.closePath();
      }
      // ctx.fillStyle = "green";
      // ctx.fill();
      ctx.strokeStyle = "blue";
      ctx.stroke();
    }
    ctx.closePath();
  }
}

export const calcBoundingCoords = (coordinates) => {
  const boundingCoords = [
    [Infinity, -Infinity],
    [-Infinity, Infinity],
  ];

  coordinates.forEach(function ({ projectedPoint: coord }) {
    boundingCoords[0][0] = Math.min(boundingCoords[0][0], coord[0]);
    boundingCoords[0][1] = Math.max(boundingCoords[0][1], coord[1]);
    boundingCoords[1][0] = Math.max(boundingCoords[1][0], coord[0]);
    boundingCoords[1][1] = Math.min(boundingCoords[1][1], coord[1]);
  });

  return boundingCoords;
};
