(function() {
    jQuery(document).ready(function() {
        // Setup page.
        var selectedParagraph;

        jQuery('body').append("<div id='popup' class='popup hidden'><p>Placeholder.</p></div>");
        var popUp = jQuery('#popup');

        jQuery('body').append("<span class='share hidden' ><a id='share' href='#'><i class='fa fa-bars'></i></a></span>");
        var shareAnchorContainer = jQuery('.share');
        var shareAnchor = jQuery('#share');

        doneAnchor = jQuery("<a id='done' href='#done'>Done.</a>");

        // Define functions.
        var hide = function(objectToHide) {
            objectToHide.addClass('hidden');
        };

        var popUpHide = function() {
            hide(popUp);
            popUp.animate({ "left": "-=300px" }, "0" );
        };

        var overlayHide = function() {
            jQuery("#pm-overlay").css({'display': 'none'});
            jQuery("body").animate({scrollLeft: 0}, 150);
        };

        var show = function(objectToShow) {
            objectToShow.removeClass('hidden');
        };

        var popUpShow = function() {
            if (selectedParagraph) {
                show(popUp);
                popUp.animate({ "left": shareAnchor.offset().left }, 0 );
                popUp.css({
                    top: selectedParagraph.offset().top - 1,
                });
            }
        };

        var overlayShow = function() {
            jQuery("#pm-overlay").css({'display': 'block'});
            jQuery("html,body").animate({scrollLeft: "+=300"}, 350);
        };

        var deselect = function(objectToDeselect) {
            objectToDeselect.removeClass('highlighted');
            jQuery('body').removeClass('popup-active');
            selectedParagraph = null;
            overlayHide();
            popUpHide();
        };

        var select = function (objectToSelect) {
            // if (selectedParagraph != null)
            if (selectedParagraph) {
                deselect(selectedParagraph);
            }
            objectToSelect.addClass('highlighted');
            selectedParagraph = objectToSelect;

            jQuery('body').addClass('popup-active');

            overlayShow();
            popUpShow();
        };

        // Define event handlers.
        shareAnchor.on('click', function() {
            var paragraphId = jQuery(this).attr('href');
            var paragraph = jQuery(paragraphId);

            select(paragraph);

            /* Move anchor to different location
             * in order to keep it's event handler alive
             * when content of the pop-up will be cleared.
             */
            console.assert("Done anchor is missing.", !doneAnchor);
            jQuery('body').after(doneAnchor);
            hide(doneAnchor);

            /* Remove content of the pop-up,
             * in order to avoid duplications.
             */
            console.assert("Pop-up is missing.", !popUp);
            popUp.contents().replaceWith("");

            /* Generate content of the pop-up.
            */
            popUp.append("<p>Content of the pop-up for the paragraph with id of " + paragraphId + ".</p>");
            show(doneAnchor);
            popUp.append(doneAnchor);

            return false;
        });
        jQuery("#pm-overlay").on('click', function() {
            deselect(selectedParagraph);
            return false;
        });

        doneAnchor.on('click', function() {
            deselect(selectedParagraph);
            return false;
        });

        jQuery('div.record').hover(function() {
            if (!jQuery('body').hasClass('popup-active') & !jQuery(this).hasClass('highlighted')) {
                jQuery(this).find(".ri").append(shareAnchorContainer);
                shareAnchor.attr('href', '#' + jQuery(this).attr('id'));
                show(shareAnchor);
                show(shareAnchorContainer);
            }
        }, function() {});

        jQuery(window).resize(function() {
            popUpShow();
        });
    });
})();
