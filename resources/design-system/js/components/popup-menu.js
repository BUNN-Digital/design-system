// JS Popup Menu
// Menu that acts like a popup/modal on mobile and a dropdown on desktop
// ==========================================================================================

;(function(BUNN, $, undefined) {

    // -- Global Methods -- //

    $(".js-popup-menu__content-container").css("display", "none");

    // Append to body on load
    enquire.register("screen and (min-width: " + BUNN.screens.md + "px)", {
        setup: function() {
            $(".js-popup-menu--hybrid").appendTo("body");
        },
        match: function() {
            $("body > .js-popup-menu__content-container").each(function() {
                var menuId = $(this).attr('id');
                var $parent = $('[data-popup-menu="' + menuId + '"]');

                $(this).appendTo($parent);
                $('body').removeClass('h-full overflow-hidden');
            });
        },
        unmatch: function() {
            $(".js-popup-menu--hybrid").appendTo("body");
        }
    });

    BUNN.closePopupMenu = function() {
        var $popupMenuToggle = $('.js-popup-menu__toggle.dropdown-open');
        var popupMenuId = $popupMenuToggle.closest('.popup-menu').data("popup-menu");

        $popupMenuToggle.removeClass("dropdown-open");
        $('#' + popupMenuId).removeClass("visible").css("display", "none");
        $('body').removeClass('h-full overflow-hidden');
    }

    // -- Event Handlers -- //

    // Close menu when clicking close button
    $(".js-popup-menu-close").on("click", function(e) {
        e.preventDefault();
        BUNN.closePopupMenu();
    });

    // Show/hide menu when clicking menu toggle trigger
    $(".js-popup-menu__toggle").on("click", function(e) {
        var $popupMenuToggle = $(this);
        var popupMenuId = $popupMenuToggle.closest('.popup-menu').data("popup-menu");
        var $popupMenu = $("#" + popupMenuId);
        var menuIsHybrid = $popupMenu.hasClass('js-popup-menu--hybrid');
        var dropdownIsOpen = $popupMenuToggle.hasClass("dropdown-open");

        e.preventDefault();
        e.stopPropagation();

        // Close any open popup menus
        BUNN.closePopupMenu();

        if (!dropdownIsOpen) {
            $popupMenu.css("display", "block").addClass("visible");
            $(this).addClass("dropdown-open");

            console.log(window.innerWidth < BUNN.screens.md);
            
            if (menuIsHybrid && window.innerWidth < BUNN.screens.md) {
                $('body').addClass('h-full overflow-hidden');
            }
        } else {
            $popupMenu.css("display", "none").removeClass("visible");
            $(this).removeClass("dropdown-open");
        }

        // listen for a click on the document so we can close the menu by clicking outside of it
        $(document).on("click", function(e) {
            // if we didn"t click on the dropdown menu, close it if it"s open
            if (!$(e.target).closest($popupMenu).length) {
                if ($popupMenu.is(":visible") && !dropdownIsOpen) {
                    BUNN.closePopupMenu();
                }
            }
        });
    });

})(window.BUNN = window.BUNN || {}, jQuery);
