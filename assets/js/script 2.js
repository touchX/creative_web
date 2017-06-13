var w, h, sc, device, pagename;
var isLoaded = isMenu = isMemeber = false;
var view, page, side, area;
var twM = window.TweenMax;

// **************************************************************
//
//   Device Check
//
// **************************************************************

function checkDevice() {
    device = (w <= 768) ? 'mobile' : 'pc';
    if (device === 'mobile') {
        $('body').addClass('mobile').removeClass('pc');
    } else {
        $('body').addClass('pc').removeClass('mobile');
    }
}

// **************************************************************
//
//   fitText
//
// **************************************************************

function fit() {

    if (device !== 'mobile') {
        $('.slogan .en').fitText(1.5, { maxFontSize: '65px' });
        $('.area2 h3, .area3 h3, .area4 h3').fitText(1.1, { minFontSize: '46px' });
    } else {

        $('.slogan .en').fitText(1);
        $('.area2 h3, .area3 h3, .area4 h3').fitText(0.9, { maxFontSize: '60px' });
    }
    $('.area1 .order0101').fitText(0.41, { maxFontSize: '400px' });
    $('.area1 .box_body p').fitText(2, { maxFontSize: '16px', minFontSize: '13px' });
    $('.box_set_2 .paragraf').fitText(3, { maxFontSize: '16px', minFontSize: '13px' });
}

// **************************************************************
//
//   SCROLL
//
// **************************************************************

function scroll() {

    sc = $(window).scrollTop();
    //debugger;
    view.check();

}

// **************************************************************
//
//   EFFECT
//
// **************************************************************

function marker(item) {
    debugger;
    $(item).prepend('<span class="ef_curtain"></span>');
    this.curtain = $('.ef_curtain', $(item));
    this.text = $('.ef_text', $(item));
    this.tl = new TimelineMax();
}
marker.prototype.draw = function() {
    this.tl.set(this.text, { autoAlpha: 0 })
        .set(this.curtain, { transformOrigin: '0% 50%', autoAlpha: 0.5 })
        .to(this.curtain, 0.6, { scaleX: 1, autoAlpha: 1, ease: Back.easeOut.config(1) })
        .set(this.curtain, { transformOrigin: '100% 50%' })
        .set(this.text, { autoAlpha: 1 })
        .to(this.curtain, 0.8, { scaleX: 0, ease: Quint.easeOut });
}


function fadeRtoL(item) {
    twM.staggerFromTo($(item), 0.75, { autoAlpha: 0, x: 10 }, { autoAlpha: 1, x: 0, ease: Back.easeOut }, 0.2);
}

function fadeLtoR(item) {
    twM.staggerFromTo($(item), 0.75, { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, ease: Back.easeOut }, 0.2);
}

function fadeOutRtoL(item) {
    twM.staggerTo($(item), 0.75, { autoAlpha: 0, x: -10, ease: Back.easeOut }, 0.2);
}

function fadeOutLtoR(item) {
    twM.staggerTo($(item), 0.75, { autoAlpha: 0, x: 10, ease: Back.easeOut }, 0.2);
}


// **************************************************************
//
//   Jump
//
// **************************************************************

$(document).on({
    'click': function(e) {
        e.preventDefault();
        var href = $(this).attr("href");
        var target = $(href === "#" || href === "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({ scrollTop: position }, 800, "swing");
    }
}, 'a[href^="#"]');

// **************************************************************
//
//   Navi Hover
//
// **************************************************************

$(document).on({
    'mouseenter': function(e) {

        if (device === 'pc') {
            $this = this;
            twM.to($('.nav_a_point', $this), 0.2, { autoAlpha: 0 });
            twM.to($('.nav_a_text', $this), 0.2, { autoAlpha: 1, x: 20 });
            twM.to($('.nav_a_stars', $this), 0.2, { scale: 1, rotation: 0 });
        }

    },
    'mouseleave': function(e) {

        if (device === 'pc') {
            $this = this;
            twM.to($('.nav_a_point', $this), 0.2, { autoAlpha: 0.2 });
            twM.to($('.nav_a_stars', $this), 0.2, { scale: 0, rotation: 180 });

            if (sc > 0) {
                twM.to($('.nav_a_text', $this), 0.2, { autoAlpha: 0, x: 0 });
            } else {
                twM.to($('.nav_a_text', $this), 0.2, { x: 0 });
            }
        }

    }
}, '.pagenavi li:not(.current) a');


// **************************************************************
//
//   MEMBER
//
// **************************************************************

var scrollpos;
$(document).on({
    'click': function(e) {
        e.preventDefault();
        isMemeber = true;
        scrollpos = sc;
        twM.set($('body'), { position: 'fixed', top: -scrollpos });
        twM.to('.member_container', 0.6, { y: '0%', ease: Quint.easeInOut });
        twM.to('.member_body', 0.6, { y: 0, autoAlpha: 1, ease: Quint.easeInOut, delay: 0.6 });

    }
}, '.show_members');

$(document).on({
    'click': function(e) {
        e.preventDefault();
        isMemeber = false;
        twM.set($('body'), { position: 'static', top: 0 });
        window.scrollTo(0, scrollpos);
        twM.to('.member_container', 0.6, { y: '112%', ease: Quint.easeInOut, delay: 0.3 });
        twM.to('.member_body', 0.6, { y: 20, autoAlpha: 0, ease: Quint.easeInOut });
    }
}, '.hide_members');

function memberProfile() {
    var pFt = 140;
    $('.profile').each(function(i, el) {
        var pBody = $('.profile_scroll', $(el));
        var pHH = $('.profile_head', $(el)).height() + 32;
        pBody.height(h - pHH - pFt);
        twM.set(pBody, { height: h - pHH - pFt, top: pHH });
    });
}

$('.member_slider').slick({
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    draggable: false,
    prevArrow: '<button class="slick-prev"><svg class="icon_arrow" width="22" height="18" viewBox="0 0 22 18"><use xlink:href="#svg_icon-left" /></svg></button>',
    nextArrow: '<button class="slick-next"><svg class="icon_arrow" width="22" height="18" viewBox="0 0 22 18"><use xlink:href="#svg_icon-right" /></svg></button>',
    responsive: [{
        breakpoint: 768,
        settings: { centerMode: false }
    }]
});

// **************************************************************
//
//   MENU
//
// **************************************************************

$(document).on({
    'click': function(e) {
        e.preventDefault();
        toggleMenu();
    }
}, '.mobile .show_menu');
$(document).on({
    'click': function(e) {
        if (pagename === 'home') {
            e.preventDefault();
            toggleMenu();
        }

    }
}, '.mobile .side .nav_link');

function toggleMenu() {
    if (!isMenu) {
        isMenu = true;
        $('.show_menu').addClass('on');
        twM.to('.side_overlay', 0.6, { y: '0%', ease: Quint.easeInOut });
        twM.to('.side', 0.6, { y: '0%', ease: Quint.easeInOut, delay: 0.2 });
        twM.staggerTo('.side .pagenavi a, .side .sns_links a', 0.6, { y: 0, autoAlpha: 1, ease: Quint.easeInOut }, 0.1);
    } else {
        isMenu = false;
        $('.show_menu').removeClass('on');
        twM.to('.side_overlay', 0.6, { y: '112%', ease: Quint.easeInOut, delay: 0.2 });
        twM.to('.side', 0.6, { y: '112%', ease: Quint.easeInOut });
        twM.to('.side .pagenavi a, .side .sns_links a', 0.6, { y: 20, autoAlpha: 0, ease: Quint.easeInOut, delay: 0.6 });
    }
}







// **************************************************************
//
//   SCROLL MONITOR
//
// **************************************************************

fadeItems = '.order0102, .order0202, .order0207, .order0208, .order0209, .order0205 .paragraf, .order0206 .paragraf, .order0302, .order0402';
twM.set(fadeItems, { autoAlpha: 0 });

function monitor() {

    var efBlocks = {
        watcher1: scrollMonitor.create($('.order0001'), { bottom: 300 }),
        watcher2: scrollMonitor.create($('.area2'), { bottom: 100 }),
        watcher24: scrollMonitor.create($('.order0204'), { bottom: 100 }),
        watcher25: scrollMonitor.create($('.order0205'), { bottom: 100 }),
        watcher26: scrollMonitor.create($('.order0206'), { bottom: 100 }),
        watcherT1: scrollMonitor.create($('.order0102'), { bottom: 100 }),
        watcherT2: scrollMonitor.create($('.order0202'), { bottom: 100 }),
        watcher3: scrollMonitor.create($('.area3'), { bottom: 100 }),
        watcher4: scrollMonitor.create($('.area4'), { bottom: 100 }),
        block1SHOW: function() {
            var thumb = $('.order0204 .pict .bg');
            twM.staggerTo(thumb, 0.6, { scaleX: 1, autoAlpha: 1, ease: Quint.easeInOut }, 0.1);
        },
        block2SHOW: function() {
            var tl = new TimelineMax();
            tl.to($('.order0205'), 0.8, { scaleX: 1, ease: Quint.easeInOut })
                .to($('.order0205 .figure'), 0.8, { autoAlpha: 1, ease: Quint.easeInOut }, 0.4)
                .to($('.order0205 .bg'), 0.6, { scaleX: 1, ease: Quint.easeInOut }, 0.4);
        },
        block3SHOW: function() {
            var tl = new TimelineMax();
            tl.to($('.order0206'), 0.8, { scaleX: 1, ease: Quint.easeInOut })
                .to($('.order0206 .figure'), 0.8, { autoAlpha: 1, ease: Quint.easeInOut }, 0.4)
                .to($('.order0206 .bg'), 0.6, { scaleX: 1, ease: Quint.easeInOut }, 0.4);
        }
    }

    efBlocks.watcher1.enterViewport(function() {
        fadeRtoL('.slogan');
        efBlocks.watcher1.destroy();
    });

    efBlocks.watcher2.enterViewport(function() {

        var title = $('.order0201');
        if (title.length) {
            var ef21 = new marker(title);
            ef21.draw();
        }

        efBlocks.watcher2.destroy();
    });

    efBlocks.watcher24.enterViewport(function() {
        efBlocks.block1SHOW();

        fadeRtoL('.order0207, .order0208, .order0209');
        efBlocks.watcher24.destroy();
    });

    efBlocks.watcher25.enterViewport(function() {
        efBlocks.block2SHOW();
        setTimeout(function() {
            fadeLtoR('.order0205 .paragraf');
        }, 700);
        efBlocks.watcher25.destroy();
    });

    efBlocks.watcher26.enterViewport(function() {
        efBlocks.block3SHOW();
        setTimeout(function() {
            fadeRtoL('.order0206 .paragraf');
        }, 700);
        efBlocks.watcher26.destroy();
    });

    efBlocks.watcherT1.enterViewport(function() {
        fadeRtoL('.order0102');
        efBlocks.watcherT1.destroy();
    });

    efBlocks.watcherT2.enterViewport(function() {
        fadeRtoL('.order0202');
        efBlocks.watcherT2.destroy();
    });

    efBlocks.watcher3.enterViewport(function() {
        fadeLtoR('.order0302');

        var title = $('.order0301');
        if (title.length) {
            var ef31 = new marker(title);
            ef31.draw();
        }

        efBlocks.watcher3.destroy();
    });

    efBlocks.watcher4.enterViewport(function() {
        fadeLtoR('.order0402');

        var title = $('.order0401');
        if (title.length) {
            var ef41 = new marker(title);
            ef41.draw();
        }


        twM.to($('.area4 .bg'), 0.8, { scaleX: 1, ease: Quint.easeInOut });
        twM.set('.footer', { autoAlpha: 1 });

        twM.to($('.v_line .line_point'), 0.4, { scaleX: 0, ease: Quint.easeInOut, delay: 0.8 });
        twM.fromTo($('.v_line .line_logo'), 0.8, { scale: 0, rotation: -360 }, { scale: 1, rotation: 0, ease: Quint.easeInOut, delay: 0.8 });
        efBlocks.watcher4.destroy();
    });

}


$(function() {

    // **************************************************************
    //
    //   Settings
    //
    // **************************************************************

    page = {
        body: $('body')
    }

    side = {
        body: $('.side'),
        line: $('.v_line'),
        height: 244,
        navi: $('.pagenavi'),
        naviItems: $('.pagenavi li'),
        hilight: $('.current_hilight'),
        currentItems: $('.pagenavi li:eq(0)'),
        normalItems: $('.pagenavi li:not(:eq(0))')
    }

    area = {
        current: 0,
        saveArea: 0,
        items: [],
        images: []
    };

    pagename = $('html').data('page');


    // **************************************************************
    //   Button
    // **************************************************************

    $('.button_round, .button').each(function(index, el) {
        $(el).prepend('<span class="btn_bg"></span>');
        $(el).find('.icon').clone().addClass('hov_icon').appendTo(el);
    });


    // **************************************************************
    //
    //   Area Check
    //
    // **************************************************************

    view = {

        check: function() {;

            if (isMemeber) return;

            var _this = this;

            side.currentItems = $('.pagenavi li:eq(' + area.current + ')');
            side.normalItems = $('.pagenavi li:not(:eq(' + area.current + '))');

            console.log(side.normalItems);

            for (var i = area.items.length - 1; i >= 0; i--) {

                if ((area.items[i].top - 200) <= sc) {

                    area.current = i;

                    if (area.current != area.saveArea) {

                        // save
                        area.saveArea = area.current;
                        // add 'current'
                        side.naviItems.eq(area.current).addClass('current').siblings().removeClass('current');

                        if (page.body.not('.side_open') && device !== 'mobile') {
                            // hilight
                            var moveTo = 40 * area.current;
                            twM.to(side.hilight, 0.8, { top: moveTo, ease: Back.easeInOut });
                            twM.to(side.hilight, 0.2, { height: 100, ease: Power3.easeInOut });
                            twM.to(side.hilight, 0.6, { height: 120, ease: Power1.easeInOut, delay: 0.2 });

                            side.currentItems = $('.pagenavi li:eq(' + area.current + ')');
                            side.normalItems = $('.pagenavi li:not(:eq(' + area.current + '))');

                            if (sc > 0) {
                                twM.to($('.nav_a_text', side.currentItems), 0.4, { autoAlpha: 1, x: 0, ease: Back.easeOut });
                                twM.to($('.nav_a_point', side.currentItems), 0.4, { scale: 0, x: 0, ease: Back.easeOut });
                                twM.to($('.nav_a_text', side.normalItems), 0.4, { autoAlpha: 0, x: 0, ease: Back.easeOut });
                                twM.to($('.nav_a_point', side.normalItems), 0.4, { autoAlpha: 0.2, scale: 1, x: 0, ease: Back.easeOut });
                                twM.to(side.line, 0.6, { y: -244 });
                            } else {
                                twM.to($('.nav_a_text', side.normalItems), 0.4, { autoAlpha: 1, x: 0, ease: Back.easeOut });
                                twM.to($('.nav_a_point', side.normalItems), 0.4, { scale: 0, x: 0, ease: Back.easeOut });
                                twM.to(side.line, 0.6, { y: 0 });
                            }
                            twM.to($('.nav_a_stars', side.currentItems), 0.4, { scale: 0, rotation: 180, ease: Back.easeOut });
                        }

                        _this.gate();

                    }
                    return false;
                }

                if (pagename === "home" && device !== 'mobile') _this.plx();
            }

        },
        line: function(n) {

            if (device === 'mobile') return;

            side.height = (n < 5) ? area.items[n].top : area.items[4].top + area.items[4].height;
            twM.to(side.line, 2, { height: side.height, autoAlpha: 1, ease: Circ.easeInOut });

        },
        gate: function() {

            var _this = this;

            for (var i = 0; i <= area.current; i++) {
                if (!area.items[i].visited) {
                    _this.line(i + 1);
                    area.items[i].visited = 1;
                }
            }
        },
        plx: function() {

            var _this = this;

            switch (area.current) {

                case 0:

                    // parallax "top" img
                    twM.set(area.images[0].elem, { y: sc * (area.images[0].height * 0.166) / area.items[1].top });

                    // navigation
                    if (sc > 0) {
                        page.body.removeClass('side_open');
                        twM.staggerTo($('.nav_a_text', side.normalItems), 0.4, { autoAlpha: 0, x: 20, ease: Back.easeOut }, 0.1);
                        twM.staggerTo($('.nav_a_point', side.normalItems), 0.4, { scale: 1, x: 0, ease: Back.easeOut }, 0.1);
                        twM.to(side.line, 0.6, { y: -244 });
                    } else {
                        page.body.addClass('side_open');
                        twM.staggerTo($('.nav_a_text', side.normalItems), 0.4, { autoAlpha: 1, x: 0, ease: Back.easeOut }, 0.1);
                        twM.staggerTo($('.nav_a_point', side.normalItems), 0.4, { scale: 0, x: -20, ease: Back.easeOut }, 0.1);
                        twM.to(side.line, 0.6, { y: 0 });
                    }

                    break;
                case 1:

                    // parallax "top" img
                    twM.set(area.images[0].elem, { y: sc * (area.images[0].height * 0.166) / area.items[1].top });

                    break;
                case 2:

                    // parallax "what we do" img
                    var imgTrg = sc - area.items[2].top + h;
                    if (imgTrg > area.images[1].top) {
                        twM.set(area.images[1].elem, { y: (imgTrg - area.images[1].top) * (area.images[1].height * 0.166) / (area.images[1].height + h) });
                    }
                    if (imgTrg > area.images[2].top) {
                        twM.set(area.images[2].elem, { y: (imgTrg - area.images[2].top) * (area.images[2].height * 0.166) / (area.images[2].height + h) });
                    }

                    break;

            }

        }
    }


    // **************************************************************
    //
    //   @@@
    //
    // **************************************************************

    init();

    console.trace();
});



// **************************************************************
//
//   PRELOAD
//
// **************************************************************

var queue = new createjs.LoadQueue(true);
var manifest = [];
var nodes = document.getElementsByClassName('loadimage');
if (nodes.length) {

    for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        var src = node.getAttribute('data-cover');
        manifest.push({ src: src });
    }
    queue.loadManifest(manifest, true);
    queue.addEventListener("progress", handleProgress);
    queue.addEventListener("complete", handleComplete);

    function handleProgress(e) {
        twM.to('.loader', 0.2, { scaleX: e.progress });
    }

    function handleComplete(e) {
        start();
    }

} else {
    twM.to('.loader', 0.2, {
        scaleX: 1,
        onComplete: function() {
            start();
        }
    });
}


// **************************************************************
//
//   PAGE LOADED
//
// **************************************************************

function start() {
    isLoaded = true;
    debugger;

    twM.set('.area0 .figure_box', { scaleX: 0, backgroundColor: '#c7cbd5' });
    twM.to('.loader', 1.4, { y: '-100%', ease: Power4.easeInOut });
    twM.to('.loader_blank', 1.4, { height: 0, ease: Power4.easeInOut });
    twM.to('.header .titles .logo_type', 1.2, { autoAlpha: 1, top: 5, delay: 0.2, ease: Power3.easeInOut });
    twM.to('.loader_blank .logo_type', 1.2, { autoAlpha: 0, top: 65, delay: 0.2, ease: Power3.easeInOut });

    var ef2 = new marker('.order0001'),
        ef3 = new marker('.order0002'),
        ef4 = new marker('.order0003');

    setTimeout(function() {

        view.check();
        monitor();

        ef2.draw();

        setTimeout(function() {
            ef3.draw();
        }, 200);

        setTimeout(function() {

            ef4.draw();
            twM.to('.area0 .figure_box', 0.4, {
                scaleX: 1,
                onComplete: function() {

                    twM.to('.area0 .figure_inner', 0.3, { x: 0, autoAlpha: 1 });
                }
            });

            $('.pagenavi li').eq(area.current).addClass('current');

        }, 300);


        setTimeout(function() {
            $('body').removeClass('loading').addClass('init');

        }, 800);
        //debugger;
        setTimeout(function() {

            $('body').removeClass('init');

        }, 1500);

    }, 1200);

}


// **************************************************************
//
//   INIT
//
// **************************************************************

function setSize() {
    w = window.innerWidth;
    h = window.innerHeight;

    checkDevice();
    scroll();
    memberProfile();
    fit();

    area = {
        items: [
            { class: $('.area0'), top: $('.area0').length ? $('.area0')[0].offsetTop : null, height: $('.area0').length ? $('.area0').height() : null, visited: 0 },
            { class: $('.area1'), top: $('.area1').length ? $('.area1')[0].offsetTop : null, height: $('.area1').length ? $('.area1').height() : null, visited: 0 },
            { class: $('.area2'), top: $('.area2').length ? $('.area2')[0].offsetTop : null, height: $('.area2').length ? $('.area2').height() : null, visited: 0 },
            { class: $('.area3'), top: $('.area3').length ? $('.area3')[0].offsetTop : null, height: $('.area3').length ? $('.area3').height() : null, visited: 0 },
            { class: $('.area4'), top: $('.area4').length ? $('.area4')[0].offsetTop : null, height: $('.area4').length ? $('.area4').height() : null, visited: 0 }
        ],
        images: [
            { elem: $('.area0 .figure_inner'), height: $('.area0 .figure_inner').length ? $('.area0 .figure_inner').height() : null, top: $('.area0 .figure_box').length ? $('.area0 .figure_box')[0].offsetTop : null },
            { elem: $('.for_owners .figure_inner'), height: $('.for_owners .figure_inner').length ? $('.for_owners .figure_inner').height() : null, top: $('.for_owners').length ? $('.for_owners')[0].offsetTop : null },
            { elem: $('.for_creators .figure_inner'), height: $('.for_creators .figure_inner').length ? $('.for_creators .figure_inner').height() : null, top: $('.for_creators').length ? $('.for_creators')[0].offsetTop : null }
        ]
    };

    if (device !== 'mobile') {

        twM.set('.side, .side a, .area0 .figure_box', { clearProps: 'all' });

    } else {

        twM.set('.area0 .figure_box', { clearProps: 'all' });

    }

}

function init() {
    // debugger;
    setSize();
    twM.set('.logo_type', { autoAlpha: 1, top: h / 2 });

    if (device === 'mobile') {
        page.body.addClass('side_open');
        twM.set($('.nav_a_text, .nav_a_point', side.naviItems), { autoAlpha: 1 });
    }

    if (pagename === 'home') {

        if (device !== 'mobile') {
            side.line.show();
        }

    } else {

        $('.nav_link').each(function(index, el) {
            var defaultTgt = $(el).attr('href');
            var homeURL = 'http://www.inkbottle.cn';
            $(el).attr('href', homeURL + defaultTgt);
        });

    }

    $('.profile_scroll').perfectScrollbar();

}

// **************************************************************
//
//   EVENT
//
// **************************************************************

$(window).on({
    'scroll': scroll,
    'resize': setSize
});