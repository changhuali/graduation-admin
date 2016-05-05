// .-----------------------------------------------------------------------------------
// | 
// | Description: 文章详情页JS
// | Date: 2015-03-04
// | Site: http://www.to8to.com
// |-----------------------------------------------------------------------------------
// | Author: carl <carl.wu@corp.to8to.com>
// | Copyright (c) 2012-2014, http://www.to8to.com. All Rights Reserved.
// |-----------------------------------------------------------------------------------
//

!(function($, window) {

    var selectShareBtn = $('#i-want-share-btn'),
        shareWrap = $('#share-wrap'),
        shareTimeout = 0;

    // 我要分享按钮mouseover下拉
    new Common.showTips({
        trigger: selectShareBtn,
        layer: shareWrap,
        onTrigger: function() {
            selectShareBtn.parent().addClass('on');
        },
        onHide: function() {
            selectShareBtn.parent().removeClass('on');
        }
    });

    var shareConfig = {
        title: document.title,
        descr: document.title,
        summary: document.title,
        pic: $('img')[0].src,
        url: location.href
    };

    // 设置分享链接
    Common.toShare('share-wrap', shareConfig);
    Common.toShare('share-wrap-line', shareConfig);

    // 设置Placeholder
    Common.initPlaceHolder($('.mod_comment_publish textarea'), $('.mod_comment_publish em'));

})(jQuery, window);