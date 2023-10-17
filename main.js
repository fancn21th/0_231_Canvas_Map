// 导入proj4库

// 获取Canvas上下文
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.querySelector("#app").appendChild(canvas);

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const transX = width * 0.5;
const transY = height * 0.5;

// 从GeoJSON文件获取数据（假设你已经获取并解析了GeoJSON文件）
import { 湖北省 } from "./assets";
import { drawMap } from "./drawMap";

const geoJsonData = 湖北省;

// 调用函数绘制地图
drawMap(geoJsonData, ctx, height);
