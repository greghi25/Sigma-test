/*
Bespoke javascript

Built by Jonathan Brain
http://jonathanbrain.com
*/

var scroll_position = 0;
var animations = [];
var animations_event = false;
var controller = false;
var animate_timer = false;

// set up page and events
if ( document.fonts != null ) {
    document.fonts.ready.then(function () {
        $(document).ready(function () {
            init();
        });
    });
}
else {
    $(document).ready(function () {
        init();
    });
}


function init() {

    // Swup housekeeping
    clearInterval(animations_event);
    $(window).off('scroll resize');
    $('html').removeClass('modal-active');
    //$('.modal.active').find('.modal-close').trigger('click');

    // Initialise
    //browser_detect();

    header();
    responsive_nav();
    mobile_nav();

    anchors();

    expander();
    select_filter();

    button_icons();
    accordion();
    accordion_list();
    video_player();
    clipboard();
    carousel();
    tabbed_list();
    back();
    form_labels();
    form_file_upload();
    form_select();
    wpcf7_check_init();

    ajax_post_more();
    ajax_post_filter();

    animation_init();
    //scrollmagic_init();

    modal_activation();
    modal_form_sent_scrolldown();

    anchor_scroll();

    setTimeout( function() {$(window).trigger('scroll'); }, 1000);
    setTimeout( function() {$(window).trigger('resize'); }, 500);
}


function header() {

    // set up scroll event
    $(window).scroll( function() {

        var scroll_offset = scroll_pos();
        var header = $('#header');

        if ( scroll_offset > scroll_position && scroll_offset > 100 ) {

            // hide header
            header.addClass('header-min').removeClass('header-max');
        }
        else {
            // show header
            header.addClass('header-max').removeClass('header-min');
        }


        if ( scroll_offset < 100 ) {
            header.addClass('header-upper').removeClass('header-lower');
        }
        else {
            header.addClass('header-lower').removeClass('header-upper');
        }

        scroll_position = scroll_offset;
    }).trigger('scroll');
}

function responsive_nav() {

    // Hide mobile nav (if active)
    $('html').removeClass('nav-active');

    $('#header-nav-button')
        .click( function() {

            var html = $('html');

            if ( html.hasClass('nav-active') ) {

                // Hide nav (and show other content)
                html.removeClass('nav-active');
            }
            else {

                // Display nav (and remove other content)
                html.addClass('nav-active');
            }

            return false;
        });

    $(window).resize( function() {
        if ( $('html').hasClass('nav-active') && screen_size('desktop') ) {
            $('#header-nav-button').trigger('click');
        }
    });

}


/** get new scroll position - target is jquery element */
function get_scroll_to_position(target) {
    return $( target ).offset().top;
}


/** scroll to new page position */
function scroll_to( target_position ) {

    //get current scroll position
    var scroll_top = scroll_pos();

    //scroll
    $('html, body').stop().animate({ scrollTop: target_position }, 800, 'swing');
}

function scroll_pos() {
    return ( document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop );
}


function screen_size(size) {
    var screen_width = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
    return (screen_width.indexOf(size) != -1);
}

function anchors() {

    //console.log('anchors');

    // Scan HREFs to see if any contains "#"

    $('a[href*="#"]:not(.anchor-modal-bound)').click( function() {

        //console.log($(this).attr('href'));

        var href = $(this).attr('href');
        var id = href;

        /*
        if ( href.startsWith('#modal') && id.length > 1) {
            // Is a modal
            modal_ajax($(this), id);
            modal_form_default($(this), id);
            modal_open(id);
        }
        */

        // If url path matches current page, remove path from href
        if ( !href.startsWith('#') && id.length > 1) {

            // Convert href to anchor
            var anchor = document.createElement('a');
            anchor.href = href;

            //console.log(window.location.pathname + ' ... ' + anchor.pathname);

            // Compare url path with anchor path
            if ( window.location.pathname == anchor.pathname ) {

                var href_split = href.split('#');
                id = '#' + href_split[href_split.length-1];
            }
        }

        //console.log(id);

        if ( id.length > 1 && id.startsWith('#') && $(id).length === 1 ) {

            if ( id.startsWith('#modal') ) {

                //console.log('is modal');

                // Is a modal
                modal_ajax($(this), id);
                modal_form_default($(this), id);
                modal_open(id);
            }
            else {

                //console.log('is anchor');

                // Is an anchor
                // Work out offset
                let offset = get_scroll_to_position(id);

                // Allow for persistent nav
                offset = offset - $('#header').height() + 1;

                // Close nav (if open)
                $('html').removeClass('nav-active');

                //console.log('from this page: '  + offset);

                // Scroll to anchor
                scroll_to(offset);
            }

            return false;
        }
    })
    .each( function() {
        $(this).addClass('anchor-modal-bound');
    });



    // Modal functions
    $('.modal-close').click( function() {

        var modal_parent = $(this).closest('.modal');
        modal_parent.removeClass('active');
        $('html').removeClass('modal-active');

        // Close video (by removing it)
        if ( modal_parent.hasClass('modal-video') ) {

            const video = modal_parent.find('.video-youtube,.video-vimeo');

            const id = video.attr('id');
            const video_class = video.attr('class');
            const video_id = video.attr('data-video-id');

            video.replaceWith('<div id="' + id + '" class="' + video_class + '" data-video-id="' + video_id + '" />');
        }

        // Option to remove content
        if ( modal_parent.hasClass('modal-clear-on-close') ) {
            modal_parent.find('.modal-scroll').empty();
        }

        //return false;
    });

    // Add extra classes to video modals
    $('.modal-video').each( function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').addClass('button-video');
    });


}


function modal_open(id) {

    // Close any open modals
    $('.modal.active .modal-close').trigger('click');

    // Wait for modal to have content, before displaying
    var modal_interval = setInterval(
        function(id) {

        if ( $(id).find('.modal-scroll').html() != '' ) {

            // Open new modal
            $(id).addClass('active');
            $('html').addClass('modal-active');

            if ( $(id).hasClass('modal-video') ) {

                if ( $(id).find('.video-youtube').length > 0 ) {
                    youtube_init_play($(id).find('.video-youtube'));
                }
                else if ( $(id).find('.video-vimeo').length > 0 ) {
                    vimeo_init_play($(id).find('.video-vimeo'));
                }
            }

            clearInterval(modal_interval);
        }
    },
    200, id);

}

function modal_form_default(a, modal_id) {

    // Check for any field defaults
    if ( a.data('match-value') != undefined ) {

        var value = a.data('match-value');
        var fields_select   = $(modal_id).find('form select');
        var fields_radio    = $(modal_id).find('form input[type="radio"]');
        var fields_checkbox = $(modal_id).find('form input[type="checkbox"]');

        if ( a.data('match-name').length > 0 ) {
            var name = a.data('match-name');
            fields_select   = $(modal_id).find('form select[name="' + name + '"]');
            fields_radio    = $(modal_id).find('form input[type="radio"][name="' + name + '"]');
            fields_checkbox = $(modal_id).find('form input[type="checkbox"][name="' + name + '"]');
        }

        fields_select.each(function() {
            if ( $(this).find('option[value="' + value + '"]').length > 0 ) {
                $(this).find('option[value="' + value + '"]').prop('selected',true);
                $(this).trigger('focus').trigger('blur');
            }
        });

        fields_radio.each(function() {
            if ( $(this).val() == value ) {
                $(this).prop('checked',true).trigger('focus').trigger('blur');
            }
        });

        fields_checkbox.each(function() {
            if ( $(this).val() == value ) {
                $(this).prop('checked',true).trigger('focus').trigger('blur');
            }
        });
    }
}


function modal_ajax(a, modal_id) {

    // Load modal content from a specific page
    if ( a.data('modal-id') ) {

        var post_id = a.data('modal-id');

        $.ajax({
            type: 'GET',
            url: bespoke_wp.bespoke_modal_search,
            data: 'id=' + post_id,
            dataType: 'html',
            cache: false,
            contentType: false,
            processData: false,
        })
        .done(function (data) {
            //console.log('Search done: ' + data);

            // Add content to modal
            $(modal_id).find('.modal-scroll').empty().append(data);

            // Initialise CF7 form
            document
                .querySelectorAll(modal_id + ' .wpcf7 form')
                .forEach((
                    function(e){
                        return wpcf7.init(e)
                    }
                )
            );

            // Bind focus and blur events to form
            form_labels(modal_id);

        })
        .fail(function (data) {
            console.log('Search fail: ' + data);
        });

    }
}


function animation_init() {

    // Reset animations array - in case we're using Barba
    animations = [];

    // get all animation items and store them in an array
    // we'll animate them when they appear on screen (upon scroll)
    animation_positions();

    // initialise states of animated items
    animation_init_increment();

    //set interval
    if ( animations.length > 0 ) {
        setTimeout( function() { animations_event = setInterval( function() { animate(); }, 20 ); }, 100 );
    }

    // scroll event
    $(window).scroll( function() {
        animation_status();
    }).trigger('scroll');

}


function animation_positions() {

    // get all animation items and store them in an array
    // we'll animate them when they appear on screen (upon scroll)
    $('.animation-scroll-trigger').each(function (index) {

        var offset = $(this).offset();

        if (animations[index]) {
            animations[index].top = Math.floor(offset.top);
        }
        else {
            animations[index] = {
                'top': Math.floor(offset.top),
                'status': 'waiting'
            };
        }

        $(this).attr('data-animation-id', index);
    });


    // Slightly different routine to re-calculate positions after resize
    $(window).resize( function() {

        //console.log('RESIZE');

        $('.animation-scroll-trigger[data-animation-id]').each(function () {

            var id = parseInt($(this).attr('data-animation-id'));
            var offset = $(this).offset();
            animations[id].top = Math.floor(offset.top);

            //console.log(id + ' - ' + animations[id].top + ' - ' + animations[id].status);
        });

    });

}


function animation_status() {

    var threshold = Math.floor(scroll_pos() + ( $(window).height() * 0.75 ));

    for ( i = 0; i < animations.length; i++ ) {

        if (threshold > animations[i].top && animations[i].status !== 'complete' ) {
            animations[i].status = 'active';
        }
    }

}


function animate() {

    for ( i = 0; i < animations.length; i++ ) {

        if ( animations[i].status === 'active' ) {

            var element = $('[data-animation-id="' + i + '"]');

            //console.log(i+': '+animations[i].status);

            // banner
            if ( element.hasClass('animation-fade-in') ) {

                element.addClass('animation-fade-in-action');
                animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-slide-up') ) {

                element.addClass('animation-slide-up-action');
                animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-staggered-slide-up') ) {

                element.addClass('animation-staggered-slide-up-action');
                animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-slide-left') ) {

                element.addClass('animation-slide-left-action');
                animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-slide-right') ) {

                element.addClass('animation-slide-right-action');
                animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-multiple') ) {

                element.addClass('animation-multiple-action');
                animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-scale-up') ) {

                element.addClass('animation-scale-up-action');
                animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-scale-in') ) {

                element.addClass('animation-scale-in-action');
                animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-timeline') ) {

                element.addClass('animation-timeline-action');

                element.find('.animation-timeline-target').each(function(index) {
                    var delay = index*1000;
                    var elem = element.find('.animation-timeline-target');
                    setTimeout( timeline_class, delay, $(this), 1); // Dot filled
                    setTimeout( timeline_class, delay, $(this), 2); // Text slide in
                    setTimeout( timeline_class, delay + 600, $(this), 3); // Draw line
                    setTimeout( timeline_class, delay + 1200, $(this), 4); // Dot outline
                });

                animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-increment') ) {

                var target_element = element.find('.animation-increment-target');
                var target_number = parseFloat(target_element.attr('data-animation-increment-target'));
                var current_number = parseFloat(target_element.attr('data-animation-increment-current'));
                var decimal_places = parseFloat(target_element.attr('data-animation-increment-places'));

                if ( target_number !== '' ) {

                    target_element.parent().addClass('active');
                    element.addClass('animation-increment-action');

                    var target_step = parseFloat(target_element.attr('data-animation-increment-step'));

                    if ( (target_step > 0 && current_number < target_number) || (target_step < 0 && current_number > target_number) ) {
                        current_number = current_number + target_step;
                        target_element.attr('data-animation-increment-current', current_number );
                        //target_element.text(set_to_decimal_places(numberWithCommas(current_number), decimal_places));
                        target_element.text(numberWithCommas(current_number, decimal_places));
                    }
                    else {
                        //target_element.text(set_to_decimal_places(numberWithCommas(target_number), decimal_places));
                        target_element.text(numberWithCommas(target_number, decimal_places));
                        target_element.parent().removeClass('active').addClass('complete');
                        animations[i].status = 'complete';
                    }

                }
                else {
                    target_element.parent().removeClass('active').addClass('complete');
                    animations[i].status = 'complete';
                }
            }
            else if ( element.hasClass('animation-spin') ) {

                var deg = ((scroll_pos() /10) % 360);
                element.css('transform', 'rotate(' + deg + 'deg)');

                // never completes
                //animations[i].status = 'complete';
            }
            else if ( element.hasClass('animation-stat-spinner') ) {

                var inner_element = element.find('.stat-spinner-inner');
                var target_element = element.find('.stat-spinner-target');
                var target_position = target_element.position();
                var element_index = element.index();

                inner_element
                    .css({
                    'transform': 'translateY(-' + target_position.top + 'px)',
                    'transition-delay': (element_index*0.2) + 's'
                });


                setTimeout(
                    stat_spin_complete,
                    4000,
                    inner_element,
                    target_element.text()
                );

                animations[i].status = 'complete';
            }
            else {
                // no associated animation
                animations[i].status = 'complete';
            }
        }
    }
}


function animation_add_new() {

    // get all animation items and store them in an array
    // we'll animate them when they appear on screen (upon scroll)

    var anim_index = animations.length;

    $('.animation-scroll-trigger:not([data-animation-id])').each(function (index) {

        var offset = $(this).offset();

        if (animations[anim_index + index]) {
            animations[anim_index + index].top = Math.floor(offset.top);
        }
        else {
            animations[anim_index + index] = {
                'top': Math.floor(offset.top),
                'status': 'waiting'
            };
        }

        $(this).attr('data-animation-id', anim_index + index);
    }).trigger('scroll');

}


function stat_spin_complete( elem, stat ) {

    //alert(stat);

    elem
        .html(stat)
        .css({
            'transition': 'none',
            'transform': 'translateY(0)',
            'transition-delay': '0'
        });
}


function animation_init_increment() {

    // initialise
    $('.animation-increment').each( function() {
        var target = $(this).find('.animation-increment-target');
        var stat_start = parseFloat(target.attr('data-value-start'));
        var stat_end = parseFloat(target.attr('data-value-end'));
        var step = Math.abs(stat_start - stat_end)/100;
        if ( stat_start > stat_end ) {
            step = (step * -1);
        }
        if ( $.isNumeric(stat_end) ) {
            target.attr({'data-animation-increment-target': stat_end, 'data-animation-increment-step': step, 'data-animation-increment-current': stat_start , 'data-animation-increment-places': get_number_of_decimal_places(stat_end) }).html(animation_increment_split(target, stat_start));
        }
        else {
            target.attr('data-animation-increment-target', '');
        }
    });
}

// Split number across existing spans
function animation_increment_split(elem, number) {

    var number_split = number.toString().split('');

    elem.find('span').each( function(index) {

        $(this).text('');
        if ( $.isNumeric(number_split[index]) ) {
            $(this).text(number_split[index]);
        }
    });
}


function get_number_of_decimal_places(number) {
    var output = number.toString().lastIndexOf('.');

    if ( output == -1 ) {
        output = 0;
    }
    else {
        output = number.toString().substring(output).length -1;
    }

    return output;
}

/*
function set_to_decimal_places(number, decimal_places) {
    var output = number;
    var parts = number.toString().split('.');
    if ( decimal_places == 0 ) {
        output = parts[0];
    }
    else if ( decimal_places > 0 || parts[1] !== undefined ) {
        parts[1] = parts[1].substring(0, decimal_places);
        output = parts.join('.');
    }

    return output;
}
*/


function numberWithCommas(number, decimal_places) {

    let locale = $('head meta[property="og:locale"]').attr('content');
    if ( !locale ) {
        locale = 'en_GB';
    }

    locale = locale.replace('_','-');

    const options = {
        style: 'decimal',
        minimumFractionDigits: decimal_places,
        maximumFractionDigits: decimal_places,
    };

    return number.toLocaleString(locale, options);

}


function timeline_class( elem, step ) {
    elem.addClass('animation-step-' + step);
}


function ajax_post_more() {

    $('.ajax-more a').click(function () {

        var parent = $(this).closest('.ajax-more-parent'); // Main content block to capture
        var target = parent.find('.ajax-more-target'); // List to add the new articles to
        var url = $(this).attr('href') + ' #' + parent.attr('id');

        //console.log(url);


        // display loader
        parent.find('.ajax-more a').css('opacity', '0');
        parent.find('.ajax-more').append('<span class="popper" />');

        // create temporary element to store loaded data into
        $('#ajax-more-temp').remove();
        $('body').append('<div id="ajax-more-temp" />');
        var temp = $('#ajax-more-temp');
        temp.hide();

        // request new page from server
        temp
            .load(
                url,
                function() {

                    // Replace or remove "more" button
                    if ( temp.find('.ajax-more').length > 0 ) {
                        parent.find('.ajax-more').replaceWith(temp.find('.ajax-more'));
                    }
                    else {
                        parent.find('.ajax-more').remove();
                    }

                    // Add new content to display
                    if ( temp.find('.ajax-more-content').length > 0 ) {
                        target.append(temp.find('.ajax-more-content'));
                    }

                    // Remove temp
                    temp.remove();

                    // bind any "show more" button
                    ajax_post_more();

                    // Bind anchors on new posts
                    //anchors();

                    //trigger resize (to recalculate any animation positions below the article list)
                    $(window).trigger('resize');

                });

        return false;
    });

}



function ajax_post_filter() {

    $('.ajax-filter').click(function () {

        if ( $(this).hasClass('active') ) {
            return false;
        }

        var parent = $(this).closest('.ajax-filter-parent'); // Main content block to capture
        var target = parent.find('.ajax-filter-target'); // List to add the new articles to
        var url = $(this).attr('href') + ' #' + parent.attr('id');

        // Swap link
        $(this).closest('ul').find('.active').removeClass('active');
        $(this).addClass('active');


        //console.log(url);


        // display loader
        target.append('<div class="popper" />');
        target.addClass('loading');


        // create temporary element to store loaded data into
        $('#ajax-filter-temp').remove();
        $('body').append('<div id="ajax-filter-temp" />');
        var temp = $('#ajax-filter-temp');
        temp.hide();

        // request new page from server
        temp
            .load(
                url,
                function() {

                    // Get content
                    if ( temp.find('.ajax-filter-target').length > 0  ) {
                        parent.find('.ajax-filter-target').replaceWith(temp.find('.ajax-filter-target'));
                    }


                    // Remove temp
                    temp.remove();

                    // bind any filter and "load more" buttons
                    ajax_post_more();
                    ajax_post_filter();

                    // Bind anchors on new posts
                    //anchors();

                    //trigger resize (to recalculate any animation positions below the article list)
                    $(window).trigger('resize');

                });

        return false;
    });

}



function accordion() {

    // Accordion
    $('.accordion-button').click( function() {

        let parent = $(this).closest('.accordion-parent');

        if ( parent.hasClass('open') ) {
            parent.removeClass('open').find('.accordion-content').slideUp(500);
        }
        else {
            parent.addClass('open').find('.accordion-content').slideDown(500);
        }

        return false;
    });

    $('.accordion-content').slideUp(0);

}



function accordion_list() {

    // Accordion
    $('.section-list.style-accordeon .title-wrapper').click( function() {
        $(this).toggleClass("opened");
        $(this).next().slideToggle();
    });

}


function video_player() {

    // YouTube
    if ( $('.video-youtube').length > 0 ) {

        // Add YouTube script to <head></head>
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    //Vimeo
    if ( $('.video-vimeo').length > 0 ) {

        // Add Vimeo script to <head></head>
        loadScript('https://player.vimeo.com/api/player.js')
            .then(() => {
                onVimeoAPIReady();
            })
            .catch(() => {
                console.error('Script loading failed.');
            });
    }

}


function onYouTubeIframeAPIReady() {

    $('.video-play[data-video-service="youtube"]').click( function() {

        youtube_init_play($(this));

        return false;
    });

}

function youtube_init_play(elem) {

    var parent  = elem.closest('.video-parent');
    var video   = parent.find('.video-youtube');

    youtube_player = new YT.Player(video.attr('id'), {
        height: '780',
        width: '1280',
        videoId: video.attr('data-video-id'),
        playerVars: {
            'rel': 0,
            'showinfo': 0,
            'autoplay': 0
        },
        events: {
            'onReady': onYouTubePlayerReady
        }
    });

    parent.addClass('video-active');
}

function onYouTubePlayerReady(event) {
    event.target.playVideo();
}


function onVimeoAPIReady() {

    $('.video-play[data-video-service="vimeo"]').click( function() {

        vimeo_init_play($(this));

        return false;
    });

}


function vimeo_init_play(elem) {

    var parent  = elem.closest('.video-parent');
    var video   = parent.find('.video-vimeo');

    var player = new Vimeo.Player(video.attr('id'), {
        id: video.attr('data-video-id'),
        width: '1280'
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

    player.play();

    parent.addClass('video-active');
}


function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);

    return new Promise((res, rej) => {
        script.onload = function() {
            res();
        };
        script.onerror = function () {
            rej();
        };
    });
}


function clipboard() {
    $('.url-to-clipboard').click(function() {
        let text = $(this).attr('href');

        const element = document.querySelector('body');
        const storage = document.createElement('textarea');
        storage.style = 'position: relative; width: 0; height: 0; overflow: hidden;';
        storage.value = text;
        element.appendChild(storage);

        // Copy the text in the temp input, and then remove the temp input
        storage.select();
        storage.setSelectionRange(0, 99999);
        document.execCommand('copy');
        element.removeChild(storage);

        return false;
    });
}


function carousel() {

    // Text
    $('.swiper-text').each(function() {

        let id = '#' + $(this).closest('section').attr('id');
        //$(this).addClass('swiper-slide-count-' + $(this).find('.swiper-slide').length);
        const swiper_images = new Swiper(id + ' .swiper-text', {
            speed: 600,
            scrollbar: {
                el: id + ' .swiper-scrollbar',
                draggable: true
            },
            grabCursor: true,
            freeMode: {
                enabled: true,
                sticky: true
            },
            slidesPerView: 'auto',
            mousewheel: {
                forceToAxis: true
            },
            //autoHeight: true,
            //loop: true,
            centeredSlides: true,
            centeredSlidesBounds: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }
        });
    });


    // Timeline
    $('.swiper-timeline').each(function() {

        let id = '#' + $(this).closest('section').attr('id');
        //$(this).addClass('swiper-slide-count-' + $(this).find('.swiper-slide').length);
        const swiper_timeline = new Swiper(id + ' .swiper-timeline', {
            speed: 600,
            grabCursor: true,
            slidesPerView: 1,
            mousewheel: {
                forceToAxis: true
            },
            pagination: {
                el: id + ' .swiper-pagination',
                clickable: true
            },
            autoHeight: false,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }
        });

        // Re-trigger animation by removing and re-adding slide content
        swiper_timeline.on('slideChangeTransitionStart', function () {
            var swiper = $(swiper_timeline.el);
            var slide = swiper.find('.section-timeline-slide.swiper-slide-active');
            var clone = slide.find('.section-timeline-slide-list').clone();
            slide.find('.section-timeline-slide-list').remove();
            slide.append(clone);
        });
    });


    // Image gallery
    $('.swiper-images').each(function() {

        let id = '#' + $(this).closest('section').attr('id');
        //$(this).addClass('swiper-slide-count-' + $(this).find('.swiper-slide').length);
        const swiper_images = new Swiper(id + ' .swiper-images', {
            speed: 600,
            scrollbar: {
                el: id + ' .swiper-scrollbar',
                draggable: true
            },
            grabCursor: true,
            freeMode: {
                enabled: true,
                sticky: true
            },
            slidesPerView: 'auto',
            mousewheel: {
                forceToAxis: true
            },
            //autoHeight: true,
            //loop: true,
            centeredSlides: true,
            centeredSlidesBounds: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }
        });
    });



    // Articles
    $('.swiper-articles').each(function() {

        let swiper_articles;
        let id = '#' + $(this).closest('section').attr('id');

        if ($(id + ' .swiper-slide').length > 1) {

            const breakpoint = window.matchMedia('(min-width:900px)');
            const articles_breakpointChecker = function () {

                // if larger viewport and multi-row layout needed
                if (breakpoint.matches === true) {

                    // clean up old instances and inline styles when available
                    if (swiper_articles !== undefined) {
                        swiper_articles.destroy(true, true);
                    }
                }
                else if (breakpoint.matches === false) {

                    // Initialise swiper
                    swiper_articles = new Swiper(id + ' .swiper-articles', {
                        speed: 600,
                        grabCursor: true,
                        slidesPerView: 1,
                        mousewheel: {
                            forceToAxis: true
                        },
                        pagination: {
                            el: id + ' .swiper-pagination',
                            clickable: true
                        },
                        autoplay: {
                            delay: 6000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }
                    });
                }

                return swiper_articles;
            };

            // keep an eye on viewport size changes
            breakpoint.addListener(articles_breakpointChecker);

            // kickstart
            articles_breakpointChecker();
        }
    });


/*
    $('.swiper-articles').each(function() {

        let id = '#' + $(this).closest('section').attr('id');
        //$(this).addClass('swiper-slide-count-' + $(this).find('.swiper-slide').length);
        if ( $(this).find('.swiper-slide').length > 1 ) {
            const swiper_articles = new Swiper(id + ' .swiper-articles', {
                speed: 600,
                grabCursor: true,
                slidesPerView: 1,
                mousewheel: {
                    forceToAxis: true
                },
                pagination: {
                    el: id + ' .swiper-pagination',
                    clickable: true
                },
                //autoHeight: true,
                //breakpoints: {
                //    900: {
                //        enabled: false
                //    }
                //}
            });
        }
    });
*/

    // Banner
    $('.swiper-banner').each(function() {

        let id = '#' + $(this).closest('section').attr('id');
        //$(this).addClass('swiper-slide-count-' + $(this).find('.swiper-slide').length);
        const swiper_banner = new Swiper(id + ' .swiper-banner', {
            speed: 400,
            grabCursor: true,
            slidesPerView: '1',
            loop: true,
            mousewheel: {
                forceToAxis: true
            },
            autoHeight: false,
            navigation: {
                nextEl: id + ' .swiper-banner-next',
                prevEl: id + ' .swiper-banner-prev'

            },
            pagination: {
                el: id + ' .swiper-pagination',
                clickable: true
            },
            breakpoints: {
                900: {
                    slidesPerView: 'auto'
                }
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }
        });
    });


    // Logos
    $('.swiper-logos').each(function() {

        let id = '#' + $(this).closest('section').attr('id');
        //$(this).addClass('swiper-slide-count-' + $(this).find('.swiper-slide').length);
        const swiper_logos = new Swiper(id + ' .swiper-logos', {
            speed: 600,
            grabCursor: true,
            slidesPerView: 1,
            mousewheel: {
                forceToAxis: true
            },
            pagination: {
                el: id + ' .swiper-pagination',
                clickable: true
            },
            autoHeight: true
        });
    });
}



function pills() {

    $('.pills-button').click( function() {

        var parent = $(this).closest('.pills-parent');
        var index = $(this).index() + 1;

        parent.find('.pills-content:visible').hide();
        parent.find('.pills-content:nth-child(' + index + ')').show();

        parent.find('.active').removeClass('active');
        $(this).addClass('active');

    });

    $('.pills-button:first-child').trigger('click');
}



function scrollmagic_init() {

    if ( !$('html').hasClass('fallback') ) {

        // Make sure each parent has an ID
        var animation_count = 0;
        $('.animation-parent').each(function () {
            if ($(this).attr('id') == null) {
                animation_count++;
                $(this).attr('id', 'animation-' + animation_count);
            }
        });

        // Initialise animations
        scrollmagic_create();

        // Create throttle for window resize
        $(window).resize(function () {

            clearTimeout(animate_timer);
            animate_timer = setTimeout(scrollmagic_reset, 500);
        });
    }
}


function scrollmagic_create() {

    var window_width = $(window).width();

    controller = new ScrollMagic.Controller();

    if ( window_width > 900 ) {
        $('html').addClass('animate');

        scrollmagic_create_steps(controller);
    }
    else {
        $('html').removeClass('animate');
        $(window).trigger('resize');
    }

}

function scrollmagic_reset() {

    // Destroy controllers & reinitialise

    controller.destroy(true);

    scrollmagic_reset_steps();

    scrollmagic_create();
}

function scrollmagic_create_steps(controller) {

    var window_width = parseInt($(window).width());

    // Animate each row section
    $('.section-steps').each(function(section_index) {

        var section_id = $(this).attr('id');

        // Animate each row
        var offset = 0;
        $(this).find('.section-steps-item').each(function(row_index) {

            var row_id = $(this).attr('id');

            offset = $(this).position().top;

            // Get sizes based on Window
            var tween_perspective = window_width; // 1920
            var tween_transform_y = window_width/6.4; // 300
            var tween_duration = window_width/3.84; // 500
            var tween_offset = window_width/38.4; // 50

            //console.log(tween_perspective,tween_transform_y, tween_duration, tween_offset);

            // Pin & resize rows
            var sceneX = new ScrollMagic.Scene({
                triggerElement: '#' + section_id,
                duration: 0,
                offset: offset,
                triggerHook: 0.02
            })
            .setPin('#' + row_id)
            //.addIndicators({name: row_index + ' - pin'})
            .addTo(controller);



            // Hide section after it's been scrolled past
            var tween = TweenMax.staggerFromTo('#' + row_id, 1, {opacity: '1', transform: 'perspective(' + tween_perspective + 'px) translate3d(0,0,0) rotate3d(0,0,0,0)'}, {opacity: '0', transform: 'perspective(' + tween_perspective + 'px) translate3d(0,-' + tween_transform_y + 'px,0) rotate3d(1,0,0,-45deg)', ease: 'sine.in'});
            var sceneY = new ScrollMagic.Scene({
                triggerElement: '#' + row_id,
                duration: tween_duration,
                offset: tween_offset,
                triggerHook: 0
            })
            .setTween(tween)
            //.addIndicators({name: 'section - add a class'})
            .addTo(controller);

        });
    });
}

function scrollmagic_reset_steps() {

    /*
    $('.section-steps-item').each(function() {

        // Reset CSS top
        $(this).css('top', 'auto');
    });
    */
}


function browser_detect() {

    var isSafari =
        navigator.vendor &&
        navigator.vendor.indexOf('Apple') > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf('CriOS') == -1 &&
        navigator.userAgent.indexOf('FxiOS') == -1;

    if ( isSafari ) {
        $('html').addClass('fallback');
    }
}


function expander() {

    $('.section-expander-item').mouseenter(function () {

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    $('.section-expander-item:first-child').addClass('active');
}


function select_filter() {

    $('.section-people select')
        .change(function() {

            var teams = $(this).closest('.section-people').find('.section-people-teams');
            var selection = $(this).val();

            // Show selected team
            teams.find('.section-people-team').css('display', 'none');
            teams.find('.section-people-team[data-team-index="' + selection + '"]').css('display', 'flex');

        });


    /*
    $('.select-button')
        .click(function() {
            var parent = $(this).closest('.select-container');
            if ( parent.hasClass('active') ) {
                select_filter_close(parent);
            }
            else {
                select_filter_open(parent);
            }
        })
        .focus( function() {
            let parent = $(this).closest('.select-container');
            parent.addClass('button-focus');
        })
        .blur(function() {
            let parent = $(this).closest('.select-container');
            parent.removeClass('button-focus');
            setTimeout( select_filter_blur, 100, parent);
        });

    $('.select-list button')
        .click(function() {
            var parent = $(this).closest('.select-container');
            var selection = $(this).val();
            parent.find('.select-button').text(selection);

            // Show selected team
            var index = $(this).parent().index();
            var teams = $(this).closest('.section-people').find('.section-people-teams');
            teams.find('.section-people-team').css('display', 'none');
            teams.find('.section-people-team:nth-child(' + (index+1) + ')').css('display', 'flex');

            select_filter_close(parent);

            $(window).trigger('resize');
        })
        .focus( function() {
            let parent = $(this).closest('.select-container');
            parent.addClass('list-focus');
        })
        .blur(function() {
            let parent = $(this).closest('.select-container');
            parent.removeClass('list-focus');
            setTimeout( select_filter_blur, 100, parent);
        });


    function select_filter_open(el) {
        el.addClass('active');
    }

    function select_filter_close(el) {
        el.removeClass('active');
    }

    function select_filter_blur(el) {
        if ( el.hasClass('active') && !(el.hasClass('button-focus') || el.hasClass('list-focus')) ) {
            select_filter_close(el);
        }
    }

    */
}


function back() {

    $('.back').click(function() {
        history.back();

        return false;
    });
}


function form_labels(id = '') {

    // Deal with optional namespace ID
    if (id !== '') {
        id = id + ' ';
    }

    $(id + '.wpcf7 form input, ' + id + '.wpcf7 form textarea, ' + id + '.wpcf7 form select').focus(function () {
        $(this).closest('label').addClass('focus');
    });

    $(id + '.wpcf7 form input, ' + id + '.wpcf7 form textarea, ' + id + '.wpcf7 form select').blur(function () {
        if ($(this).val() == '') {
            $(this).closest('label').removeClass('focus');
        }
    });

    /*
    $('.wpcf7 form input, .wpcf7 form select').each(function() {
        if ( $(this).val() == '' ) {
            $(this).closest('label').addClass('blur');
        }
    });
    */

    $(id + '.wpcf7 form input, ' + id + '.wpcf7 form textarea, ' + id + '.wpcf7 form select').trigger('blur');

}


function form_file_upload() {

    $('input[type="file"]').each( function() {
        $(this).after('<span class="file-upload-name">&nbsp;</span>');
    });

    $('input[type="file"]').change( function() {

        var parent = $(this).parent();

        if ( $(this).val == '' ) {
            parent.find('.file-upload-name').text('');
        }
        else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
            parent.find('.file-upload-name').text(filename);
        }

    });

}



function tabbed_list() {

    $('.section-tabs .section-tabs-heading').click(function () {

        var tab = $(this);
        var parent = tab.closest('.section-tabs');
        var content = parent.find('.section-tabs-content');
        var index = tab.index();

        tab
            .siblings()
            .removeClass('active');

        tab
            .addClass('active');

        content
            .find('.section-tabs-content-inner:nth-child(' + (index+1) + ')')
            .addClass('active')
            .find('.section-tabs-content-wrapper')
            .slideDown();

        content
            .find('.section-tabs-content-inner:nth-child(' + (index+1) + ')')
            .siblings()
            .removeClass('active')
            .find('.section-tabs-content-wrapper')
            .slideUp();

    });

    $('.section-tabs .section-tabs-heading-inner').click(function () {

        var tab = $(this).parent();
        var parent = tab.closest('.section-tabs');
        var tabs = parent.find('.section-tabs-tabs');
        var index = tab.index();

        tab
            .siblings()
            .removeClass('active')
            .find('.section-tabs-content-wrapper')
            .slideUp();

        tab
            .addClass('active')
            .find('.section-tabs-content-wrapper')
            .slideDown();

        tabs
            .find('.section-tabs-heading:nth-child(' + (index+1) + ')')
            .addClass('active');

        tabs
            .find('.section-tabs-heading:nth-child(' + (index+1) + ')')
            .siblings()
            .removeClass('active');

    });

    $('.section-tabs .section-tabs-heading:first-child').trigger('click');

}


function button_icons() {
    $('.button[href$=".pdf"]').addClass('button-download');
}


function wpcf7_check_init() {

    // Initialise CF7 forms, if not already initialised
    document
        .querySelectorAll('.wpcf7.no-js form')
        .forEach((
                function(e){
                    return wpcf7.init(e)
                }
            )
        );
}


function modal_activation() {

    // Launch modal automatically
    let launch_data = JSON.parse($('#modal-launch-data').val());
    launch_data.forEach((launch_data) => {
        if ( launch_data['page'] === window.location.href ) {
            if ( cookie_read(launch_data['cookie']) === null ) {
                modal_open('#' + launch_data['modal']);
            }
        }
    });


    // Close modal when button clicked, and set cookie, if required.
    $('.modal-buttons .button').click(function() {

        var modal_parent = $(this).closest('.modal');
        modal_parent.removeClass('active');

        // Only close the modal overlay if we're not moving to a different modal
        if ( $(this).is('button') || $(this).attr('href').substring(0,6) !== '#modal'  ) {
            $('html').removeClass('modal-active');
        }

        // Set a cookie?
        if ( $(this).attr('data-cookie-id') !== '' ) {
            cookie_create($(this).attr('data-cookie-id'), '1', 1000);
        }
    });
}


/** create cookie */
function cookie_create( name, value, days ) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}


/** read cookie */
function cookie_read( name ) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function form_select() {

    $('.form-select').change( function() {
        let index = $(this).val();
        let parent = $(this).closest('.form-select-parent');
        if ( index == 0 ) {
            index = 1;
        }
        parent.find('.form-select-target').removeClass('active');
        parent.find('.form-select-target[data-index="' + index + '"]').addClass('active');
    });

    $('.form-select option:first-child').prop('selected', 'selected');
    $('.form-select').trigger('change');
}


function mobile_nav() {

    $('#header-nav-container ul.menu > li.menu-item-has-children').append('<span class="subnav-toggle" />');

    $('.subnav-toggle').click( function() {
        let parent = $(this).parent();
        if ( parent.hasClass('active') ) {
            parent.find('.sub-menu').slideUp();
            parent.removeClass('active');
        }
        else {
            parent.find('.sub-menu').slideDown();
            parent.addClass('active');
        }
    });
}


function anchor_scroll() {

    let hash = window.location.hash;

    //alert(hash);

    function anchor_scroll_do() {

        let offset = get_scroll_to_position(hash);

        // Allow for persistent nav
        offset = offset - $('#header').height() + 1;

        scroll_to(offset);
    }

    if ( hash != '' ) {
        if ( $(hash).length > 0 ) {
            setTimeout(anchor_scroll_do, 500);
        }
    }
}

function modal_form_sent_scrolldown() {
    
    // Bind click event to the submit button within #modal-ajax
    $(document).on('click', '#modal-ajax .button', function(event) {
        
        // Scroll to the bottom of the #modal-scroll element
        setTimeout(function() {
            $('.modal-scroll').animate({
                scrollTop: $('.modal-scroll')[0].scrollHeight
            }, 500); // 500 milliseconds to scroll down
        }, 1000); // Wait 500 milliseconds before starting the animation
    });
}