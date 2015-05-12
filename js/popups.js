(
  function ( )
  {
    jQuery(document).ready
    (
      function ( )
      {
          // Setup page.
        jQuery('body').append("<p id='popup' class='hidden'><p>Placeholder.</p></p>");
        popUp = jQuery('#popup');

        jQuery('body').append("<span class='share' ><a id='share' href='#'>Share.</a></span>");
        shareAnchorContainer = jQuery('.share');
        shareAnchor = jQuery('#share');

        doneAnchor = jQuery("<a id='done' href='#done'>Done.</a>");

          // Define functions.
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
                jQuery(this).prepend(shareAnchorContainer);
                shareAnchor.attr('href', '#' + jQuery(this).attr('id'));
                show(shareAnchorContainer);
              }
            }
          , function ( ) {}
        );
      }
    );
  }
)( );