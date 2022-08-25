import VConsole from 'vconsole';
import AlloyFinger from 'alloyfinger';

import { Transform } from './transfom.mjs';

new VConsole();

// 滚动容器元素
const contentEle = document.querySelector('.content');

Transform(contentEle);

// 初始缩放比例
let initScale = 1;

new AlloyFinger(contentEle, {
    doubleTap: (evt) => {
        // 还原变形原点
        contentEle.originX = contentEle.originY = 0;
        // 还原水平垂直方向平移距离
        contentEle.translateX = contentEle.translateY = 0;

        // 还原缩放比例
        initScale = contentEle.scaleX = contentEle.scaleY = 1;
    },
    pinch: (evt) => {
        // 更新缩放比例
        contentEle.scaleX = contentEle.scaleY = Math.max(Math.min(initScale * evt.zoom, 1.8), 1);
    },

    multipointStart: (evt) => {
        // 1. 计算缩放中心点
        const scale_center_x = (evt.touches[0].pageX + evt.touches[1].pageX) / 2;
        const scale_center_y = (evt.touches[0].pageY + evt.touches[1].pageY) / 2;
        console.log('缩放中心点： %s %s', scale_center_x, scale_center_y);

        // 2. 计算滚动容器中心点
        const client_rect = contentEle.getBoundingClientRect();
        const center_x = client_rect.left + client_rect.width / 2;
        const center_y = client_rect.top + client_rect.height / 2;

        // 3. 计算缩放中心点距离滚动容器中心点的偏移量
        const offset_x = scale_center_x - center_x;
        const offset_y = scale_center_y - center_y;

        // 4. 获取上一次的偏移量
        const pre_offset_x = contentEle.originX * contentEle.scaleX;
        const pre_offset_y = contentEle.originY * contentEle.scaleY;

        // 5. 设置当前变形原点
        contentEle.originX = offset_x / contentEle.scaleX;
        contentEle.originY = offset_y / contentEle.scaleY;

        // 6. 重置滚动容器的水平垂直方向平移距离
        contentEle.translateX = offset_x - pre_offset_x + contentEle.translateX;
        contentEle.translateY = offset_y - pre_offset_y + contentEle.translateY;

        initScale = contentEle.scaleX;
    },

    pressMove: function (evt) {
        // 上下左右滑动，如果未缩放，则使用默认滚动行为
        if (initScale === 1) return;

        // 根据滚动量计算最新平移量
        contentEle.translateX += evt.deltaX;
        contentEle.translateY += evt.deltaY;

        // 阻止默认滚动行为
        evt.preventDefault();
    }
})
