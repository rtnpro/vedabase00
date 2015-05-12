(
  function ( )
  {
    jQuery(document).ready
    (
      function ( )
      {
          // Setup page.
        jQuery('body').append("<div id='popup' class='popup hidden'><p>Placeholder.</p></div>");
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
        };
        var select = function (objectToSelect)
        {

            if (selectedParagraph != null)
            {
              deselect(selectedParagraph);
            }
            objectToSelect.addClass('highlighted');
            selectedParagraph = objectToSelect;
        };
        var toggleSelection = function (objectToToggleSelection, isSelected)
        {
          if (isSelected)
          {
            select(objectToToggleSelection);
          } else {
            deselect(objectToToggleSelection);
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

            select(paragraph);

            show(popUp);

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
            paragraph.after(popUp);

            if (isDesktopScreenWidth( ))
            {  
              alignPopUpTo(jQuery(this));
            } 

            return false;
          }
        );

        doneAnchor.on
        (
            'click'
          , function ( )
            {
              deselect(selectedParagraph);
              hide(popUp);

              return false;
            }
        );

        jQuery('div.record').hover
        (
            function ( )
            {
              if (!jQuery(this).hasClass('highlighted'))
              {
                jQuery(this).find(".ri").append(shareAnchorContainer);
                shareAnchor.attr('href', '#' + jQuery(this).attr('id'));
                show(shareAnchorContainer);
              }
            }
          , function ( ) {}
        );

        jQuery(window)
          .resize
          (
            function ( )
            {
              alignPopUpTo(shareAnchor);
            }
          )
        ;
      }
    );
  }
)( );
