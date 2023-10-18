// 导入proj4库

// 获取Canvas上下文
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.querySelector("#app").appendChild(canvas);

const width = (canvas.width = 800);
const height = (canvas.height = 600);

// 从GeoJSON文件获取数据（假设你已经获取并解析了GeoJSON文件）
import { 湖北省 } from "./assets";
import { drawMap } from "./drawMap";

// 创建线性渐变
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "lightblue"); // 开始颜色
gradient.addColorStop(1, "lightgray"); // 结束颜色

// 使用渐变色填充背景
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height); // 填充整个 Canvas 区域

const geoJsonData = 湖北省;

// 调用函数绘制地图
drawMap(geoJsonData, ctx, width, height);
