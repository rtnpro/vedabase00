(
  function ( )
  {
    jQuery(document).ready
    (
      function ( )
      {
          // Setup page.
        jQuery('body').append("<div id='popup' class='popup'><p>Placeholder.</p></div>");
        popUp = jQuery('#popup');

        jQuery('body').append("<span class='share' ><a id='share' href='#'><i class='fa fa-bars'></i></a></span>");
        shareAnchorContainer = jQuery('.share');
        shareAnchor = jQuery('#share');

        doneAnchor = jQuery("<a id='done' href='#done'>Done.</a>");

          // Define functions.
        var isDesktopScreenWidth = function ( )
        {
          return jQuery(window).width( ) > 800;
        }

        var hide = function (objectToHide)
        {
          objectToHide.addClass('hidden');
        }

        var show = function (objectToShow)
        {
          objectToShow.removeClass('hidden');
        }

        var selectedParagraph;
        var deselect = function (objectToDeselect)
        {
          objectToDeselect.removeClass('highlighted');
          jQuery('body').removeClass('popup-active');
        };
        var select = function (objectToSelect)
        {

            if (selectedParagraph != null)
            {
              deselect(selectedParagraph);
            }
            objectToSelect.addClass('highlighted');
            selectedParagraph = objectToSelect;

            jQuery('body').addClass('popup-active');
        };
        var toggleSelection = function (objectToToggleSelection, isSelected)
        {
          if (isSelected)
          {
            select(objectToToggleSelection);
          } else {
            deselect(objectToToggleSelection);
            selectedParagraph = null;
          }
        }

        var alignPopUpTo = function (objectToAlign)
        {
              var CSSRule = 
              {
                  'position': 'absolute'
                , 'left': objectToAlign.offset( ).left - 200 + 'px'
                , 'top': objectToAlign.offset( ).top - 100 + 'px'
                , 'right': objectToAlign.offset( ).right + 100 + 'px'
              };
              popUp.css(CSSRule);
        }

          // Define event handlers.
        shareAnchor.on
        (
            'click'
          , function ( ) 
          {
            var paragraphId = jQuery(this).attr('href');
            var paragraph = jQuery(paragraphId);
            var slide_offset = 0;
            select(paragraph);
            popUp.animate({ "left": jQuery(this).offset().left }, 0 );
            popUp.css({
                top: selectedParagraph.offset().top - 1,
                'opacity': 1,
                'z-index': 3
            })
            jQuery("#pm-overlay").css({'display': 'block'});
            jQuery("body").animate({scrollLeft: 300}, 350);

            // hide(shareAnchor);
            // show(popUp);

            /* Move anchor to different location
             * in order to keep it's event handler alive
             * when content of the pop-up will be cleared.
             */
            $('body').after(doneAnchor);
            hide(doneAnchor);

            /* Remove content of the pop-up,
             * in order to avoid duplications.
             */
            popUp.contents( ).replaceWith("");

            /* Generate content of the pop-up.
             */
            popUp.append("<p>Content of the pop-up for the paragraph with id of " + paragraphId + ".</p>");
            show(doneAnchor);
            popUp.append(doneAnchor);
            console.log(jQuery(this).offset())
            console.log(paragraph.offset().top);

            return false;
          }
        );
        jQuery("#pm-overlay").on
        (
            'click'
          , function ( )
            {
                jQuery("#pm-overlay").css({'display': 'none'});
                popUp.css({opacity:0, 'z-index':-1});
                popUp.animate({ "left": "-=300px" }, "0" );
                deselect(selectedParagraph);
                selectedParagraph = null;
                jQuery("body").animate({scrollLeft: 0}, 150);
                return false;
            }
        );
        doneAnchor.on
        (
            'click'
          , function ( )
            {
                jQuery("#pm-overlay").css({'display': 'none'});
                popUp.css({opacity:0, 'z-index':-1});
                popUp.animate({ "left": "-=300px" }, "0" );
                deselect(selectedParagraph);
                selectedParagraph = null;
                jQuery("body").animate({scrollLeft: 0}, 150);
                return false;
            }
        );

        jQuery('div.record').hover
        (
            function ( )
            {
              if (!jQuery('body').hasClass('popup-active') & !jQuery(this).hasClass('highlighted'))
              {
                jQuery(this).find(".ri").append(shareAnchorContainer);
                shareAnchor.attr('href', '#' + jQuery(this).attr('id'));
                show(shareAnchor);
                show(shareAnchorContainer);
              }
            }
          , function ( ) {}
        );
      }
    );
  }
)( );
