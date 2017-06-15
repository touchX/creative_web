var w, h, sc, device, pagename;
var isLoaded = isMenu = isMember = false;
var view, page, side, area;
var twM = window.TweenMax;


fadeItems = "";
twM.set(fadeItems, { autoAlpha: 0 });

$(function(){
    page = {
        body: $('body')
    };
    side = {
        body: $('.side'),
        line: $('.v_line'),
        height: 244,
        navi: $('.pagenavi'),
        naviItems: $('.pagenavi li'),
        hilight: $('.current_hilight'),
        currentItems: $('.pagenavi li:eq(0)'),
        normalItems: $('.pagenavi li:not(:eq(0))')
    };

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
    };

    // **************************************************************
    //
    //   @@@
    //
    // **************************************************************
    init();
});


// **************************************************************
//
//   PRELOAD
//
// **************************************************************
var queue = new createjs.LoadQueue(true);
var manifest = [];
var nodes = document.getElementsByClassName('loadimage');

function init(){
    setSize();
};

function setSize(){
    w = window.innerWidth;
    h = window.innerHeight;

    checkDevice();
    scroll();
    console.log(w,h);
};


// **************************************************************
//
//   Device Check
//
// **************************************************************
function checkDevice(){
    device = (w <= 768) ? 'mobile' : 'pc';
    if (device === 'mobile') {
        $('body').addClass('mobile').removeClass('pc');
    } else {
        $('body').addClass('pc').removeClass('mobile');
    }
}

function scroll(){
    sc = $(window).scrollTop();
    console.log(sc);
}