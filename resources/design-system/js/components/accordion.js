;(function(BUNN, $, undefined) {

    // -- Global Methods -- //

	BUNN.initAccordion = function() {

        // If any accordion items load with a class of "open", make sure their content displays and icons are set accordingly
        $('.js-accordion-item.open').each(function() {
            BUNN.openAccordion($(this));
        });

        $('.js-active-accordion-sub').each(function() {
            if ($(this).hasClass('js-accordion-item') && !$(this).hasClass('open')) {
                BUNN.openAccordion($(this).children('.js-accordion-title'));
                console.log('on the item');
            }
            else {
                BUNN.openAccordion($(this).closest('.js-accordion-item').children('.js-accordion-title'));
                console.log('in the item');
            }
        });
    
    };

    BUNN.openAccordion = function($title) {
        var $accordionItem = $title.closest('.js-accordion-item');
        var $content = $accordionItem.children('.js-accordion-content');
        var $iconContainer = $title.find('.js-accordion-icon');
        var iconInactiveState = $iconContainer.data('inactive-icon');
        var iconActiveState = $iconContainer.data('active-icon');
        var accordionImg = $title.data('accordion-img');

        $content.slideDown('fast');
        $accordionItem.addClass('open');

        var $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer);

        $icon.removeClass(iconInactiveState).addClass(iconActiveState);
        

        // if this accordion has an image, show it
        if (accordionImg != null) {
            $('.js-featured-image').removeClass('active');
            $('#' + accordionImg).addClass('active');
        }
    };

    BUNN.closeAccordion = function($title) {
        var $accordionItem = $title.closest('.js-accordion-item');
        var $content = $accordionItem.children('.js-accordion-content');
        var $iconContainer = $title.find('.js-accordion-icon');
        var iconInactiveState = $iconContainer.data('inactive-icon');
        var iconActiveState = $iconContainer.data('active-icon');

        $content.slideUp('fast');
        $accordionItem.removeClass('open');

        var $icon = $('[class*=fa]', $iconContainer).length ? $('[class*=fa]', $iconContainer) : $('[data-fa-i2svg]', $iconContainer);

        $icon.removeClass(iconActiveState).addClass(iconInactiveState);
        
    };

    /* 
     * @param $title $(.js-accordion-title)
     */
    BUNN.toggleAccordion = function($title) {
        var $accordion = $title.closest('.js-accordion');
        var $accordionItem = $title.closest('.js-accordion-item');
        var $openAccordionItem = $accordion.children('.js-accordion-item.open');
        var accordionImg = $title.data('accordion-img');
        
        // if this item is not already open...
        if (!$accordionItem.hasClass('open')) {

            // close any siblings
            if ($openAccordionItem) {
                BUNN.closeAccordion($openAccordionItem.children('.js-accordion-title'));
            }

            // and open the target item
            BUNN.openAccordion($title);

        // if it IS already open...
        } else {
            
            //and doesn't have an image, close it
            if (!accordionImg) {
                BUNN.closeAccordion($title);
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

    $(document).on('click', '.js-accordion-title', function() {
        BUNN.toggleAccordion($(this));
    });

    $(document).on('click', '.js-content-expand-toggle', function() {
        let $content = $('.js-content-expand');
        let $linkText = this.innerText;
        let $maxHeight = $content.prop('scrollHeight');
        BUNN.contentExpand($content, $linkText, $maxHeight);
    });


})(window.BUNN = window.BUNN || {}, jQuery);
