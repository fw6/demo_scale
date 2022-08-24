import VConsole from 'vconsole';
import AlloyFinger from 'alloyfinger';
// import { } from 'lodash';

import { Transform } from './transfom.mjs';

new VConsole();

const contentEle = document.querySelector('.content')

let initScale = 1;
const maxScale = 1.5;
const minScale = 1;

let scale = 1;

Transform(contentEle)

new AlloyFinger(contentEle, {
    doubleTap: function (evt) {
        // let nextScale = initScale;

        // if (scale === initScale) nextScale = maxScale
        // else if (scale > initScale && scale < maxScale) nextScale = maxScale;
        // else nextScale = initScale;

        // scale = contentEle.originX = contentEle.originX = nextScale;

        console.log(evt.targetTouches);

        // var centerX = (evt.touches[0].pageX + evt.touches[1].pageX) / 2;
        // var centerY = (evt.touches[0].pageY + evt.touches[1].pageY) / 2;

        // var cr = contentEle.getBoundingClientRect();
        // var ele_centerX = cr.left + cr.width / 2;
        // var ele_centerY = cr.top + cr.height / 2;

        // var offX = centerX - ele_centerX;
        // var offY = centerY - ele_centerY;

        // contentEle.originX = offX / contentEle.scaleX;
        // contentEle.originY = offY / contentEle.scaleY;
        contentEle.originX = contentEle.originY = 0
        contentEle.translateX = contentEle.translateY = 0;
        contentEle.scaleX = contentEle.scaleY = 1;

        console.log('doubleTap');
    },
    pinch: function (evt) {
        // scale = contentEle.originX = contentEle.originX = Math.max(initScale, Math.min(initScale * evt.zoom, maxScale));

        contentEle.scaleX = contentEle.scaleY = Math.max(initScale, Math.min(initScale * evt.zoom, maxScale));

        console.log('scalex: %s, initScale: %s', contentEle.scaleX, initScale);
    },

    multipointStart: function (evt) {
        //reset origin x and y
        var centerX = (evt.touches[0].pageX + evt.touches[1].pageX) / 2;
        var centerY = (evt.touches[0].pageY + evt.touches[1].pageY) / 2;
        console.log('centerX: %s, centerY: %s', centerX, centerY);
        var cr = contentEle.getBoundingClientRect();
        var img_centerX = cr.left + cr.width / 2;
        var img_centerY = cr.top + cr.height / 2;
        var offX = centerX - img_centerX;
        var offY = centerY - img_centerY;
        var preOriginX = contentEle.originX
        var preOriginY = contentEle.originY

        contentEle.originX = offX / contentEle.scaleX;
        contentEle.originY = offY / contentEle.scaleY;

        //reset translateX and translateY
        contentEle.translateX = Math.max(Math.min(offX - preOriginX * contentEle.scaleX + contentEle.translateY, 0), -cr.width * contentEle.scaleX - contentEle.originX * contentEle.scaleX);
        contentEle.translateY = Math.max(Math.min(offY - preOriginY * contentEle.scaleY + contentEle.translateY, 0), -cr.height * contentEle.scaleY - contentEle.originY * contentEle.scaleY);

        // initScale = contentEle.scaleX;

        // console.log('multipointStart::: initScale: %s', initScale);

        console.log('originX: %s, originY: %s', contentEle.originX, contentEle.originY);
    },

    pressMove: function (evt) {
        var cr = contentEle.getBoundingClientRect();
        console.log('originX: %s, width: %s', contentEle.originX, cr.width);

        if (contentEle.scaleX !== 1) {
            contentEle.translateX = Math.max(Math.min(evt.deltaX + contentEle.translateX, 0), -cr.width * contentEle.scaleX - contentEle.originX * contentEle.scaleX);
            contentEle.translateY = Math.max(Math.min(evt.deltaY + contentEle.translateY, 0), -cr.height * contentEle.scaleY - contentEle.originY * contentEle.scaleY);

            console.log('translateX: %s, translateY: %s', contentEle.translateX, contentEle.translateY);
            evt.preventDefault();
        } else {
            contentEle.originX = contentEle.originY = 0;
            contentEle.translateX = contentEle.translateY = 0;
            //     console.log('pressMove');
        }
    }
})
