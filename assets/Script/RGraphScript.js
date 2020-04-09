defaultColors = [
			[0,10,'#ff0'],
			[10,20,'#ff0'],
			[20,30,'#fd0'],
			[30,40,'#fc0'],
			[40,50,'#fa0'],
			[50,60,'#f80'],
			[60,70,'#f60'],
			[70,80,'#f50'],
			[80,90,'#f30'],
			[90,100,'#f20'],
		];
    
		// Create the Meter chart specifying the min/max/value
		meter = new RGraph.Meter({
			id: 'cvs',
			min: 0,
			max: 100,
			value: 64,
				options: {

					marginLeft: 15,
					marginRight: 15,
					marginTop: 15,
					marginBottom: 15,

				// Hide the centerpin by setting its colors to transparent
				centerpinStroke: 'rgba(0,0,0,0)',
				centerpinFill: 'rgba(0,0,0,0)',

				// These are the colors for the segments on the main chart
				colorsRanges: defaultColors,

				// Turn off labels
				labelsCount: 0,
            
				// By setting the start and end angles of the Meter you can change
				// the extent of the Meter chart from the default semi-circle
				anglesStart: RGraph.PI + 0.5,
				anglesEnd: RGraph.TWOPI - 0.5,

				linewidthSegments: 0,
				textSize: 16,
				colorsStroke: 'white',
				segmentsRadiusStart: 150,
				needleRadius: 100,
				border: 0,
				tickmarksSmallCount: 0,
				tickmarksLargeCount: 0,
            }
		}).draw();