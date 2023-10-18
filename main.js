// turf
import * as turf from "@turf/turf";

// 获取Canvas上下文
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.querySelector("#app").appendChild(canvas);

const width = (canvas.width = 800);
const height = (canvas.height = 600);

// 从GeoJSON文件获取数据（假设你已经获取并解析了GeoJSON文件）
import { 湖北省 } from "./assets";
import { drawMap } from "./drawMap";

let geoJsonData = 湖北省;

const merge = (features) => {
  return features.reduce((prev, curr) => {
    if (!prev) return curr;
    const union = turf.union(prev, curr);
    return union;
  }, null);
};

const temp = geoJsonData.features.filter((feature) =>
  ["荆州市", "潜江市", "天门市", "仙桃市"].includes(feature.properties.name)
);

const temp2 = geoJsonData.features.filter(
  (feature) =>
    !["荆州市", "潜江市", "天门市", "仙桃市"].includes(feature.properties.name)
);

const properties = {
  ...temp[0].properties,
};

const mergedArea = {
  ...merge(temp),
  properties,
};

geoJsonData.features = [...temp, mergedArea];

// 调用函数绘制地图
drawMap(geoJsonData, ctx, width, height);
