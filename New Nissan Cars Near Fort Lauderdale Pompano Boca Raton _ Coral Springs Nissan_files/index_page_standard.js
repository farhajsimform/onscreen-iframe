/**
 * Standard SRP
 * @constructor
 */
function ThumbnailIntegration() {
	var self = this;

	self.baseEsUrl = 'https://es-data-v2.sister.tv/vehicles/inventory/_search?size=100&q=';
	self.xmlconn_array = [];
	self.srpUtilitiesLoaded = false;
	
	self.vehicleLookupType = 'vin'; // vin or stock_no
	self.ignoreDealerID = false;  // Ignore ProjectID for ES search

	self.modal_iframe_width_max =  (window.innerWidth*0.9)|0;
	self.showModalButtonsOnSmallScreens = 0;
	self.refreshButtonsOnResize = true;

	self.baseImageWidth = 0;
	self.baseImageHeight = 0;
	self.previousVIN = "";
	self.previousVINImgCnt = 0;


	self.pageWidth = 0;
	
	self.buttonStyles = {
		marginLeft: '0px',
		position: 'relative'
	};

	self.vehicleImageCount = {
		total: 0,
		ez360: 0
	};

	// default parameters for player
	self.iframeParameters = {
		header:'false',
		initmode: 'video',
		contact: 'false',
		compactMode:'false',
		galleryMode: 'gallery'
	};


	self.init = function() {
		if (document.body !== undefined && document.readyState === 'complete'){
			self.load_injector();
		} else {
			if (window.addEventListener){
				window.addEventListener( 'load', self.load_injector, false );
			} else if (window.attachEvent){
				window.attachEvent('onload', self.load_injector);
			}
		}
		if(self.srpUtilitiesLoaded == false) {
			self.ez360LoadSRPScript('https://sdk.sister.tv/integrations/global_srp_integrations/utilities/utilities.min.js', function() {
				self.srpUtilitiesLoaded = true;
			});
		}
	};

	self.load_injector = function() {
		// temporary fix for infinitistuart_dealeron - Nov. 1, 2016
		if( document.getElementById('sistertech').getAttribute('data-integration').trim() === 'INFINITIstuart_dealeron'){
			document.getElementById('sistertech').setAttribute('data-integration', 'infinitistuart_dealeron');
		}
		
		if( document.getElementById('sistertech').getAttribute('data-projectid') === ''
			&& document.getElementById('sistertech').getAttribute('projectid') !== ''
			){
			document.getElementById('sistertech').setAttribute('data-projectid', document.getElementById('sistertech').getAttribute('projectid') );
		}
		
		var injector_script = document.getElementById('sistertech').getAttribute('data-integration').trim() + '.js';
		injector_script = injector_script.replace('%C3%AC' , ''); //%C3 %AC //%C3%AC
		injector_script = injector_script.replace('ì' , ''); //
		self.loadScript('https://sdk.sister.tv/integrations/index_integrations/'+injector_script, self.ready);
		self.appendStyles();
	
	};//inject main script to dealer`s inventory page


    /**
	 *	Callback function of loadScript(), called after Integration has been injected into page, and get the VinArray of current page
     * @returns {boolean} - True: vinArray got
     */
	self.ready = function() {

        /**
		 *  File contains all SVGs
         */
		self.getSVGfile('https://medialayer.sister.tv/production/img/icons.svg');

		if(typeof PageDetails === 'undefined' ){
			console.warn('PageDetails function not available');
			return false;
		}

        /**
		 *  PageDetails() has been injected by loadScript()
         */
		self.pageDetails = new PageDetails();
		console.log("PageDetails", self.pageDetails);
        /**
		 *  Use screen size to determine if modal media layer should be available
         */
		if( self.pageDetails.showModalButtonsOnSmallScreens ){
			self.showModalButtonsOnSmallScreens = self.pageDetails.showModalButtonsOnSmallScreens; // if we do want listing page modal buttons on mobile screens for this domain
		}

		if( self.pageDetails.ignoreDealerID){
			self.ignoreDealerID = true;
		}

		if( self.pageDetails.libraryId){
			self.libraryId = self.pageDetails.libraryId;
		}

        /**
		 *  Search vehicle by vin or stock number
         */
		if( self.pageDetails.vehicleLookupType ){
			self.vehicleLookupType = self.pageDetails.vehicleLookupType;
		}

		if( self.pageDetails.refreshButtonsOnResize !== undefined ){
			self.refreshButtonsOnResize = self.pageDetails.refreshButtonsOnResize;
		}

		if( self.pageDetails.paintButtonSingle ){
			self.paintButtonSingle = self.pageDetails.paintButtonSingle;
		}
		
		if( self.pageDetails.iframeParameters ){
			for( var p in self.pageDetails.iframeParameters){
				self.iframeParameters[p] = self.pageDetails.iframeParameters[p]; // override defaults for iFrame parameters
			}
		}

        /**
		 * Get all VINs in the current page
         */
		self.vinArray = self.pageDetails.getVinArray();
		//filter out the imgix urls so that we can use it for inifinte list of srp images
		// var objKeys = Object.keys(self.vinArray)
		// for(let i = objKeys.length-1;i >= 0;i--) {
		// 	if(self.vinArray[objKeys[i]]['elements'][0].src !== undefined) {
		// 		console.log(JSON.parse(JSON.stringify(self.vinArray[objKeys[i]]['elements'][0].src)),"CHKD")
		// 		if(self.vinArray[objKeys[i]]['elements'][0].src.includes("imgix")) {
		// 			delete self.vinArray[objKeys[i]];
		// 		}
		// 	}
		// }
		console.log(self.vinArray, "PageDetails");

		if( self.vinArray != false && Object.keys(self.vinArray).length > 0){
			// console.log('CHK Sent 1');
            /**
			 *  Single elasticsearch query for all VINs on this page AND fire self.parseResults() when complete
             */
			self.esQuery( self.vinArray );
			if(self.timeoutID) {
				// console.log('CHK Sent 2');
				clearTimeout(self.timeoutID);
			}
			return true;
		}
		if(!self.timeoutID){
			// console.log('CHK trying again');
			self.timeoutID = setTimeout(self.ready, 2000);
			return false;
		}
	};


	self.countImages = function(vehicleDoc){
		// logic to decide height of iFrame
		var image_types = {
			'display_pics' : 0, 'spin_detail_pics' : 0, 'detail_pics' : 0, 'spin_pics' : 0
		};

		var imageCount = {
			total: 0,
			ez360: 0
		};
		
		for( var picType in image_types ){ // first check what exists and add it to array
				
			if(picType !== 'display_pics'){
				imageCount.ez360 += image_types[picType];
			}
			if (vehicleDoc[picType] && vehicleDoc[picType].length > 0 && vehicleDoc[picType][0] !== '') {
				image_types[picType] = vehicleDoc[picType].length;
				imageCount.total += image_types[picType];
			}
			break; // stop once it finds images
		}
		//console.log(vehicleDoc);
		if(imageCount.total == 0 && vehicleDoc['third_party_pics'] !== undefined){
			imageCount.total += vehicleDoc['third_party_pics'].length;
		}
		return imageCount;
	};// only checks if this single vehicle has EZ360 pics,

      /**
       * Display Image replacing
       * @param results - xmlConn.responseText in JSON format
       */
	self.parseResults = function(results){
		// vehicleLookupType // vin
		var resultsArray = results['hits']['hits'];
		console.log("EZ360LG2 Parse", results);
		if (resultsArray.length > 0){
			// console.log("Nilesh Parse inside If 1", resultsArray);
			for ( var vehicle = 0; vehicle < resultsArray.length; vehicle++){
				// console.log("Nilesh Parse inside For 1", resultsArray);
                /**
                 * Put vehicle`s vin and projectID into vinArray
                 */
                var targetVehicleID = resultsArray[ vehicle ]['_source'][self.vehicleLookupType];
                var sourceVehicleDoc = resultsArray[ vehicle ]['_source'];
				if(self.vinArray[targetVehicleID]){
					// console.log("Nilesh Parse inside If 2", sourceVehicleDoc);
					self.vinArray[targetVehicleID]['projectID'] = sourceVehicleDoc['project_id'];
					self.vinArray[targetVehicleID]['vin'] = sourceVehicleDoc['vin'];

                    /**
					 * Check if any category of image exists (display_pics || spin_pics || spin_detail_pics || detail_pics || third_party_pics)
                     */
                    var returnedImages = self.returnImage(sourceVehicleDoc);
					if( returnedImages && returnedImages.length > 0){
						var vehicleImageUrls = returnedImages;
						//this should always be an array
						// console.log(vehicleImageUrls, "Rahul Pics")
						self.vinArray[ targetVehicleID]['src'] = vehicleImageUrls;
					}

                    /**
					 *  Consider restrictions on showing vehicle
                     */
					if( self.pageDetails.displayRestrictions ){
						//TODO not working properly
                        /**
						 *  Skip this VIN if no EZ360 images
                         */
						if(	self.pageDetails.displayRestrictions.contentType
							&& self.pageDetails.displayRestrictions.contentType === 'ez360'
							&& self.countImages(sourceVehicleDoc).ez360 === 0
							){
							continue;
						}

                        /**
						 * Restriction for If no video, don`t process this vehicle
                         */
					if(self.pageDetails.displayRestrictions.contentType
							&& self.pageDetails.displayRestrictions.contentType === 'video'
							&& !sourceVehicleDoc.fullmo_sis // fullmo video
							&& !sourceVehicleDoc.pic2vid_en_US // pic2vid video
							){
							continue;
                        }
						
						// vehicle must match new/used display restriction
						if(	self.pageDetails.displayRestrictions.vehicleNewUsed
							&& sourceVehicleDoc.new_used.toLowerCase() != self.pageDetails.displayRestrictions.vehicleNewUsed
							){
							console.log(sourceVehicleDoc.new_used.toLowerCase()+'/'+self.pageDetails.displayRestrictions.vehicleNewUsed);
							continue; // skip this VIN if fails new/used test
						}



					} // END display restrictions

					// check if video exists
					if (sourceVehicleDoc['fullmo_sis'] && sourceVehicleDoc['fullmo_sis'].length > 0) {
						self.vinArray[ targetVehicleID ]['fullmo_sis'] = sourceVehicleDoc['fullmo_sis'];
						self.vinArray[ targetVehicleID ]['imageCount'] = self.countImages( sourceVehicleDoc ).total; // count images for gallery height
					}
					if (sourceVehicleDoc['pic2vid_en_US'] && sourceVehicleDoc['pic2vid_en_US'].length > 0) {
						self.vinArray[ targetVehicleID ]['pic2vid_en_US'] = sourceVehicleDoc['pic2vid_en_US'];
						self.vinArray[ targetVehicleID ]['imageCount'] = self.countImages( sourceVehicleDoc ).total; // count iamges for gallery height
					}
					
					// check if spinit exists
					if ( sourceVehicleDoc['spin_pics'] && sourceVehicleDoc['spin_pics'].length > 0) {
						self.vinArray[ targetVehicleID ]['spinit'] = true;
					}
					
					if ( sourceVehicleDoc['interior_panorama']
						&& sourceVehicleDoc['interior_panorama'].length > 0
						&& sourceVehicleDoc['interior_panorama'][0].length > 0
						) {
						self.vinArray[ targetVehicleID ]['interior_panorama'] = sourceVehicleDoc['interior_panorama'][0];
						self.vinArray[ targetVehicleID ]['imageCount'] = self.countImages( sourceVehicleDoc ).total; // count iamges for gallery height
					}

					if(sourceVehicleDoc['close_up_pics'] !== undefined){
						self.vinArray[ targetVehicleID ]['close_up_pics'] = sourceVehicleDoc['close_up_pics'];
					}
				
				} else {
					console.log( vehicle + ' / ' + self.vehicleLookupType + ' / ' + targetVehicleID + ': skipped');
				}
			}
		}
		

		if( self.pageDetails.sisterMods ){
			self.pageDetails.sisterMods(self.vinArray);
		}

        /**
         * Image replacing
		 * swap images using custom script for specific project/dealer
         */
		self.swapImages(self.vinArray );

		if( self.showModalButtonsOnSmallScreens === 1
			|| (
				window.screen.width > 500
				&& window.screen.height > 500
				&& ( document.body.offsetWidth > 500 || window.innerWidth > 500 )
				&& ( document.body.offsetHeight > 500 || window.innerHeight > 500 )
				)
			){
			self.paintButtons(self.vinArray); // place video button on top of each thumbnail. The button is clickable to pop open modal window
		} else {
			//console.log('Don\'t paint buttons on small screens');
		}

		if( self.refreshButtonsOnResize == true ){
			
			//console.log('self.refreshButtonsOnResize: ' + self.refreshButtonsOnResize);
			var refresh = function(){
				self.removeButtons(self.vinArray);
				
				if( self.showModalButtonsOnSmallScreens === 1
				|| (
					window.screen.width > 500
					&& window.screen.height > 500
					&& document.body.offsetWidth > 500
					&& ( document.body.offsetHeight > 500 || document.documentElement.offsetHeight > 500)
					)
				){
					self.paintButtons(self.vinArray); // place video button over of each thumbnail. The button is clickable to pop open modal window
				}
			
				// console.log(window.screen.width + ', ' + window.screen.height + ',' + document.body.offsetWidth + ',' + document.body.offsetWidth);	
			
			};
			
			window.addEventListener('orientationchange', function(){
				window.setTimeout(refresh, 250);
			}, false );
			window.addEventListener('resize', refresh, false );
		}

	};

      /**
       * Do ElasticSearch for vinArray and parseResults
       * @param vinArray - vin-object pairs
       */
	self.esQuery = function(vinArray) {
		self.vinArray = vinArray; // this allows vinArray argument to come from outside ThumbnailIntegration()
		self.project_id = document.getElementById('sistertech').getAttribute('data-projectid');
		self.project_id = self.project_id.replace('%E2%80%9C' , ''); //cleanup
		self.project_id = self.project_id.replace('%22' , ''); //%E2%80%9Cmp11439_052816%22

		var queryStringProjectIDs = ''; // parse string of comma-separated project ids, if necessary
		var project_id_array = self.project_id.split(',');
		for (var i = 0; i< project_id_array.length ; i++ ){
			if( project_id_array[i].trim().length > 0){
				queryStringProjectIDs += ' project_id:' + project_id_array[i].trim() + ' OR';
			}
		}
		queryStringProjectIDs = queryStringProjectIDs.substr(0 , (queryStringProjectIDs.length - 3) ); // drop the final " OR"
		
		var queryStringVINs = '';
		for (var vin in vinArray){
			if( vin.trim().length > 0){
                /**
				 * self.vehicleLookupType could be vin or stock_no
                 * @type {string}
                 */
				queryStringVINs += ' '+ self.vehicleLookupType +':' + vin + ' OR';
			}
		}		
		queryStringVINs = queryStringVINs.substr(0 , (queryStringVINs.length - 3) ); // drop the final " OR"
		// console.log("EZ360LG QS VA", queryStringVINs, vinArray);
		// add this if statement for some website that the VDP and SRP using the same head
		if(queryStringVINs !== ''){
			var searchUrl = self.baseEsUrl + '(' + queryStringProjectIDs + ') AND (' + queryStringVINs + ')';
			if( self.project_id == "holmanauto120821" ) {
				searchUrl = self.baseEsUrl + 'library_id:202107091519 AND (' + queryStringVINs + ')';
			}

			if( document.getElementById('sistertech').getAttribute('data-libraryid') &&  document.getElementById('sistertech').getAttribute('data-libraryid') != 'false'){
				if(self.project_id == "birchvw_01132021" || document.getElementById('sistertech').getAttribute('data-projectid') === 'birchvw_01132021') {
					self.libraryId = document.getElementById('sistertech').getAttribute('data-projectid').trim();
					searchUrl = self.baseEsUrl + 'project_id:'+self.project_id+' AND (' + queryStringVINs + ')';
				}
				else {
					// integration uses libraryId
					self.libraryId = document.getElementById('sistertech').getAttribute('data-libraryid').trim();
					searchUrl = self.baseEsUrl + 'library_id:'+self.libraryId+' AND (' + queryStringVINs + ')';	
				}
			}
			else{
				if(self.pageDetails.libraryId){
					searchUrl = self.baseEsUrl + 'library_id:'+self.libraryId+' AND (' + queryStringVINs + ')';
				}
			}

			//special case again for cleveland motorsports
			if( self.project_id == "clvmts_newpreown" ){
				searchUrl = self.baseEsUrl + 'library_id:20201208_1224 AND (' + queryStringVINs + ')';
			}

			/**
			 *  If not use projectID in ES query
			 */
			if( self.ignoreDealerID){
				searchUrl = self.baseEsUrl + '(' + queryStringVINs + ')';
			}

			if( self.project_id == "cotychv_evsdirect" ) {
				self.libraryId = "20210302_1120";
				searchUrl = self.baseEsUrl + 'library_id:'+self.libraryId+' AND (' + queryStringVINs + ')';
			}
			
			if( self.project_id == "galpinvolkswagen_011022") {
				self.libraryId = "20210202_1915";
				searchUrl = self.baseEsUrl + 'library_id:'+self.libraryId+' AND (' + queryStringVINs + ')';
			}

			// console.log(searchUrl,"CHK Search")
			self.xmlConn = {};

			if (window.XDomainRequest){ self.xmlConn = new XDomainRequest(); } 
			else if (window.XMLHttpRequest){ self.xmlConn = new XMLHttpRequest(); } 
			else { self.xmlConn = new ActiveXObject('Microsoft.XMLHTTP'); }
			if(window.XDomainRequest) {
				self.xmlConn.onload = function() {
					self.parseResults( JSON.parse( self.xmlConn.responseText ) );
				};
			} else if (window.XMLHttpRequest){
				self.xmlConn.onreadystatechange = function(){
					if (self.xmlConn.readyState === 4){
						if (self.xmlConn.status === 200){
							self.parseResults( JSON.parse( self.xmlConn.responseText ) );
						}
					}
				};
			}

			//console.log("EZ360LG SU", searchUrl);
			self.xmlConn.open('GET', searchUrl, true);
			self.xmlConn.send();
		}
	};


    /**
	 * Paint White Button, could be disabled by overwrite
     * @param vin
     * @param vinObject - the DOM object container correspond to the vin of the vehicle
     */
	self.paintButtonSingle = function( vin, vinObject ) {
	};//END paint button single


    /**
	 * Paint buttons for listing page
     * @param vinArray
     */
	self.paintButtons = function( vinArray ) {
		// console.dir(JSON.parse(JSON.stringify(vinArray)));
		
		for (var vin in vinArray){
			if( typeof vinArray[vin]['elements'] === 'object' ){
				for (var e = 0; e < vinArray[vin]['elements'].length; e++){
					// requires the project ID from the ES search result
					// || vinArray[vin]['interior_panorama']
					if( self.vinArray[vin].projectID
						&& (vinArray[vin]['fullmo_sis'] || vinArray[vin]['pic2vid_en_US'] || vinArray[vin]['spinit'])
					){
						if( vinArray[vin].src === undefined ){
							//console.dir(vinArray[vin]['elements'][e]);
						}
						//vinArray[vin]['elements'][i].src = vinArray[vin]['src'][i];
						
						// check if target image element has a src, otherwide button would paint over empty div and look bad
						// if no src, use nextSibling as target to place button on top of
						// this is a rare cases when there's a video to play, but no image used to replace 
						//console.log( vinArray[vin]['elements'][e].tagName + ', ' + vinArray[vin]['elements'][e].src);
						if( vinArray[vin]['elements'][e] && vinArray[vin]['elements'][e].tagName === 'IMG'
							&& (vinArray[vin]['elements'][e].src === undefined || vinArray[vin]['elements'][e].src === '' )
							){
							vinArray[vin]['elements'][e] = vinArray[vin]['elements'][e].nextSibling;
						}
						
						if( vinArray[vin]['elements'][e] ){
							//console.log(vin + ': (w,h) ' + vinArray[vin]['elements'][e].clientWidth + ', ' + vinArray[vin]['elements'][e].clientHeight);
							var button = self.paintButtonSingle( vin , vinArray[vin]['elements'][e] );			
							
							// in cases where website uses a custom button 
							if( button && self.pageDetails.paintButtonSingle ){
								(function(vin) { // create closure
									button.addEventListener('click' , function(e){
										sister_disabledEventPropagation(e);
										self.showMediaLayer( vin , self.vinArray[vin].projectID);
									} , false);
								}(vin));
							}

						}
					}
				}
			} // END if typeof vinArray[vin]['elements'] == 'object'
		}
	};

      /**
       * Remove white button for specified vin
       * @param vin
       * @param vinObject
       */
	self.removeButtonSingle = function(vin, vinObject){
		if( vinObject.parentNode.getElementsByClassName && vinObject.parentNode.getElementsByClassName('sister_svg')[0] ){
			var button = vinObject.parentNode.getElementsByClassName('sister_svg')[0].parentNode;
			if( button ){
				button.parentNode.removeChild( button );
			}
		}
	};

      /**
       * Removes white button
       * @param vinArray - Array of vins or 'all'
       * @returns {boolean}
       */
	self.removeButtons = function(vinArray){
		if( vinArray === 'all' ){
			var targets = document.getElementsByClassName('sister_svg');
			if(targets.length > 0){
				for(var i=0; i < targets.length; i++ ){
					targets[i].parentNode.removeChild( targets[i] );
				}
			}
			
			// check if we need to run this again ...
			targets = document.getElementsByClassName('sister_svg');
			if(targets.length > 0){
				self.removeButtons('all'); // run again until all buttons are removed
			}

			return false;
		}
		// if vinArray is an array ...

		for (var vin in vinArray){
			if( vinArray[vin]['fullmo_sis'] || vinArray[vin]['pic2vid_en_US'] || vinArray[vin]['spinit']){
				for (var e = 0; e < vinArray[vin]['elements'].length; e++){
					self.removeButtonSingle(vin, vinArray[vin]['elements'][e]);
				}
			}
		}
	};




	self.showMediaLayer = function (vin, project_id) {
		//console.log('vin: ' + vin + ', project_id:' + project_id);
		var modalContainer = document.createElement('div');
		modalContainer.style.height = document.body.offsetHeight + 'px';
		modalContainer.className = 'sister_modal';
		
		document.getElementsByTagName('body')[0].appendChild(modalContainer);
		
		if ( 'ontouchstart' in document.documentElement ) {
			modalContainer.addEventListener('touchend', function(event){
				self.sister_close(event); //
			});
		}
		
		if(window.navigator.msPointerEnabled){
			modalContainer.addEventListener('MSPointerDown', function(event){
				self.sister_close(event); //
			});
		}
		
		modalContainer.addEventListener('click', function(event){
			self.sister_close(event); //
		});
	
		window.addEventListener('keyup', function(event){
			//console.dir(event);
			var code = (event['keyCode'] ? event['keyCode'] : event['which']);
			if(code === 27){ // escape key
				self.sister_close(event); //console.log('closing with escape');
			}
		});

		self.injectiframe(vin, project_id, modalContainer, 99, self.iFrameParameters ); // add iframe it to modal popup

	};



	self.injectiframe = function(vin, project_id, container, instance, parameters){
		//console.log('vin: ' + vin + ', project_id: ' + project_id);
		var width = Number(container.offsetWidth); // works in iOS
		//var width = jq(container).width(); // jquery style //console.log('width: ' + jq(container).width());
		if( width > self.modal_iframe_width_max ){
			width = self.modal_iframe_width_max;
		}
		
		var height_additional = 120; // default for smallest 1 gallery row
		
		if(width > 460){
			height_additional = 129; // compensate for svg icons
		}

		if(width > 551){
			height_additional = 140; // compensate for svg icons
		}

		/* maybe useful in certain case?
		var rows = Math.floor(self.vinArray[vin].imageCount / 6);
		if( window.screen.height > 800 ){ // modal overlay instance AND only if screen is large enough
			height_additional += ( rows * 70); // tall enough to show 3 more gallery rows (4 gallery rows total)
		}
		*/
		//console.log( 'images: ' + self.vinArray[vin].imageCount + ', rows: ' + rows + ', additional height:' + height_additional );
		var iframeWidth = width;
		var iframeHeight = Math.floor(width * 9/16 + height_additional);
		//console.log('height_additional: ' + height_additional + ', iframeHeight: ' + iframeHeight);
		if( parameters && Object.keys( parameters ).length > 0){ // override default parameters
			for( var p in parameters){
				if(self.iframeParameters[p]){
					self.iframeParameters[p] = parameters[p];
				}
			}
		}

		//build iframe URL parameter query string
		var ParametersQueryString = '';
		for( p in self.iframeParameters ){
			ParametersQueryString += '&'+ p + '=' + self.iframeParameters[p];
		}
		console.log('EZ360LG iframeWidth: ' + iframeWidth);
		// reference to 
		var iframeCode = '<div class="sister_iframe"><svg id="modal_button" role="img" viewBox="0 0 100 70" class="svg"><use xlink:href="'+window.location.href
			.replace(window.location.hash, '')+'#iconClose" /></svg><iframe style="position: relative; z-index:1; display: inline-block; height:' + iframeHeight + 'px;" id="mliframe_'+instance+'" scrolling="no" src="https://demos.sister.tv/qa/ivana_player/index.html?projectid=' + project_id + '&vin=' + self.vinArray[vin]['vin'] + ParametersQueryString + '" frameborder="0" height="' + iframeHeight + '" width="' + iframeWidth + '"></iframe></div>';
		container.style.padding = 0;
		container.innerHTML = iframeCode;
		container.getElementsByClassName('sister_iframe')[0].style.left = Math.floor( (Number(document.getElementsByTagName('body')[0].offsetWidth) - Number(width)) / 2 ) + 'px';
		//console.log('body width: ' + Number(document.getElementsByTagName('body')[0].offsetWidth) + ', width: ' + Number(width) + ', left: ' + container.getElementsByClassName('sister_iframe')[0].style.left);
		self.resizer(container, document.getElementById('mliframe_'+instance)); // resize now to check placement
		

		if(document.addEventListener !== false){// check for addEventListener support

			if ( 'ontouchstart' in document.documentElement ) {
				console.log('modal_button: using addEventListener(\'touchend\')');
				document.getElementById('modal_button').addEventListener('touchend', function(event){
					console.log('closing with touch');
					self.sister_close(event);
				});
			} else if(window.navigator.msPointerEnabled){
				console.log('modal_button: using addEventListener(\'MSPointerDown\')');
				document.getElementById('modal_button').addEventListener('MSPointerDown', function(event){
					console.log('closing with MSPointerDown');
					self.sister_close(event);
				});
			} else {
				console.log('modal_button: using addEventListener(\'click\')');
				document.getElementById('modal_button').addEventListener('click', function(event){
					console.log('closing with click');
					self.sister_close(event);
				});
			}
		} else {
			console.log( 'modal_button: document.addEventListener is not supported' );
		}
		
		
		window.addEventListener('resize', function(){ // set resize event for each instance of mediaLayer
			self.resizer(container, document.getElementById('mliframe_'+instance));
		});


		if('onorientationchange' in window) {
			window.addEventListener('orientationchange', function() {
				self.resizer(container, document.getElementById('mliframe_'+instance));
			}, false);
		}

	};


	self.resizer = function(container, iframe){
		// use screen size to determine if modal media layer should be available
		
		if(iframe){
			container.getElementsByClassName('sister_iframe')[0].style.top = 50 + 'px'; // allow some space at top of screen

			// close modal overlay if screen is too small ...

			var width = window.innerWidth; // width of screen
			if( window.screen.width < width){
				width = window.screen.width;
			}

			if( width > self.modal_iframe_width_max ){
				width = self.modal_iframe_width_max; // maximum width of modal media layer
			}
			var height_additional = 120; // default for smallest 1 gallery row
			
			if(width > 460){
				height_additional = 129; // compensate for svg icons
			}

			if(width > 551){
				height_additional = 140; // compensate for svg icons
			}

			/*
			var rows = Math.floor(self.vinArray[vin].imageCount / 6);
			if( window.screen.height > 800  && window.innerHeight > 800){ // modal overlay instance AND only if screen is large enough
				height_additional += ( rows * 70); // tall enough to show all the gallery rows
			}
			*/
			
			
			var height = Math.floor(width * 9/16 + height_additional); // 135 is the height of media layer's player_navigation div at smallest size
			if( window.innerHeight < height){
				height = window.innerHeight;
				width = Math.ceil( height - height_additional / 9/16 ); // update width based on revised height
			}
			//console.log('width: ' + width);
			
			var iframeHeight = Math.floor(width * 9/16 + height_additional );
		
			if( window.screen.height < height){
				height = Number(window.screen.height); // get smallest measure of visitor's screen
				width = Math.ceil( (height - height_additional) / 9/16 ); // update width based on revised height
			}

			if( width > self.modal_iframe_width_max ){
				width = self.modal_iframe_width_max; // maximum width of modal media layer
			}
			

			if(height < 500){
				container.getElementsByClassName('sister_iframe')[0].style.top = 0 + 'px'; // move to top for shallow screens
			}


			iframe.width = width + 'px';
			iframe.height = height + 'px'; //height of navigation buttons + gallery
			
			// update iframe inline style parameters
			iframe.style.width = width + 'px';
			iframe.style.height = height + 'px'; //height of navigation buttons + gallery (2 rows of thumbs) - 153 shows 1 row -- 153 = 4 rows


			//console.log('body width: ' + Number(document.getElementsByTagName('body')[0].offsetWidth) + ', width: ' + width);
			container.getElementsByClassName('sister_iframe')[0].style.left = Math.floor( (Number(window.innerWidth) - Number(width)) / 2 ) + 'px'; // center iframe on screen
			container.getElementsByTagName('iframe')[0].style.height = height + 'px';
			container.getElementsByTagName('iframe')[0].height = height + 'px';
		}
	};




	self.sister_close = function(event){
		console.log('running sister_close ...');
		sister_disabledEventPropagation(event); // prevent same event (click/touch) from working on layer below (modal background)console.log('closing ...' + event);
		var modal = document.getElementsByClassName('sister_modal')[0];
		console.log('removing modal' );
		if(modal && modal.parentNode){
			modal.parentNode.removeChild(modal);
			console.log('modal removed' );
		} else {
			console.log('undefined: document.getElementsByClassName(\'sister_modal\')[0]');
		}
	};



	self.returnImage = function(src) {
		/* In this case we are sending the list of images under same VIN and called consecutively */
		// console.log(EZ360_ARGS);
		if(typeof EZ360_ARGS != 'undefined' && EZ360_ARGS.isSRPCarousel == true) {
			iSRPimagesArray = []
			// force https if sistertech content
			if (src['display_pics'].length > 0 && src['display_pics'][0].includes("ez360")){
				src['display_pics'].forEach(element => {
					iSRPimagesArray.push(element.replace('http://','https://'));
				});
				return iSRPimagesArray;
			}

			if (src['spin_pics']){
				if (src['spin_pics'].length > 0){
					if (src['spin_pics'][0].length > 0 && src['spin_pics'][0][0].includes("ez360")){
						src['spin_pics'][0].forEach(element => {
							iSRPimagesArray.push(element.replace('http://','https://'));
						});
						return iSRPimagesArray;
					}
				}
			}

			if (src['spin_detail_pics']){
				if (src['spin_detail_pics'].length > 0){
					if (src['spin_detail_pics'][0].length > 0 && src['spin_detail_pics'][0][0].includes("ez360")){
						src['spin_detail_pics'][0].forEach(element => {
							iSRPimagesArray.push(element.replace('http://','https://'));
						});
						return iSRPimagesArray;
					}
				}
			}

			if (src['detail_pics']){
				if (src['detail_pics'].length > 0 && src['detail_pics'][0].includes("ez360")){
					src['detail_pics'].forEach(element => {
						iSRPimagesArray.push(element.replace('http://','https://'));
					});
					return iSRPimagesArray;
				}
			}
		}
		else {
			// force https if sistertech content
			if (src['display_pics']){
				if (src['display_pics'].length > 0 && src['display_pics'][0].includes("ez360")){
					return [src['display_pics'][0].replace('http://','https://')];
				}
			}

			if (src['spin_pics']){
				if (src['spin_pics'].length > 0){
					if (src['spin_pics'][0].length > 0 && src['spin_pics'][0][0].includes("ez360")){
						return [src['spin_pics'][0][0].replace('http://','https://')];
					}
				}
			}

			if (src['spin_detail_pics']){
				if (src['spin_detail_pics'].length > 0){
					if (src['spin_detail_pics'][0].length > 0 && src['spin_detail_pics'][0][0].includes("ez360")){
						return [src['spin_detail_pics'][0][0].replace('http://','https://')];
					}
				}
			}

			if (src['detail_pics']){
				if (src['detail_pics'].length > 0 && src['detail_pics'][0].includes("ez360")){
					return [src['detail_pics'][0].replace('http://','https://')];
				}
			}
		}
		return null;
	};


	self.getSVGfile = function(file){
        var xmlconn = undefined;

	    if( document.getElementsByClassName('svg-defs').length > 0 ){ // check if already on page
			return;
		}
		var div = document.createElement('div');
		div.className = 'svg-defs';
		div.style.display = 'none';
		document.body.insertBefore(div, document.body.childNodes[0]); //console.log(file + ' loaded');
		if (window.XDomainRequest){ xmlconn = new XDomainRequest(); } // IE 7, 8, 9
		else if (window.XMLHttpRequest){ xmlconn = new XMLHttpRequest(); } 
		else { xmlconn = new ActiveXObject('Microsoft.XMLHTTP'); } // IE 5, 6

		if(window.XDomainRequest) { // IE 7, 8, 9
			xmlconn.onload = function() {
				div.innerHTML = xmlconn.responseText; // place svg inline
			};
		} else if (window.XMLHttpRequest){
			xmlconn.onreadystatechange=function(){
				if (xmlconn.readyState === 4){
					if (xmlconn.status === 200){
						div.innerHTML = xmlconn.responseText; // place svg inline
					}
				}
			};
		}
		//console.log( file );
		xmlconn.open('GET', file, true);
		xmlconn.send();
	};


	self.appendStyles = function(){
		if( document.getElementById('sister-styles') ){ // check if already on page
			return;
		} // END if not already on page
		var styleCode = document.createElement('style');
		styleCode.id = 'sister-styles';
		styleCode.innerHTML = 'html{height:100%;} use{pointer-events: none;} .sister_iframe{width: auto; height: auto; max-width:'+ self.modal_iframe_width_max +'px; position: fixed; z-index: 1;} .sister_iframe svg{cursor: pointer; position: absolute; z-index:10; height: 50px; width: 50px; top:0; right:0; fill: rgb(255,255,255); fill: rgba(255,255,255,.5);}.sister_iframe svg:hover{fill: rgba(255,255,255, 1);} .sister_modal{top: 0; left: 0; bottom: 0; min-height: 10000px; height: 100%; width: 100%; background-color: #000000; background-color: rgba(0,0,0,0.8); text-align: center; position: fixed; z-index: 9000000;} .sister_modal .sister_iframe{ top: 50px; width: auto; background-color: #ffffff; box-shadow: 0px 0px 20px #000;} .sister_modal .sister_iframe iframe{ top: 0px;} .sister_svg {opacity: 0.7; filter=\'alpha(opacity=0.7)\';} .sister_svg:hover{opacity: 1 !important; filter=\'alpha(opacity=1)\' !important;}';
		var pageHead = document.head || document.getElementsByTagName('head')[0];
		pageHead.appendChild(styleCode);
	};

    /**
	 * Get Script Content from Url and insert at the first line of <head> wrapped with <script></script>
     * @param {string} url - the Url of Script to be loaded
     * @param {function} callback - ready()
     */
	self.loadScript = function(url,callback){ // parse javascript file and inject code inline

		var xmlconn = undefined;

		if(!url || !(typeof url === 'string')){
			return;
		}
		if( document.getElementById('sister-script') ){ // check if already on page
			if (callback){callback();}
			return;
		}

		//Not exist then create
		var script = document.createElement('script');
		script.id = 'sister-script';

		//For different browser, setup HTTP Request
		if (window.XDomainRequest){ xmlconn = new XDomainRequest(); } // IE 7, 8, 9
		else if (window.XMLHttpRequest){ xmlconn = new XMLHttpRequest(); } 
		else { xmlconn = new ActiveXObject('Microsoft.XMLHTTP'); } // IE 5, 6

		if(window.XDomainRequest) { // IE 7, 8, 9
			xmlconn.onload = function() {
				script.innerHTML = xmlconn.responseText; // place svg inline
				document.body.insertBefore(script, document.body.childNodes[0]); //console.log(file + ' loaded');
				if (callback){callback();}
			};
		}
		else if (window.XMLHttpRequest){
			xmlconn.onreadystatechange = function(){
				//console.log(vlu_obj['xmlhttp'].readyState)
				if (xmlconn.readyState === 4){
					if (xmlconn.status === 200){
						script.innerHTML = xmlconn.responseText; // place svg inline
						document.body.insertBefore(script, document.body.childNodes[0]); //console.log(file + ' loaded');
						if (callback){callback();}
					}
				}
			};
		}

		//console.log( searchUrl );
		xmlconn.open('GET', url, true);	//async as default
		xmlconn.send();

	};


	self.getThumbnailUrl = function( origUrl ) {
		var postHttp = origUrl.split('//')[1];
		var bucket = postHttp.split('/')[0];
		if (bucket.indexOf('sistertech') === -1 && postHttp.split('/')[1].indexOf('sistertech') === -1){
			console.log('sistertech not found in either domain or root directory');
			return origUrl; // 'sistertech' not found in either domain or root directory
		}
		var urlArray = postHttp.split('/');
		urlArray.shift();
		var fullThumbUrl = 'https://thumbnail.sister.tv/' + bucket.split('.')[0] + '/' + urlArray.join('/').replace('.jpg', '.thumb.jpg');
		//console.log(fullThumbUrl);
		fullThumbUrl = fullThumbUrl.replace('/s3/' , '/'); // fix for URLs with sistertech in root
		// return fullThumbUrl;
		return fullThumbUrl;
	};

     /**
      * Image replacing
      * @param vinArray - the (vin : object) pairs
      */
      //TODO ti.vinArray vs ti.pageDetails.getVinArray() difference
	self.swapImages = function( vinArray ){
		// console.log("Nilesh Before Loop 1 - ", self.project_id, vinArray);
		for (var vin in vinArray){
			// console.log("Nilesh Before Loop 2 - ", vin, vinArray);
			for (var i=0; i < vinArray[vin]['elements'].length; i++){
				// console.log("Nilesh Before If 1 - ", self.project_id, vinArray, vinArray[vin]['src'], vinArray[vin]['src'][i], vinArray[vin]['elements'][i]);
				if( vinArray[vin]['src'] && vinArray[vin]['src'][i] && vinArray[vin]['elements'][i]){
					var target;
					// console.log("Nilesh Project Id - ", vinArray[vin]['src'][i]);
					// if(vinArray[vin]['src'][i].includes("https://") === false){
					// 	console.log("returned ", vinArray[vin]['src'][i]);
					// 	continue;
					// }
					/* Reducing Size of the loaded SRP Images */
					if(vinArray[vin]['src'][i].includes("?") && vinArray[vin]['src'][i].includes("ez360")) {
						if(vinArray[vin]['src'][i].includes("mark-h")) {
							vinArray[vin]['src'][i] = vinArray[vin]['src'][i]+"&mark-h=500";
							vinArray[vin]['src'][i] = vinArray[vin]['src'][i]+"&mark-w=auto";
							vinArray[vin]['src'][i] = vinArray[vin]['src'][i]+"&h=500";
						}
						vinArray[vin]['src'][i] = vinArray[vin]['src'][i]+"&h=500";
					}
					else if(vinArray[vin]['src'][i].includes("ez360")){
						vinArray[vin]['src'][i] = vinArray[vin]['src'][i]+"?h=500";
					}
					if(vinArray[vin]['elements'][i].tagName === 'IMG'){
						//console.log( vinArray[vin]['elements'][i] );
						//console.log(vin + ': tagName == IMG, swapping direct .src : ' + vinArray[vin]['src'][i]);
						//console.dir( vinArray[vin]['elements'][i] );
						//console.log(vin + ': swapping via element: EZ360LG ' + vinArray[vin]['src'][i] );
						target = vinArray[vin]['elements'][i];
						vinArray[vin]['elements'][i].src = vinArray[vin]['src'][i];
						//console.dir( vinArray[vin]['elements'][i] );
					} else if(vinArray[vin]['bg']){
						vinArray[vin]['elements'][i].style.backgroundImage = 'url(' + vinArray[vin]['src'][i] + ')';
					} else if(vinArray[vin]['elements'][i].getElementsByTagName('img')[0]){
						//console.log(vin + ': EZ360LG swapping via .getElementsByTagName: ' + vinArray[vin]['src'][i] );
                        //TODO 'cannot set property "src" of undefined'
						target = vinArray[vin]['elements'][i].getElementsByTagName('img')[0];
						if(target.classList.contains("ez360bannerAdded") == undefined || target.classList.contains("ez360bannerAdded")==null || target.classList.contains("ez360bannerAdded") == false){
							console.log("EZ360LG VIN", vinArray[vin])
							vinArray[vin]['elements'][i].getElementsByTagName('img')[0].src = vinArray[vin]['src'][i];
						}
					}
					else if(vinArray[vin]['elements'][i].tagName === 'SOURCE'){
						target = vinArray[vin]['elements'][i];
						try {
							vinArray[vin]['elements'][i].src = vinArray[vin]['src'][i];
							vinArray[vin]['elements'][i].setAttribute("srcset",vinArray[vin]['src'][i]);
						} catch (error) {
							console.log("Cannot replace src or srcset for tag source");
						}
					}

					if(vinArray[vin]['elements'][i].getElementsByTagName('img').length > 0){
						vinArray[vin]['elements'][i].getElementsByTagName('img')[0].style.height = 'auto'; // allow img container to adjust height
						//console.log(self.project_id, " -- Nilesh ProjectID EZ360LG" );
						/*
						if(self.project_id == "kunilexusofportland_071221"){
							var img = vinArray[vin]['elements'][i].getElementsByTagName('img')[0];
							//console.log("found lexus checking load");
							img.onload = function() {								
								var ration = (this.width/this.height).toFixed(2);
								//console.log("Ratio is ", ration);
								if(ration>1.60){
									var isAdded = this.parentNode.querySelector(".ez360bannerAdded");
									if(isAdded == undefined || isAdded==null){
										var tempimg = document.createElement('div');
										tempimg.innerHTML = 'KUNI LEXUS OF PORTLAND';
										tempimg.className = 'ez360bannerAdded';
										tempimg.style.textAlign = 'center';
										tempimg.style.width = '100%';
										tempimg.style.fontSize = '141%';
										tempimg.style.color = "#fff";
										tempimg.style.paddingBottom = '12px';
										tempimg.style.paddingTop = '12px';
										tempimg.style.background = '#555';
										this.parentNode.prepend(tempimg);
									}
									//this.style.paddingTop = '18%'; // allow img
									//this.style.paddingBottom = '17%'; // allow img
								}else if(ration>=1.34){
									this.style.paddingTop = '8%'; // allow img
									this.style.paddingBottom = '8%'; // allow img
								}else
									console.log("EZ360LG ratio - Do not match");
							}
						}
						*/
						if(self.project_id == "holmanauto120821" || self.project_id == "kunilexusofportland_071221"){
							var img = vinArray[vin]['elements'][i].getElementsByTagName('img')[0];
							//console.log("found lexus checking load");
							img.onload = function() {								
								var ration = (this.width/this.height).toFixed(2);
								console.log("Ratio is ", ration);
								if(ration>1.60){
									var isAdded = this.classList.contains("ez360bannerAdded");
									if(isAdded == undefined || isAdded==null || isAdded==false){
										//console.log("EZ360LG bannerclass Added once");
										this.parentNode.parentNode.setAttribute("style", "background:url('"+this.getAttribute("src")+"'); background-size: contain; background-position-y:center;");
										var tempimg = document.createElement('img');
										if(this.getAttribute("src").indexOf("kunilexusofportland")>0 || this.getAttribute("alt").indexOf("lexus")>0 || self.project_id == "kunilexusofportland_071221")
											tempimg.setAttribute("src", 'https://sdk.sister.tv/img/Kuni-Lexus-Overlay.png');
										else if(this.getAttribute("src").indexOf("kunibmw")>0 || this.getAttribute("alt").indexOf("bmw")>0)
											tempimg.setAttribute("src", 'https://sdk.sister.tv/img/Kuni-BMW-Overlay.png');
										else 
											tempimg.setAttribute("src", 'https://sdk.sister.tv/img/Kuni-BMW-Overlay.png');
											
										this.parentNode.parentNode.append(tempimg);
										this.parentNode.style.display = "none";
										this.classList.add("ez360bannerAdded");
									}else{
										//console.log("EZ360LG bannerclass found");
									}
									//this.style.paddingTop = '18%'; // allow img
									//this.style.paddingBottom = '17%'; // allow img
								}else if(ration>=1.34){
									this.style.paddingTop = '8%'; // allow img
									this.style.paddingBottom = '8%'; // allow img
								}else
									console.log("EZ360LG Ratio - Do not match");
							}
						}
					}
					
					if(self.project_id == "jimshorkeykia_022422"){
						var allCntr = document.querySelectorAll(".img-container"); 
						for (let i = 0; i < allCntr.length; i++) {
							var src = allCntr[i].querySelector("img").getAttribute("src");
							if(src != null && src != undefined ){
								if(src.split("ez360").length>1)
									allCntr[i].style.cssText = "background: #fff;";
							}
							
						}
						var allViews = document.querySelectorAll(".vehicle-views"); 
						for (let i = 0; i < allViews.length; i++) {
							var src = allCntr[i].querySelector("img").getAttribute("src");
							if(src != null && src != undefined ){
								if(src.split("ez360").length>1)
									allViews[i].style.cssText = "display: inline-block; width: 100%; height: auto; position: absolute; top: 12%;";
							}
						}   
					}

					// strip data-src if necessary (DDC)
					if( vinArray[vin]['data-src'] && vinArray[vin]['data-src'][i] ){
						vinArray[vin]['data-src'][i].setAttribute('data-src','');
						console.log(vin + ': stripping data-src');
						
					}
					
					// hide original img tags if necessary
					if(vinArray[vin]['elements'][i].parentNode.getElementsByClassName('sisterLegacy')[0]){
						vinArray[vin]['elements'][i].parentNode.getElementsByClassName('sisterLegacy')[0].style.display = 'none';
					}

					var srpVIN = JSON.parse(JSON.stringify(vin));
					if(vinArray[vin]['shroomInteractionElements'] !== undefined) {
						vinArray[vin]['shroomInteractionElements'][0].style.position = "relative"
						var shroomImg = document.createElement("img");
						shroomImg.style.cssText = "width: 20px;right: 20px;position: absolute;cursor: pointer";
						shroomImg.classList.add("shroom-srp-icon");
						shroomImg.setAttribute("srp-shroom-vin", srpVIN);
						shroomImg.src = 'https://sdk.sister.tv/integrations/cvdp/img/ez360Logo.png';
						shroomImg.onclick = function() {
							EZ360_ARGS.vin = this.getAttribute('srp-shroom-vin');
							_showShroomPlayer();
						}
						if(vinArray[vin]['shroomInteractionElements'][0].querySelector(".shroom-srp-icon") === null && vinArray[vin]['spinit'] == true) {
							vinArray[vin]['shroomInteractionElements'][0].appendChild(shroomImg);
						}
					}

					/* If Shroom Enabled we show POI on the thumbnail of the website itself */
					if(self.srpUtilitiesLoaded == true && vin == "3VWC57BU2KM165262") {
						var srpUtilObj = new SRPUtilities();
						// console.log(vinArray[vin][elements])
						var img = vinArray[vin]['elements'][0];
						console.log(img)
						EZ360_ARGS.ratio = parseFloat(img.naturalHeight/img.naturalWidth).toFixed(2);
						srpUtilObj.createSRPShroomMarker(img.parentElement.parentElement.parentElement, self.project_id, vin);
					}
					else {
						console.log("not loaded", vin);
					}
				} // END if image exists to use
						
			}
		}
	}; // END swapImages
		
	self.ez360LoadSRPScript = (url, callback = null) => {
		if(document.querySelector('script[src="' + url + '"]')){
			document.querySelector('script[src="' + url + '"]').remove();
		}
		var script = document.createElement( "script" )
		script.type = "text/javascript";
		var idscript = Math.floor(Math.random() * 10000) + 1;
		script.id = idscript;
		script.src = url;
		document.getElementsByTagName( "body" )[0].appendChild( script );
		console.log("preparing script...");
		var scr = document.getElementById(idscript);
		scr.addEventListener("load",() => {
			if(callback !== null) {
				callback();
				console.log(callback);
			}
		});
	}

    /**
	 * Check single vehicle to see if thumbnail src matches src in vinObject
     * @param vinObject vin number of single vehicle
     */
	self.checkImgSrc = function(vinObject){
		if( vinObject.src !== undefined ){
			for (var i=0; i < vinObject.elements.length; i++){
				var targetElement = vinObject.elements[i];
				if(vinObject.elements[i] && vinObject.elements[i].tagName !== 'IMG'){ // incase element is an a (anchor) tag
					targetElement = vinObject.elements[i].getElementsByTagName('img')[0]; // if base image is a child inside vinObject
				}

				if( targetElement !== undefined && targetElement.src != vinObject.src){
					//console.log( vinObject.vin + ': ' + targetElement.src + ' / ' + vinObject.src);
					targetElement.src = vinObject.src[i];
				}
				if (targetElement !== undefined && targetElement.getAttribute('srcset') !== vinObject.src){
					targetElement.setAttribute('srcset', vinObject.src[i]);
				}
			}
		}
	};
	

    /**
	 * iterate through vinObject array, make sure each thumbnail is using correct image src
     * @param vehicles vinArray of current page
     */
	self.checkImgSources = function( vehicles ){
		if( typeof vehicles === 'object' ){
			for (var i=0; i < Object.keys( vehicles ).length; i++){
				self.checkImgSrc( vehicles[Object.keys( vehicles )[i]] );
			}
		}
	};
	
	// run this every 2 seconds checking for images with wrong source
	setInterval( function(){self.checkImgSources( self.vinArray ); } , 1000);
	
		
}

var sister_disabledEventPropagation = function(event){
	
	if(event.preventDefault){
		event.preventDefault();//console.log('running preventDefault');
	} else {
		//console.log('not running preventDefault');
	}
	
	if (event.stopPropagation){
		event.stopPropagation(); //console.log('stopping propogation');
	} else if(window.event){
		window.event.cancelBubble=true; //console.log('stopping cancelBubble');
	} else {
		//console.log('not stopping propogation and not cancelling bubble');
	}

};


var ti = new ThumbnailIntegration();
ti.init();