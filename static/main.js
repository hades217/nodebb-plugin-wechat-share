$(function () {
    require(['http://res.wx.qq.com/open/js/jweixin-1.1.0.js'], function (jweixin) {
        $.post('/api/wechat-sdk', { url: location.href }).done(function (config) {
            jweixin.config(config);

            var ready = function () {
                var pic = $('img[component="user/picture"]')[0];
                var title = $('.topic-title').text().trim();
                var share = {
                    url: location.href,
                    title: title,
                    imgUrl: pic && pic.src || 'http://qn-rockq1.rockq.org/FrTXlrBXKf_03tPWg6lWcDRdjHST'
                };

                var desc = $($('.content p')[0]).text();
                if (desc)
                    share.desc = desc;

                jweixin.onMenuShareTimeline(share);
                jweixin.onMenuShareAppMessage(share);
            };

            jweixin.ready(ready);

            var isAndroid = navigator.userAgent.match(/Android/i);

            $(window).on('action:topic.loaded', function () {
                console.log('loaded');

                if (isAndroid)
                    jweixin.config(config);

                jweixin.ready(ready);

            });
        });
    });
});