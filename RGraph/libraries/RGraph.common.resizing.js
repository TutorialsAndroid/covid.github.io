// version: 2020-03-03
    // o--------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:               |
    // |                                                                                |
    // |                         https://www.rgraph.net                                 |
    // |                                                                                |
    // | RGraph is licensed under the Open Source MIT license. That means that it's     |
    // | totally free to use and there are no restrictions on what you can do with it!  |
    // o--------------------------------------------------------------------------------o

    RGraph = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};

// Module pattern
(function (win, doc, undefined)
{
    var ua     = navigator.userAgent,
        active = null;


    //
    // This function can be used to allow resizing
    // 
    // @param object obj Your graph object
    //
    RGraph.allowResizing =
    RGraph.AllowResizing = function (obj)
    {        
        obj.canvas.resizing = obj.canvas.resizing || {};
        obj.canvas.resizing.placeHolders = obj.canvas.resizing.placeHolders || [];
        
        //
        // Store the original width/height on the canvas
        //
        if (!obj.canvas.resizing.originalw) { obj.canvas.resizing.originalw = obj.canvas.width; }
        if (!obj.canvas.resizing.originalh) { obj.canvas.resizing.originalh = obj.canvas.height; }













        // The size of the resize handle (so '15' isn't littered throughout the code)
        var resizeHandleSize = 15;


        // Add the original width and height to the canvas
        if (   !obj.canvas.resizing.__rgraph_original_width__
            || !obj.canvas.resizing.__rgraph_original_height__
            || !obj.canvas.resizing.__adjustX
            || !obj.canvas.resizing.__adjustY
           ) {

            obj.canvas.resizing.__rgraph_original_width__  = obj.canvas.width;
            obj.canvas.resizing.__rgraph_original_height__ = obj.canvas.height;
            obj.canvas.resizing.adjustX = (typeof obj.get('resizableHandleAdjust') == 'object' && typeof obj.get('resizableHandleAdjust')[0] == 'number' ? obj.get('resizableHandleAdjust')[0] : 0);
            obj.canvas.resizing.adjustY = (typeof obj.get('resizableHandleAdjust') == 'object' && typeof obj.get('resizableHandleAdjust')[1] == 'number' ? obj.get('resizableHandleAdjust')[1] : 0);
            obj.canvas.resizing.bgcolor = obj.get('resizableHandleBackground') || 'rgba(0,0,0,0)';
        }



        // Draw the resize handle
        obj.path(
            'b m % % r % % % % f %',
            obj.canvas.width - resizeHandleSize - resizeHandleSize + obj.canvas.resizing.adjustX,
            obj.canvas.height - resizeHandleSize,
            obj.canvas.width - resizeHandleSize - resizeHandleSize + obj.canvas.resizing.adjustX,
            obj.canvas.height - resizeHandleSize + obj.canvas.resizing.adjustY,
            2 * resizeHandleSize,
            resizeHandleSize,
            obj.canvas.resizing.bgcolor
        );

        // Draw the arrows
        obj.path(
            'b lw 1 m % % l % % m % % l % % s gray f transparent',
            Math.round(obj.canvas.width - (resizeHandleSize / 2) + obj.canvas.resizing.adjustX),
            obj.canvas.height - resizeHandleSize + obj.canvas.resizing.adjustY,
            Math.round(obj.canvas.width - (resizeHandleSize / 2) + obj.canvas.resizing.adjustX),
            obj.canvas.height + obj.canvas.resizing.adjustY,
            obj.canvas.width + obj.canvas.resizing.adjustX,
            Math.round(obj.canvas.height - (resizeHandleSize / 2) + obj.canvas.resizing.adjustY),
            obj.canvas.width - resizeHandleSize + obj.canvas.resizing.adjustX,
            Math.round(obj.canvas.height - (resizeHandleSize / 2) + obj.canvas.resizing.adjustY)
        );

        // Top arrow head
        obj.path('b m % % l % % l % % c f gray',
            obj.canvas.width - (resizeHandleSize / 2) + obj.canvas.resizing.adjustX, obj.canvas.height - resizeHandleSize + obj.canvas.resizing.adjustY,
            obj.canvas.width - (resizeHandleSize / 2) + 3 + obj.canvas.resizing.adjustX, obj.canvas.height - resizeHandleSize + 3 + obj.canvas.resizing.adjustY,
            obj.canvas.width - (resizeHandleSize / 2) - 3 + obj.canvas.resizing.adjustX, obj.canvas.height - resizeHandleSize + 3 + obj.canvas.resizing.adjustY
        );

        // Bottom arrow head
        obj.path(
            'b m % % l % % l % % c f gray',
            obj.canvas.width - (resizeHandleSize / 2) + obj.canvas.resizing.adjustX, obj.canvas.height + obj.canvas.resizing.adjustY,
            obj.canvas.width - (resizeHandleSize / 2) + 3 + obj.canvas.resizing.adjustX, obj.canvas.height - 3 + obj.canvas.resizing.adjustY,
            obj.canvas.width - (resizeHandleSize / 2) - 3 + obj.canvas.resizing.adjustX, obj.canvas.height - 3 + obj.canvas.resizing.adjustY
        );

        // Left arrow head
        obj.path(
            'b m % % l % % l % % c f gray',
            obj.canvas.width - resizeHandleSize + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) + obj.canvas.resizing.adjustY,
            obj.canvas.width - resizeHandleSize + 3 + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) + 3 + obj.canvas.resizing.adjustY,
            obj.canvas.width - resizeHandleSize + 3 + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) - 3 + obj.canvas.resizing.adjustY
        );
        
        // Right arrow head
        obj.path(
            'b m % % l % % l % % c f gray',
            obj.canvas.width + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) + obj.canvas.resizing.adjustY,
            obj.canvas.width - 3 + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) + 3 + obj.canvas.resizing.adjustY,
            obj.canvas.width  - 3 + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) - 3 + obj.canvas.resizing.adjustY
        );
        
        // Square at the centre of the arrows
        obj.path(
            'b m % % r % % % % r % % % % s gray f white',
            obj.canvas.width + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) + obj.canvas.resizing.adjustY,
            obj.canvas.width - (resizeHandleSize / 2) - 2 + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) - 2 + obj.canvas.resizing.adjustY, 4, 4,
            obj.canvas.width - (resizeHandleSize / 2) - 2 + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) - 2 + obj.canvas.resizing.adjustY, 4, 4
        );

        // Draw the "Reset" button
        obj.path(
            'b m % % l % % l % % l % % l % % s gray f gray',
            Math.round(obj.canvas.width - resizeHandleSize - 3 + obj.canvas.resizing.adjustX), obj.canvas.height - resizeHandleSize / 2 + obj.canvas.resizing.adjustY,
            Math.round(obj.canvas.width - resizeHandleSize - resizeHandleSize + obj.canvas.resizing.adjustX), obj.canvas.height - (resizeHandleSize / 2) + obj.canvas.resizing.adjustY,
            obj.canvas.width - resizeHandleSize - resizeHandleSize + 2 + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) - 2 + obj.canvas.resizing.adjustY,
            obj.canvas.width - resizeHandleSize - resizeHandleSize + 2 + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) + 2 + obj.canvas.resizing.adjustY,
            obj.canvas.width - resizeHandleSize - resizeHandleSize + obj.canvas.resizing.adjustX, obj.canvas.height - (resizeHandleSize / 2) + obj.canvas.resizing.adjustY
        );

        // The vertical line at the end of the reset button
        obj.path(
            'b m % % l % % s f',
            Math.round(obj.canvas.width - resizeHandleSize - resizeHandleSize - 1 + obj.canvas.resizing.adjustX), obj.canvas.height - (resizeHandleSize / 2) - 3 + obj.canvas.resizing.adjustY,
            Math.round(obj.canvas.width - resizeHandleSize - resizeHandleSize - 1 + obj.canvas.resizing.adjustX), obj.canvas.height - (resizeHandleSize / 2) + 3 + obj.canvas.resizing.adjustY
        );







        //
        // The code inside this if() condition only runs once due to the if() condition tests- if
        // the obj.rgraphResizewrapper variable exists then the code has run
        //
        if (obj.get('resizable') && !obj.canvas.rgraphResizewrapper) {



// ** TODO ** Needs fixing
//
//
// Wrap the canvas
// ** NEEDS FIXING **
//
obj.canvas.rgraphResizewrapper = $('<div id="rgraph_resize_container_' + obj.canvas.id +'"></div>').css({
    'float': obj.canvas.style.cssFloat,
    position: 'relative'
}).get(0);

$(obj.canvas).wrap(obj.canvas.rgraphResizewrapper);

// TODO Might need to add more properties here (eg margin, padding etc)
obj.canvas.style.cssFloat = 'none';
obj.canvas.style.top   = 0;
obj.canvas.style.left  = 0;



            var window_onmousemove = function (e)
            {
                var canvas  = active,
                    obj     = canvas ? canvas.__object__ : null;

                if (obj.canvas) {

                    if (obj.canvas.resizing.mousedown) {
    
                        var newWidth  = obj.canvas.width + (e.pageX - obj.canvas.resizing.originalx),
                            newHeight = obj.canvas.height + (e.pageY - obj.canvas.resizing.originaly),
                            minWidth  = obj.get('resizableMinwidth'),
                            minHeight = obj.get('resizableMinheight');

                        // Check for maximum width
                        if (newWidth > (obj.canvas.resizing.originalw / 2) && (typeof obj.get('resizableMaxwidth') === 'number' ? newWidth < obj.get('resizableMaxwidth') : true) &&
                            (typeof minWidth === 'number' ? newWidth > minWidth : true)
                            ) {
                            obj.canvas.resizing.div.style.width = newWidth + 'px';
                        }
                        
                        // Check for maximum height
                        if (newHeight > (obj.canvas.resizing.originalh / 2) && (typeof obj.get('resizableMaxheight') === 'number' ? newHeight < obj.get('resizableMaxheight') : true) &&
                            (typeof minHeight === 'number' ? newHeight > minHeight : true)
                            ) {
                            obj.canvas.resizing.div.style.height = newHeight + 'px';
                        }
                        

                        
                        RGraph.fireCustomEvent(obj.canvas.__object__, 'onresize');
                    }
                }
            }



            // Install the function as an event listener - but only once
            if (typeof obj.canvas.rgraph_resize_window_mousemove_listener_installed != 'boolean') {
                window.addEventListener('mousemove', window_onmousemove, false);
                obj.canvas.rgraph_resize_window_mousemove_listener_installed = true;
            }

            // The window onmouseup function
            var MouseupFunc = function (e)
            {
                if (!obj.canvas.resizing || !obj.canvas.resizing.div || !obj.canvas.resizing.mousedown) {
                    return;
                }

                if (obj.canvas.resizing.div) {

                    var div    = obj.canvas.resizing.div;
                    var coords = RGraph.getCanvasXY(obj.canvas);

                    var parentNode = obj.canvas.parentNode;

                    if (obj.canvas.style.position != 'absolute') {
                        
                        // Create a DIV to go in the canvases place
                        var placeHolderDIV               = document.createElement('DIV');
                            placeHolderDIV.style.width   = obj.canvas.resizing.originalw + 'px';
                            placeHolderDIV.style.height  = obj.canvas.resizing.originalh + 'px';

                            placeHolderDIV.style.display  = 'inline-block'; // Added 5th Nov 2010
                            placeHolderDIV.style.position = obj.canvas.style.position;
                            placeHolderDIV.style.left     = obj.canvas.style.left;
                            placeHolderDIV.style.top      = obj.canvas.style.top;
                            placeHolderDIV.style.cssFloat = obj.canvas.style.cssFloat;

                        parentNode.insertBefore(placeHolderDIV, obj.canvas);
                    }


                    // Now set the canvas to be positioned absolutely
                    obj.canvas.style.backgroundColor = 'white';
                    obj.canvas.style.position        = 'absolute';
                    obj.canvas.style.border          = '1px dashed gray';
                    obj.canvas.style.boxShadow       = '2px 2px 5px #ddd';


                    obj.canvas.style.left = 0;//(obj.canvas.resizing.originalCanvasX  - 2) + 'px';
                    obj.canvas.style.top  = 0;//(obj.canvas.resizing.originalCanvasY - 2) + 'px';


                    // Set the dimensions of the canvas using the HTML attributes
                    obj.canvas.width  = parseInt(div.style.width);
                    obj.canvas.height = parseInt(div.style.height);




                    // Because resizing the canvas resets any tranformation - the antialias fix needs to be reapplied.
                    obj.canvas.getContext('2d').translate(0.5,0.5);



                    // Reset the gradient parsing status by setting all of the color values back to their original
                    // values before Draw was first called
                    var objects = RGraph.ObjectRegistry.getObjectsByCanvasID(obj.canvas.id);
                    for (var i=0,len=objects.length; i<len; i+=1) {
                        
                        RGraph.resetColorsToOriginalValues(objects[i]);
                        if (typeof objects[i].reset === 'function') {
                            objects[i].reset();
                        }
                    }
                    
                    
                    
                    
                    // Kill the background cache
                    RGraph.cache = [];
                

                    // Fire the onresize event
                    RGraph.fireCustomEvent(obj.canvas.__object__, 'onresizebeforedraw');

                    RGraph.redrawCanvas(obj.canvas);
                    

                    // Get rid of transparent semi-opaque DIV
                    obj.canvas.resizing.mousedown = false;
                    div.style.display = 'none';
                    document.body.removeChild(div);
                }


                // If there is zoom enabled in thumbnail mode, lose the zoom image
                if (RGraph.Registry.get('zoomedDiv') || RGraph.Registry.get('zoomedImg')) {
                    RGraph.Registry.set('zoomedDiv', null);
                    RGraph.Registry.set('zoomedImg', null);
                }


                // Fire the onresize event
                RGraph.fireCustomEvent(obj.canvas.__object__, 'onresizeend');
            };


            var window_onmouseup = MouseupFunc;
            
            // Install the function as an event listener - but only once
            if (typeof obj.canvas.rgraph_resize_window_mouseup_listener_installed != 'boolean') {
                window.addEventListener('mouseup', window_onmouseup, false);
                obj.canvas.rgraph_resize_window_mouseup_listener_installed = true;
            }




























            var canvas_onmousemove = function (e)
            {
                var coords  = RGraph.getMouseXY(e);
                var obj     = e.target.__object__;
                var cursor  = obj.canvas.style.cursor;

                // Save the original cursor
                if (!obj.canvas.resizing.original_cursor) {
                    obj.canvas.resizing.original_cursor = cursor;
                }
                
                if (   (coords[0] > (obj.canvas.width - resizeHandleSize)
                    && coords[0] < obj.canvas.width
                    && coords[1] > (obj.canvas.height - resizeHandleSize)
                    && coords[1] < obj.canvas.height)) {

                        obj.canvas.style.cursor = 'move';

                } else if (   coords[0] > (obj.canvas.width - resizeHandleSize - resizeHandleSize)
                           && coords[0] < obj.canvas.width - resizeHandleSize
                           && coords[1] > (obj.canvas.height - resizeHandleSize)
                           && coords[1] < obj.canvas.height) {
                    
                    obj.canvas.style.cursor = 'pointer';

                } else {
                    if (obj.canvas.resizing.original_cursor) {
                        obj.canvas.style.cursor = obj.canvas.resizing.original_cursor;
                        obj.canvas.resizing.original_cursor = null;
                    } else {
                        obj.canvas.style.cursor = 'default';
                    }
                }
            };





            // Install the function as an event listener - but only once
            if (typeof obj.canvas.rgraph_resize_mousemove_listener_installed != 'boolean') {
                obj.canvas.addEventListener('mousemove', canvas_onmousemove, false);
                obj.canvas.rgraph_resize_mousemove_listener_installed = true;
            }





            var canvas_onmouseout = function (e)
            {
                e.target.style.cursor = 'default';
                e.target.title        = '';
            };

            // Install the function as an event listener - but only once
            if (typeof obj.canvas.rgraph_resize_mouseout_listener_installed != 'boolean') {
                obj.canvas.addEventListener('mouseout', canvas_onmouseout, false);
                obj.canvas.rgraph_resize_mouseout_listener_installed = true;
            }





            var canvas_onmousedown = function (e)
            {
                var coords   = RGraph.getMouseXY(e);
                var canvasXY = RGraph.getCanvasXY(e.target);
                var canvas   = e.target;
                
                //
                // Set the active variable to the last canvas that was clicked on
                //
                active = canvas;






                if (   coords[0] > (obj.canvas.width - resizeHandleSize)
                    && coords[0] < obj.canvas.width
                    && coords[1] > (obj.canvas.height - resizeHandleSize)
                    && coords[1] < obj.canvas.height) {

                    RGraph.fireCustomEvent(obj, 'onresizebegin');
                    
                    // Save the existing border
                    if (obj.canvas.resizing.original_css_border == null) {
                        obj.canvas.resizing.original_css_border = obj.canvas.style.border;
                    }
                    
                    // Save the existing shadow
                    if (obj.canvas.resizing.original_css_shadow == null) {
                        obj.canvas.resizing.original_css_shadow = obj.canvas.style.boxShadow;
                    }

                    obj.canvas.resizing.mousedown = true;


                    // Create the semi-opaque DIV
                    var div = document.createElement('DIV');
                        div.style.position = 'absolute';
                        div.style.left     = canvasXY[0] + 'px';
                        div.style.top      = canvasXY[1] + 'px';
                        div.style.width    = obj.canvas.width + 'px';
                        div.style.height   = obj.canvas.height + 'px';
                        div.style.border   = '1px dotted black';
                        div.style.backgroundColor = 'gray';
                        div.style.opacity  = 0.5;
                        div.__canvas__ = e.target;
                    document.body.appendChild(div);

                    obj.canvas.resizing.div = div;
                    obj.canvas.resizing.placeHolders.push(div);
                    
                    // Hide the previous resize indicator layers. This is only necessary it seems for the Meter chart
                    for (var i=0; i<(obj.canvas.resizing.placeHolders.length - 1); ++i) {
                        obj.canvas.resizing.placeHolders[i].style.display = 'none';
                    }

                    // This is a repetition of the window.onmouseup function (No need to use DOM2 here)
                    div.onmouseup = function (e)
                    {
                        MouseupFunc(e);
                    }

                    
                    // No need to use DOM2 here
                    obj.canvas.resizing.div.onmouseover = function (e)
                    {
                        e.stopPropagation();
                    }

                    // The mouse
                    obj.canvas.resizing.originalx = e.pageX;
                    obj.canvas.resizing.originaly = e.pageY;

                    obj.canvas.resizing.originalCanvasX = RGraph.getCanvasXY(obj.canvas)[0];
                    obj.canvas.resizing.originalCanvasY = RGraph.getCanvasXY(obj.canvas)[1];
                }

                // This facilitates the reset button
                if (   coords[0] > (obj.canvas.width - resizeHandleSize - resizeHandleSize)
                    && coords[0] < obj.canvas.width - resizeHandleSize
                    && coords[1] > (obj.canvas.height - resizeHandleSize)
                    && coords[1] < obj.canvas.height
                    && obj.canvas.resizing.originalw
                    && obj.canvas.resizing.originaly) {
                    

                    // Fire the onresizebegin event
                    RGraph.fireCustomEvent(obj.canvas.__object__, 'onresizebegin');

                    // Restore the original width and height
                    obj.canvas.width = obj.canvas.resizing.originalw;
                    obj.canvas.height = obj.canvas.resizing.originalh;

                    // TODO Need to check the parent is actually a DIV container or not?
                    
                    // Show the link if it exists and the display is set to none
                    if (obj.canvas.__link__ && obj.canvas.__link__.style.display === 'none') {
                        obj.canvas.__link__.style.display = 'inline';
                    }

                    if (typeof obj.canvas.parentNode.id === 'string' && obj.canvas.parentNode.id.substring(0, 24) === 'rgraph_resize_container_') {
                        obj.canvas.parentNode.style.width  = obj.canvas.resizing.originalw + 'px';
                        obj.canvas.parentNode.style.height = obj.canvas.resizing.originalh + 'px';
                    }

                    // Lose the border
                    obj.canvas.style.border = obj.canvas.resizing.original_css_border;
                    
                    //Lose the shadow
                    obj.canvas.style.boxShadow = obj.canvas.resizing.original_css_shadow;

                    
                    // Add 1 pixel to the top/left because the border is going
                    obj.canvas.style.left = (parseInt(obj.canvas.style.left)) + 'px';
                    obj.canvas.style.top  = (parseInt(obj.canvas.style.top)) + 'px';



                    // Because resetting the canvas resizes it - and so loses any translation - need to reapply the
                    // antialiasing translation
                    obj.canvas.getContext('2d').translate(0.5,0.5);
                    
                    
                    RGraph.fireCustomEvent(obj.canvas.__object__, 'onresizebeforedraw');
                    
                    // Since gradients are pre-parsed colors - this resets the colors to what they were
                    // before the parsing.
                    var objects = RGraph.ObjectRegistry.getObjectsByCanvasID(obj.canvas.id);
                    for (var i=0; i<objects.length; i+=1) {
                        RGraph.resetColorsToOriginalValues(objects[i]);
                        if (objects[i].reset) {
                            objects[i].reset();
                        }
                        
                        RGraph.redrawCanvas(objects[i].canvas);
                    }
                    
                    
                    // Clear the cache so that old things (eg backgrounds) are not reused
                    RGraph.cache = [];






                    // Redraw the canvas
                    //RGraph.redrawCanvas(objects[i].canvas);
                    

                    // Set the width and height on the DIV
                    if (obj.canvas.resizing.div) {
                        obj.canvas.resizing.div.style.width  = obj.canvas.__original_width__ + 'px';
                        obj.canvas.resizing.div.style.height = obj.canvas.__original_height__ + 'px';
                    }


                    // Fire the resize event
                    RGraph.fireCustomEvent(obj.canvas.__object__, 'onresize');
                    RGraph.fireCustomEvent(obj.canvas.__object__, 'onresizeend');
                }
            };

            // Install the function as an event listener - but only once
            if (typeof obj.canvas.rgraph_resize_mousedown_listener_installed != 'boolean') {
                obj.canvas.addEventListener('mousedown', canvas_onmousedown, false);
                obj.canvas.rgraph_resize_mousedown_listener_installed = true;
            }
        }
    };
// End module pattern
})(window, document);