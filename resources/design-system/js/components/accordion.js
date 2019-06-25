;(function(BUNN, $, undefined) {

    // -- Global Methods -- //

	BUNN.initAccordion = function() {
        // If any accordion items load with a class of "open", make sure their content displays and icons are set accordingly
        $('.js-accordion-item.open').each(function() {
            BUNN.openAccordion($(this));
        });
    };

    BUNN.openAccordion = function($target) {
        var $content = $target.find('.js-accordion-content');
        var $iconContainer = $target.find('.js-accordion-icon');
        var iconInactiveState = $iconContainer.data('inactive-icon');
        var iconActiveState = $iconContainer.data('active-icon');
        var accordionImg = $target.data('accordion-img');

        $content.slideDown('fast');
        $target.addClass('open');
        
        $('[data-fa-i2svg]', $iconContainer).toggleClass(iconInactiveState).toggleClass(iconActiveState);

        // if this accordion has an image, show it
        if (accordionImg != null) {
            $('.js-featured-image').removeClass('active');
            $('#' + accordionImg).addClass('active');
        }
    };

    BUNN.closeAccordion = function($target) {
        var $content = $target.find('.js-accordion-content');
        var $iconContainer = $target.find('.js-accordion-icon');
        var iconInactiveState = $iconContainer.data('inactive-icon');
        var iconActiveState = $iconContainer.data('active-icon');
        var accordionImg = $target.data('accordion-img');

        $content.slideUp('fast');
        $target.removeClass('open');
        
        $('[data-fa-i2svg]', $iconContainer).toggleClass(iconActiveState).toggleClass(iconInactiveState);
    };

    /* 
     * @param $target $(.js-accordion-title)
     */
    BUNN.toggleAccordion = function($target) {
        var $accordion = $target.closest('.js-accordion');
        var $openAccordionItem = $accordion.find('.js-accordion-item.open');
        var accordionImg = $target.data('accordion-img');
        
        // if this item is not already open...
        if (!$target.hasClass('open')) {

            // close any siblings
            if ($openAccordionItem) {
                BUNN.closeAccordion($openAccordionItem);
            }

            // and open the target item
            BUNN.openAccordion($target);

        // if it IS already open...
        } else {
            
            //and doesn't have an image, close it
            if (!accordionImg) {
                BUNN.closeAccordion($target);
            }
        }
    };

    BUNN.contentExpand = function($content, $linkText, $maxHeight) {
        if ($linkText === 'Show more') {
            $('.js-content-expand-toggle').text('Show less');
            $content.addClass('open').css('max-height', $maxHeight)
        } else {
            $('.js-content-expand-toggle').text('Show more');
            $content.removeClass('open').css('max-height', '240px');
        }
    };

    // -- Event Handlers -- //

    BUNN.initAccordion();

    $('.js-accordion-title').click(function() {
        BUNN.toggleAccordion($(this).parent());
    });

    $('.js-content-expand-toggle').click(function() {
        let $content = $('.js-content-expand');
        let $linkText = this.innerText;
        let $maxHeight = $content.prop('scrollHeight');
        BUNN.contentExpand($content, $linkText, $maxHeight);
    });


})(window.BUNN = window.BUNN || {}, jQuery);
