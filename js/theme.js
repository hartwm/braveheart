// /*!
//  * fullPage 3.0.4
//  * https://github.com/alvarotrigo/fullPage.js
//  *
//  * @license GPLv3 for open source use only
//  * or Fullpage Commercial License for commercial use
//  * http://alvarotrigo.com/fullPage/pricing/
//  *
//  * Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
//  */
// (function (root, window, document, factory, undefined) {
// 	if (typeof define === 'function' && define.amd) {
// 		// AMD. Register as an anonymous module.
// 		define(function () {
// 			root.fullpage = factory(window, document);
// 			return root.fullpage;
// 		});
// 	} else if (typeof exports === 'object') {
// 		// Node. Does not work with strict CommonJS.
// 		module.exports = factory(window, document);
// 	} else {
// 		// Browser globals.
// 		window.fullpage = factory(window, document);
// 	}
// }(this, window, document, function (window, document) {
// 	'use strict';

// 	// keeping central set of classnames and selectors
// 	var WRAPPER = 'fullpage-wrapper';
// 	var WRAPPER_SEL = '.' + WRAPPER;

// 	// slimscroll
// 	var SCROLLABLE = 'fp-scrollable';
// 	var SCROLLABLE_SEL = '.' + SCROLLABLE;

// 	// util
// 	var RESPONSIVE = 'fp-responsive';
// 	var NO_TRANSITION = 'fp-notransition';
// 	var DESTROYED = 'fp-destroyed';
// 	var ENABLED = 'fp-enabled';
// 	var VIEWING_PREFIX = 'fp-viewing';
// 	var ACTIVE = 'active';
// 	var ACTIVE_SEL = '.' + ACTIVE;
// 	var COMPLETELY = 'fp-completely';
// 	var COMPLETELY_SEL = '.' + COMPLETELY;

// 	// section
// 	var SECTION_DEFAULT_SEL = '.section';
// 	var SECTION = 'fp-section';
// 	var SECTION_SEL = '.' + SECTION;
// 	var SECTION_ACTIVE_SEL = SECTION_SEL + ACTIVE_SEL;
// 	var TABLE_CELL = 'fp-tableCell';
// 	var TABLE_CELL_SEL = '.' + TABLE_CELL;
// 	var AUTO_HEIGHT = 'fp-auto-height';
// 	var AUTO_HEIGHT_SEL = '.' + AUTO_HEIGHT;
// 	var NORMAL_SCROLL = 'fp-normal-scroll';
// 	var NORMAL_SCROLL_SEL = '.' + NORMAL_SCROLL;

// 	// section nav
// 	var SECTION_NAV = 'fp-nav';
// 	var SECTION_NAV_SEL = '#' + SECTION_NAV;
// 	var SECTION_NAV_TOOLTIP = 'fp-tooltip';
// 	var SECTION_NAV_TOOLTIP_SEL = '.' + SECTION_NAV_TOOLTIP;
// 	var SHOW_ACTIVE_TOOLTIP = 'fp-show-active';

// 	// slide
// 	var SLIDE_DEFAULT_SEL = '.slide';
// 	var SLIDE = 'fp-slide';
// 	var SLIDE_SEL = '.' + SLIDE;
// 	var SLIDE_ACTIVE_SEL = SLIDE_SEL + ACTIVE_SEL;
// 	var SLIDES_WRAPPER = 'fp-slides';
// 	var SLIDES_WRAPPER_SEL = '.' + SLIDES_WRAPPER;
// 	var SLIDES_CONTAINER = 'fp-slidesContainer';
// 	var SLIDES_CONTAINER_SEL = '.' + SLIDES_CONTAINER;
// 	var TABLE = 'fp-table';

// 	// slide nav
// 	var SLIDES_NAV = 'fp-slidesNav';
// 	var SLIDES_NAV_SEL = '.' + SLIDES_NAV;
// 	var SLIDES_NAV_LINK_SEL = SLIDES_NAV_SEL + ' a';
// 	var SLIDES_ARROW = 'fp-controlArrow';
// 	var SLIDES_ARROW_SEL = '.' + SLIDES_ARROW;
// 	var SLIDES_PREV = 'fp-prev';
// 	var SLIDES_PREV_SEL = '.' + SLIDES_PREV;
// 	var SLIDES_ARROW_PREV = SLIDES_ARROW + ' ' + SLIDES_PREV;
// 	var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
// 	var SLIDES_NEXT = 'fp-next';
// 	var SLIDES_NEXT_SEL = '.' + SLIDES_NEXT;
// 	var SLIDES_ARROW_NEXT = SLIDES_ARROW + ' ' + SLIDES_NEXT;
// 	var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;

// 	function initialise(containerSelector, options) {
// 		var isOK = options && new RegExp('([\\d\\w]{8}-){3}[\\d\\w]{8}|^(?=.*?[A-Y])(?=.*?[a-y])(?=.*?[0-8])(?=.*?[#?!@$%^&*-]).{8,}$').test(options['li' + 'cen' + 'seK' + 'e' + 'y']) || document.domain.indexOf('al' + 'varotri' + 'go' + '.' + 'com') > -1;

// 		//only once my friend!
// 		if (hasClass($('html'), ENABLED)) { displayWarnings(); return; }

// 		// common jQuery objects
// 		var $htmlBody = $('html, body');
// 		var $body = $('body')[0];

// 		var FP = {};

// 		// Creating some defaults, extending them with any options that were provided
// 		options = deepExtend({
// 			//navigation
// 			menu: false,
// 			anchors: [],
// 			lockAnchors: false,
// 			navigation: false,
// 			navigationPosition: 'right',
// 			navigationTooltips: [],
// 			showActiveTooltip: false,
// 			slidesNavigation: false,
// 			slidesNavPosition: 'bottom',
// 			scrollBar: false,
// 			hybrid: false,

// 			//scrolling
// 			css3: true,
// 			scrollingSpeed: 700,
// 			autoScrolling: true,
// 			fitToSection: true,
// 			fitToSectionDelay: 1000,
// 			easing: 'easeInOutCubic',
// 			easingcss3: 'ease',
// 			loopBottom: false,
// 			loopTop: false,
// 			loopHorizontal: true,
// 			continuousVertical: false,
// 			continuousHorizontal: false,
// 			scrollHorizontally: false,
// 			interlockedSlides: false,
// 			dragAndMove: false,
// 			offsetSections: false,
// 			resetSliders: false,
// 			fadingEffect: false,
// 			normalScrollElements: null,
// 			scrollOverflow: false,
// 			scrollOverflowReset: false,
// 			scrollOverflowHandler: window.fp_scrolloverflow ? window.fp_scrolloverflow.iscrollHandler : null,
// 			scrollOverflowOptions: null,
// 			touchSensitivity: 5,
// 			normalScrollElementTouchThreshold: 5,
// 			bigSectionsDestination: null,

// 			//Accessibility
// 			keyboardScrolling: true,
// 			animateAnchor: true,
// 			recordHistory: true,

// 			//design
// 			controlArrows: true,
// 			controlArrowColor: '#fff',
// 			verticalCentered: true,
// 			sectionsColor: [],
// 			paddingTop: 0,
// 			paddingBottom: 0,
// 			fixedElements: null,
// 			responsive: 0, //backwards compabitility with responsiveWiddth
// 			responsiveWidth: 0,
// 			responsiveHeight: 0,
// 			responsiveSlides: false,
// 			parallax: false,
// 			parallaxOptions: {
// 				type: 'reveal',
// 				percentage: 62,
// 				property: 'translate'
// 			},

// 			//Custom selectors
// 			sectionSelector: SECTION_DEFAULT_SEL,
// 			slideSelector: SLIDE_DEFAULT_SEL,

// 			//events
// 			v2compatible: false,
// 			afterLoad: null,
// 			onLeave: null,
// 			afterRender: null,
// 			afterResize: null,
// 			afterReBuild: null,
// 			afterSlideLoad: null,
// 			onSlideLeave: null,
// 			afterResponsive: null,

// 			lazyLoading: true
// 		}, options);

// 		//flag to avoid very fast sliding for landscape sliders
// 		var slideMoving = false;

// 		var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
// 		var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
// 		var container = typeof containerSelector === 'string' ? $(containerSelector)[0] : containerSelector;
// 		var windowsHeight = getWindowHeight();
// 		var isResizing = false;
// 		var isWindowFocused = true;
// 		var lastScrolledDestiny;
// 		var lastScrolledSlide;
// 		var canScroll = true;
// 		var scrollings = [];
// 		var controlPressed;
// 		var startingSection;
// 		var isScrollAllowed = {};
// 		isScrollAllowed.m = { 'up': true, 'down': true, 'left': true, 'right': true };
// 		isScrollAllowed.k = deepExtend({}, isScrollAllowed.m);
// 		var MSPointer = getMSPointer();
// 		var events = {
// 			touchmove: 'ontouchmove' in window ? 'touchmove' : MSPointer.move,
// 			touchstart: 'ontouchstart' in window ? 'touchstart' : MSPointer.down
// 		};
// 		var scrollBarHandler;

// 		// taken from https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js
// 		var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

// 		//timeouts
// 		var resizeId;
// 		var afterSectionLoadsId;
// 		var afterSlideLoadsId;
// 		var scrollId;
// 		var scrollId2;
// 		var keydownId;
// 		var originals = deepExtend({}, options); //deep copy
// 		var activeAnimation;
// 		var g_initialAnchorsInDom = false;

// 		displayWarnings();

// 		//easeInOutCubic animation included in the plugin
// 		window.fp_easings = deepExtend(window.fp_easings, {
// 			easeInOutCubic: function (t, b, c, d) {
// 				if ((t /= d / 2) < 1) return c / 2 * t * t * t + b; return c / 2 * ((t -= 2) * t * t + 2) + b;
// 			}
// 		});

// 		/**
// 		* Sets the autoScroll option.
// 		* It changes the scroll bar visibility and the history of the site as a result.
// 		*/
// 		function setAutoScrolling(value, type) {
// 			//removing the transformation
// 			if (!value) {
// 				silentScroll(0);
// 			}

// 			setVariableState('autoScrolling', value, type);

// 			var element = $(SECTION_ACTIVE_SEL)[0];

// 			if (options.autoScrolling && !options.scrollBar) {
// 				css($htmlBody, {
// 					'overflow': 'hidden',
// 					'height': '100%'
// 				});

// 				setRecordHistory(originals.recordHistory, 'internal');

// 				//for IE touch devices
// 				css(container, {
// 					'-ms-touch-action': 'none',
// 					'touch-action': 'none'
// 				});

// 				if (element != null) {
// 					//moving the container up
// 					silentScroll(element.offsetTop);
// 				}

// 			} else {
// 				css($htmlBody, {
// 					'overflow': 'visible',
// 					'height': 'initial'
// 				});

// 				setRecordHistory(false, 'internal');

// 				//for IE touch devices
// 				css(container, {
// 					'-ms-touch-action': '',
// 					'touch-action': ''
// 				});

// 				//scrolling the page to the section with no animation
// 				if (element != null) {
// 					var scrollSettings = getScrollSettings(element.offsetTop);
// 					scrollSettings.element.scrollTo(0, scrollSettings.options);
// 				}
// 			}
// 		}

// 		/**
// 		* Defines wheter to record the history for each hash change in the URL.
// 		*/
// 		function setRecordHistory(value, type) {
// 			setVariableState('recordHistory', value, type);
// 		}

// 		/**
// 		* Defines the scrolling speed
// 		*/
// 		function setScrollingSpeed(value, type) {
// 			setVariableState('scrollingSpeed', value, type);
// 		}

// 		/**
// 		* Sets fitToSection
// 		*/
// 		function setFitToSection(value, type) {
// 			setVariableState('fitToSection', value, type);
// 		}

// 		/**
// 		* Sets lockAnchors
// 		*/
// 		function setLockAnchors(value) {
// 			options.lockAnchors = value;
// 		}

// 		/**
// 		* Adds or remove the possibility of scrolling through sections by using the mouse wheel or the trackpad.
// 		*/
// 		function setMouseWheelScrolling(value) {
// 			if (value) {
// 				addMouseWheelHandler();
// 				addMiddleWheelHandler();
// 			} else {
// 				removeMouseWheelHandler();
// 				removeMiddleWheelHandler();
// 			}
// 		}

// 		/**
// 		* Adds or remove the possibility of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
// 		* Optionally a second parameter can be used to specify the direction for which the action will be applied.
// 		*
// 		* @param directions string containing the direction or directions separated by comma.
// 		*/
// 		function setAllowScrolling(value, directions) {
// 			if (typeof directions !== 'undefined') {
// 				directions = directions.replace(/ /g, '').split(',');

// 				directions.forEach(function (direction) {
// 					setIsScrollAllowed(value, direction, 'm');
// 				});
// 			}
// 			else {
// 				setIsScrollAllowed(value, 'all', 'm');
// 			}
// 		}

// 		/**
// 		* Adds or remove the mouse wheel hijacking
// 		*/
// 		function setMouseHijack(value) {
// 			if (value) {
// 				setMouseWheelScrolling(true);
// 				addTouchHandler();
// 			} else {
// 				setMouseWheelScrolling(false);
// 				removeTouchHandler();
// 			}
// 		}

// 		/**
// 		* Adds or remove the possibility of scrolling through sections by using the keyboard arrow keys
// 		*/
// 		function setKeyboardScrolling(value, directions) {
// 			if (typeof directions !== 'undefined') {
// 				directions = directions.replace(/ /g, '').split(',');

// 				directions.forEach(function (direction) {
// 					setIsScrollAllowed(value, direction, 'k');
// 				});
// 			} else {
// 				setIsScrollAllowed(value, 'all', 'k');
// 				options.keyboardScrolling = value;
// 			}
// 		}

// 		/**
// 		* Moves the page up one section.
// 		*/
// 		function moveSectionUp() {
// 			var prev = prevUntil($(SECTION_ACTIVE_SEL)[0], SECTION_SEL);

// 			//looping to the bottom if there's no more sections above
// 			if (!prev && (options.loopTop || options.continuousVertical)) {
// 				prev = last($(SECTION_SEL));
// 			}

// 			if (prev != null) {
// 				scrollPage(prev, null, true);
// 			}
// 		}

// 		/**
// 		* Moves the page down one section.
// 		*/
// 		function moveSectionDown() {
// 			var next = nextUntil($(SECTION_ACTIVE_SEL)[0], SECTION_SEL);

// 			//looping to the top if there's no more sections below
// 			if (!next &&
// 				(options.loopBottom || options.continuousVertical)) {
// 				next = $(SECTION_SEL)[0];
// 			}

// 			if (next != null) {
// 				scrollPage(next, null, false);
// 			}
// 		}

// 		/**
// 		* Moves the page to the given section and slide with no animation.
// 		* Anchors or index positions can be used as params.
// 		*/
// 		function silentMoveTo(sectionAnchor, slideAnchor) {
// 			setScrollingSpeed(0, 'internal');
// 			moveTo(sectionAnchor, slideAnchor);
// 			setScrollingSpeed(originals.scrollingSpeed, 'internal');
// 		}

// 		/**
// 		* Moves the page to the given section and slide.
// 		* Anchors or index positions can be used as params.
// 		*/
// 		function moveTo(sectionAnchor, slideAnchor) {
// 			var destiny = getSectionByAnchor(sectionAnchor);

// 			if (typeof slideAnchor !== 'undefined') {
// 				scrollPageAndSlide(sectionAnchor, slideAnchor);
// 			} else if (destiny != null) {
// 				scrollPage(destiny);
// 			}
// 		}

// 		/**
// 		* Slides right the slider of the active section.
// 		* Optional `section` param.
// 		*/
// 		function moveSlideRight(section) {
// 			moveSlide('right', section);
// 		}

// 		/**
// 		* Slides left the slider of the active section.
// 		* Optional `section` param.
// 		*/
// 		function moveSlideLeft(section) {
// 			moveSlide('left', section);
// 		}

// 		/**
// 		 * When resizing is finished, we adjust the slides sizes and positions
// 		 */
// 		function reBuild(resizing) {
// 			if (hasClass(container, DESTROYED)) { return; }  //nothing to do if the plugin was destroyed

// 			isResizing = true;

// 			windowsHeight = getWindowHeight();  //updating global var

// 			var sections = $(SECTION_SEL);
// 			for (var i = 0; i < sections.length; ++i) {
// 				var section = sections[i];
// 				var slidesWrap = $(SLIDES_WRAPPER_SEL, section)[0];
// 				var slides = $(SLIDE_SEL, section);

// 				//adjusting the height of the table-cell for IE and Firefox
// 				if (options.verticalCentered) {
// 					css($(TABLE_CELL_SEL, section), { 'height': getTableHeight(section) + 'px' });
// 				}

// 				css(section, { 'height': windowsHeight + 'px' });

// 				//adjusting the position fo the FULL WIDTH slides...
// 				if (slides.length > 1) {
// 					landscapeScroll(slidesWrap, $(SLIDE_ACTIVE_SEL, slidesWrap)[0]);
// 				}
// 			}

// 			if (options.scrollOverflow) {
// 				scrollBarHandler.createScrollBarForAll();
// 			}

// 			var activeSection = $(SECTION_ACTIVE_SEL)[0];
// 			var sectionIndex = index(activeSection, SECTION_SEL);

// 			//isn't it the first section?
// 			if (sectionIndex) {
// 				//adjusting the position for the current section
// 				silentMoveTo(sectionIndex + 1);
// 			}

// 			isResizing = false;
// 			if (isFunction(options.afterResize) && resizing) {
// 				options.afterResize.call(container, window.innerWidth, window.innerHeight);
// 			}
// 			if (isFunction(options.afterReBuild) && !resizing) {
// 				options.afterReBuild.call(container);
// 			}
// 		}

// 		/**
// 		* Turns fullPage.js to normal scrolling mode when the viewport `width` or `height`
// 		* are smaller than the set limit values.
// 		*/
// 		function setResponsive(active) {
// 			var isResponsive = hasClass($body, RESPONSIVE);

// 			if (active) {
// 				if (!isResponsive) {
// 					setAutoScrolling(false, 'internal');
// 					setFitToSection(false, 'internal');
// 					hide($(SECTION_NAV_SEL));
// 					addClass($body, RESPONSIVE);
// 					if (isFunction(options.afterResponsive)) {
// 						options.afterResponsive.call(container, active);
// 					}
// 				}
// 			}
// 			else if (isResponsive) {
// 				setAutoScrolling(originals.autoScrolling, 'internal');
// 				setFitToSection(originals.autoScrolling, 'internal');
// 				show($(SECTION_NAV_SEL));
// 				removeClass($body, RESPONSIVE);
// 				if (isFunction(options.afterResponsive)) {
// 					options.afterResponsive.call(container, active);
// 				}
// 			}
// 		}

// 		if (container) {
// 			//public functions
// 			FP.version = '3.0.2';
// 			FP.setAutoScrolling = setAutoScrolling;
// 			FP.setRecordHistory = setRecordHistory;
// 			FP.setScrollingSpeed = setScrollingSpeed;
// 			FP.setFitToSection = setFitToSection;
// 			FP.setLockAnchors = setLockAnchors;
// 			FP.setMouseWheelScrolling = setMouseWheelScrolling;
// 			FP.setAllowScrolling = setAllowScrolling;
// 			FP.setKeyboardScrolling = setKeyboardScrolling;
// 			FP.moveSectionUp = moveSectionUp;
// 			FP.moveSectionDown = moveSectionDown;
// 			FP.silentMoveTo = silentMoveTo;
// 			FP.moveTo = moveTo;
// 			FP.moveSlideRight = moveSlideRight;
// 			FP.moveSlideLeft = moveSlideLeft;
// 			FP.fitToSection = fitToSection;
// 			FP.reBuild = reBuild;
// 			FP.setResponsive = setResponsive;
// 			FP.getFullpageData = options;
// 			FP.destroy = destroy;
// 			FP.getActiveSection = getActiveSection;
// 			FP.getActiveSlide = getActiveSlide;

// 			FP.test = {
// 				top: '0px',
// 				translate3d: 'translate3d(0px, 0px, 0px)',
// 				translate3dH: (function () {
// 					var a = [];
// 					for (var i = 0; i < $(options.sectionSelector, container).length; i++) {
// 						a.push('translate3d(0px, 0px, 0px)');
// 					}
// 					return a;
// 				})(),
// 				left: (function () {
// 					var a = [];
// 					for (var i = 0; i < $(options.sectionSelector, container).length; i++) {
// 						a.push(0);
// 					}
// 					return a;
// 				})(),
// 				options: options,
// 				setAutoScrolling: setAutoScrolling
// 			};

// 			//functions we want to share across files but which are not
// 			//mean to be used on their own by developers
// 			FP.shared = {
// 				afterRenderActions: afterRenderActions
// 			};

// 			window.fullpage_api = FP;

// 			init();

// 			bindEvents();
// 		}

// 		function init() {
// 			//if css3 is not supported, it will use jQuery animations
// 			if (options.css3) {
// 				options.css3 = support3d();
// 			}

// 			options.scrollBar = options.scrollBar || options.hybrid;

// 			setOptionsFromDOM();
// 			prepareDom();
// 			setAllowScrolling(true);
// 			setMouseHijack(true);
// 			setAutoScrolling(options.autoScrolling, 'internal');
// 			responsive();

// 			//setting the class for the body element
// 			setBodyClass();

// 			if (document.readyState === 'complete') {
// 				scrollToAnchor();
// 			}
// 			window.addEventListener('load', scrollToAnchor);

// 			//if we use scrollOverflow we'll fire afterRender in the scrolloverflow file
// 			if (!options.scrollOverflow) {
// 				afterRenderActions();
// 			}
// 		}

// 		function bindEvents() {

// 			//when scrolling...
// 			window.addEventListener('scroll', scrollHandler);

// 			//detecting any change on the URL to scroll to the given anchor link
// 			//(a way to detect back history button as we play with the hashes on the URL)
// 			window.addEventListener('hashchange', hashChangeHandler);

// 			//when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
// 			window.addEventListener('blur', blurHandler);

// 			//when resizing the site, we adjust the heights of the sections, slimScroll...
// 			window.addEventListener('resize', resizeHandler);

// 			//Sliding with arrow keys, both, vertical and horizontal
// 			document.addEventListener('keydown', keydownHandler);

// 			//to prevent scrolling while zooming
// 			document.addEventListener('keyup', keyUpHandler);

// 			//Scrolls to the section when clicking the navigation bullet
// 			//simulating the jQuery .on('click') event using delegation
// 			['click', 'touchstart'].forEach(function (eventName) {
// 				document.addEventListener(eventName, delegatedEvents);
// 			});

// 			/**
// 			* Applying normalScroll elements.
// 			* Ignoring the scrolls over the specified selectors.
// 			*/
// 			if (options.normalScrollElements) {
// 				['mouseenter', 'touchstart'].forEach(function (eventName) {
// 					forMouseLeaveOrTouch(eventName, false);
// 				});

// 				['mouseleave', 'touchend'].forEach(function (eventName) {
// 					forMouseLeaveOrTouch(eventName, true);
// 				});
// 			}
// 		}

// 		function delegatedEvents(e) {
// 			var target = e.target;

// 			if (target && closest(target, SECTION_NAV_SEL + ' a')) {
// 				sectionBulletHandler.call(target, e);
// 			}
// 			else if (matches(target, SECTION_NAV_TOOLTIP_SEL)) {
// 				tooltipTextHandler.call(target);
// 			}
// 			else if (matches(target, SLIDES_ARROW_SEL)) {
// 				slideArrowHandler.call(target, e);
// 			}
// 			else if (matches(target, SLIDES_NAV_LINK_SEL) || closest(target, SLIDES_NAV_LINK_SEL) != null) {
// 				slideBulletHandler.call(target, e);
// 			}
// 			else if (closest(target, options.menu + ' [data-menuanchor]')) {
// 				menuItemsHandler.call(target, e);
// 			}
// 		}

// 		function forMouseLeaveOrTouch(eventName, allowScrolling) {
// 			//a way to pass arguments to the onMouseEnterOrLeave function
// 			document['fp_' + eventName] = allowScrolling;
// 			document.addEventListener(eventName, onMouseEnterOrLeave, true); //capturing phase
// 		}

// 		function onMouseEnterOrLeave(e) {
// 			if (e.target == document) {
// 				return;
// 			}
// 			var normalSelectors = options.normalScrollElements.split(',');
// 			normalSelectors.forEach(function (normalSelector) {
// 				if (closest(e.target, normalSelector) != null) {
// 					setMouseHijack(document['fp_' + e.type]); //e.type = eventName
// 				}
// 			});
// 		}

// 		/**
// 		* Setting options from DOM elements if they are not provided.
// 		*/
// 		function setOptionsFromDOM() {

// 			//no anchors option? Checking for them in the DOM attributes
// 			if (!options.anchors.length) {
// 				var attrName = '[data-anchor]';
// 				var anchors = $(options.sectionSelector.split(',').join(attrName + ',') + attrName, container);
// 				if (anchors.length) {
// 					g_initialAnchorsInDom = true;
// 					anchors.forEach(function (item) {
// 						options.anchors.push(item.getAttribute('data-anchor').toString());
// 					});
// 				}
// 			}

// 			//no tooltips option? Checking for them in the DOM attributes
// 			if (!options.navigationTooltips.length) {
// 				var attrName = '[data-tooltip]';
// 				var tooltips = $(options.sectionSelector.split(',').join(attrName + ',') + attrName, container);
// 				if (tooltips.length) {
// 					tooltips.forEach(function (item) {
// 						options.navigationTooltips.push(item.getAttribute('data-tooltip').toString());
// 					});
// 				}
// 			}
// 		}

// 		/**
// 		* Works over the DOM structure to set it up for the current fullpage options.
// 		*/
// 		function prepareDom() {
// 			css(container, {
// 				'height': '100%',
// 				'position': 'relative'
// 			});

// 			//adding a class to recognize the container internally in the code
// 			addClass(container, WRAPPER);
// 			addClass($('html'), ENABLED);

// 			//due to https://github.com/alvarotrigo/fullPage.js/issues/1502
// 			windowsHeight = getWindowHeight();

// 			removeClass(container, DESTROYED); //in case it was destroyed before initializing it again

// 			addInternalSelectors();

// 			var sections = $(SECTION_SEL);

// 			//styling the sections / slides / menu
// 			for (var i = 0; i < sections.length; i++) {
// 				var sectionIndex = i;
// 				var section = sections[i];
// 				var slides = $(SLIDE_SEL, section);
// 				var numSlides = slides.length;

// 				//caching the original styles to add them back on destroy('all')
// 				section.setAttribute('data-fp-styles', section.getAttribute('style'));

// 				styleSection(section, sectionIndex);
// 				styleMenu(section, sectionIndex);

// 				// if there's any slide
// 				if (numSlides > 0) {
// 					styleSlides(section, slides, numSlides);
// 				} else {
// 					if (options.verticalCentered) {
// 						addTableClass(section);
// 					}
// 				}
// 			}

// 			//fixed elements need to be moved out of the plugin container due to problems with CSS3.
// 			if (options.fixedElements && options.css3) {
// 				$(options.fixedElements).forEach(function (item) {
// 					$body.appendChild(item);
// 				});
// 			}

// 			//vertical centered of the navigation + active bullet
// 			if (options.navigation) {
// 				addVerticalNavigation();
// 			}

// 			enableYoutubeAPI();

// 			if (options.scrollOverflow) {
// 				scrollBarHandler = options.scrollOverflowHandler.init(options);
// 			}
// 		}

// 		/**
// 		* Styles the horizontal slides for a section.
// 		*/
// 		function styleSlides(section, slides, numSlides) {
// 			var sliderWidth = numSlides * 100;
// 			var slideWidth = 100 / numSlides;

// 			var slidesWrapper = document.createElement('div');
// 			slidesWrapper.className = SLIDES_WRAPPER; //fp-slides
// 			wrapAll(slides, slidesWrapper);

// 			var slidesContainer = document.createElement('div');
// 			slidesContainer.className = SLIDES_CONTAINER; //fp-slidesContainer
// 			wrapAll(slides, slidesContainer);

// 			css($(SLIDES_CONTAINER_SEL, section), { 'width': sliderWidth + '%' });

// 			if (numSlides > 1) {
// 				if (options.controlArrows) {
// 					createSlideArrows(section);
// 				}

// 				if (options.slidesNavigation) {
// 					addSlidesNavigation(section, numSlides);
// 				}
// 			}

// 			slides.forEach(function (slide) {
// 				css(slide, { 'width': slideWidth + '%' });

// 				if (options.verticalCentered) {
// 					addTableClass(slide);
// 				}
// 			});

// 			var startingSlide = $(SLIDE_ACTIVE_SEL, section)[0];

// 			//if the slide won't be an starting point, the default will be the first one
// 			//the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.
// 			if (startingSlide != null && (index($(SECTION_ACTIVE_SEL), SECTION_SEL) !== 0 || (index($(SECTION_ACTIVE_SEL), SECTION_SEL) === 0 && index(startingSlide) !== 0))) {
// 				silentLandscapeScroll(startingSlide, 'internal');
// 			} else {
// 				addClass(slides[0], ACTIVE);
// 			}
// 		}

// 		/**
// 		* Styling vertical sections
// 		*/
// 		function styleSection(section, index) {
// 			//if no active section is defined, the 1st one will be the default one
// 			if (!index && $(SECTION_ACTIVE_SEL)[0] == null) {
// 				addClass(section, ACTIVE);
// 			}
// 			startingSection = $(SECTION_ACTIVE_SEL)[0];

// 			css(section, { 'height': windowsHeight + 'px' });

// 			if (options.paddingTop) {
// 				css(section, { 'padding-top': options.paddingTop });
// 			}

// 			if (options.paddingBottom) {
// 				css(section, { 'padding-bottom': options.paddingBottom });
// 			}

// 			if (typeof options.sectionsColor[index] !== 'undefined') {
// 				css(section, { 'background-color': options.sectionsColor[index] });
// 			}

// 			if (typeof options.anchors[index] !== 'undefined') {
// 				section.setAttribute('data-anchor', options.anchors[index]);
// 			}
// 		}

// 		/**
// 		* Sets the data-anchor attributes to the menu elements and activates the current one.
// 		*/
// 		function styleMenu(section, index) {
// 			if (typeof options.anchors[index] !== 'undefined') {
// 				//activating the menu / nav element on load
// 				if (hasClass(section, ACTIVE)) {
// 					activateMenuAndNav(options.anchors[index], index);
// 				}
// 			}

// 			//moving the menu outside the main container if it is inside (avoid problems with fixed positions when using CSS3 tranforms)
// 			if (options.menu && options.css3 && closest($(options.menu)[0], WRAPPER_SEL) != null) {
// 				$body.appendChild($(options.menu)[0]);
// 			}
// 		}

// 		/**
// 		* Adds internal classes to be able to provide customizable selectors
// 		* keeping the link with the style sheet.
// 		*/
// 		function addInternalSelectors() {
// 			addClass($(options.sectionSelector, container), SECTION);
// 			addClass($(options.slideSelector, container), SLIDE);
// 		}

// 		/**
// 		* Creates the control arrows for the given section
// 		*/
// 		function createSlideArrows(section) {
// 			var arrows = [createElementFromHTML('<div class="' + SLIDES_ARROW_PREV + '"></div>'), createElementFromHTML('<div class="' + SLIDES_ARROW_NEXT + '"></div>')];
// 			after($(SLIDES_WRAPPER_SEL, section)[0], arrows);

// 			if (options.controlArrowColor !== '#fff') {
// 				css($(SLIDES_ARROW_NEXT_SEL, section), { 'border-color': 'transparent transparent transparent ' + options.controlArrowColor });
// 				css($(SLIDES_ARROW_PREV_SEL, section), { 'border-color': 'transparent ' + options.controlArrowColor + ' transparent transparent' });
// 			}

// 			if (!options.loopHorizontal) {
// 				hide($(SLIDES_ARROW_PREV_SEL, section));
// 			}
// 		}

// 		/**
// 		* Creates a vertical navigation bar.
// 		*/
// 		function addVerticalNavigation() {
// 			var navigation = document.createElement('div');
// 			navigation.setAttribute('id', SECTION_NAV);

// 			var divUl = document.createElement('ul');
// 			navigation.appendChild(divUl);

// 			appendTo(navigation, $body);
// 			var nav = $(SECTION_NAV_SEL)[0];

// 			addClass(nav, 'fp-' + options.navigationPosition);

// 			if (options.showActiveTooltip) {
// 				addClass(nav, SHOW_ACTIVE_TOOLTIP);
// 			}

// 			var li = '';

// 			for (var i = 0; i < $(SECTION_SEL).length; i++) {
// 				var link = '';
// 				if (options.anchors.length) {
// 					link = options.anchors[i];
// 				}

// 				li += '<li><a href="#' + link + '"><span class="fp-sr-only">' + getBulletLinkName(i, 'Section') + '</span><span></span></a>';

// 				// Only add tooltip if needed (defined by user)
// 				var tooltip = options.navigationTooltips[i];

// 				if (typeof tooltip !== 'undefined' && tooltip !== '') {
// 					li += '<div class="' + SECTION_NAV_TOOLTIP + ' fp-' + options.navigationPosition + '">' + tooltip + '</div>';
// 				}

// 				li += '</li>';
// 			}
// 			$('ul', nav)[0].innerHTML = li;

// 			//centering it vertically
// 			css($(SECTION_NAV_SEL), { 'margin-top': '-' + ($(SECTION_NAV_SEL)[0].offsetHeight / 2) + 'px' });

// 			//activating the current active section

// 			var bullet = $('li', $(SECTION_NAV_SEL)[0])[index($(SECTION_ACTIVE_SEL)[0], SECTION_SEL)];
// 			addClass($('a', bullet), ACTIVE);
// 		}

// 		/**
// 		* Gets the name for screen readers for a section/slide navigation bullet.
// 		*/
// 		function getBulletLinkName(i, defaultName) {
// 			return options.navigationTooltips[i]
// 				|| options.anchors[i]
// 				|| defaultName + ' ' + (i + 1)
// 		}

// 		/*
// 		* Enables the Youtube videos API so we can control their flow if necessary.
// 		*/
// 		function enableYoutubeAPI() {
// 			$('iframe[src*="youtube.com/embed/"]', container).forEach(function (item) {
// 				addURLParam(item, 'enablejsapi=1');
// 			});
// 		}

// 		/**
// 		* Adds a new parameter and its value to the `src` of a given element
// 		*/
// 		function addURLParam(element, newParam) {
// 			var originalSrc = element.getAttribute('src');
// 			element.setAttribute('src', originalSrc + getUrlParamSign(originalSrc) + newParam);
// 		}

// 		/*
// 		* Returns the prefix sign to use for a new parameter in an existen URL.
// 		*
// 		* @return {String}  ? | &
// 		*/
// 		function getUrlParamSign(url) {
// 			return (!/\?/.test(url)) ? '?' : '&';
// 		}

// 		/**
// 		* Actions and callbacks to fire afterRender
// 		*/
// 		function afterRenderActions() {
// 			var section = $(SECTION_ACTIVE_SEL)[0];

// 			addClass(section, COMPLETELY);

// 			lazyLoad(section);
// 			playMedia(section);

// 			if (options.scrollOverflow) {
// 				options.scrollOverflowHandler.afterLoad();
// 			}

// 			if (isDestinyTheStartingSection() && isFunction(options.afterLoad)) {
// 				fireCallback('afterLoad', {
// 					activeSection: null,
// 					element: section,
// 					direction: null,

// 					//for backwards compatibility callback (to be removed in a future!)
// 					anchorLink: section.getAttribute('data-anchor'),
// 					sectionIndex: index(section, SECTION_SEL)
// 				});
// 			}

// 			if (isFunction(options.afterRender)) {
// 				fireCallback('afterRender');
// 			}
// 		}

// 		/**
// 		* Determines if the URL anchor destiny is the starting section (the one using 'active' class before initialization)
// 		*/
// 		function isDestinyTheStartingSection() {
// 			var destinationSection = getSectionByAnchor(getAnchorsURL().section);
// 			return !destinationSection || typeof destinationSection !== 'undefined' && index(destinationSection) === index(startingSection);
// 		}

// 		var isScrolling = false;
// 		var lastScroll = 0;

// 		//when scrolling...
// 		function scrollHandler() {
// 			var currentSection;

// 			if (!options.autoScrolling || options.scrollBar) {
// 				var currentScroll = getScrollTop();
// 				var scrollDirection = getScrollDirection(currentScroll);
// 				var visibleSectionIndex = 0;
// 				var screen_mid = currentScroll + (getWindowHeight() / 2.0);
// 				var isAtBottom = $body.offsetHeight - getWindowHeight() === currentScroll;
// 				var sections = $(SECTION_SEL);

// 				//when using `auto-height` for a small last section it won't be centered in the viewport
// 				if (isAtBottom) {
// 					visibleSectionIndex = sections.length - 1;
// 				}
// 				//is at top? when using `auto-height` for a small first section it won't be centered in the viewport
// 				else if (!currentScroll) {
// 					visibleSectionIndex = 0;
// 				}

// 				//taking the section which is showing more content in the viewport
// 				else {
// 					for (var i = 0; i < sections.length; ++i) {
// 						var section = sections[i];

// 						// Pick the the last section which passes the middle line of the screen.
// 						if (section.offsetTop <= screen_mid) {
// 							visibleSectionIndex = i;
// 						}
// 					}
// 				}

// 				if (isCompletelyInViewPort(scrollDirection)) {
// 					if (!hasClass($(SECTION_ACTIVE_SEL)[0], COMPLETELY)) {
// 						addClass($(SECTION_ACTIVE_SEL)[0], COMPLETELY);
// 						removeClass(siblings($(SECTION_ACTIVE_SEL)[0]), COMPLETELY);
// 					}
// 				}

// 				//geting the last one, the current one on the screen
// 				currentSection = sections[visibleSectionIndex];

// 				//setting the visible section as active when manually scrolling
// 				//executing only once the first time we reach the section
// 				if (!hasClass(currentSection, ACTIVE)) {
// 					isScrolling = true;
// 					var leavingSection = $(SECTION_ACTIVE_SEL)[0];
// 					var leavingSectionIndex = index(leavingSection, SECTION_SEL) + 1;
// 					var yMovement = getYmovement(currentSection);
// 					var anchorLink = currentSection.getAttribute('data-anchor');
// 					var sectionIndex = index(currentSection, SECTION_SEL) + 1;
// 					var activeSlide = $(SLIDE_ACTIVE_SEL, currentSection)[0];
// 					var slideIndex;
// 					var slideAnchorLink;
// 					var callbacksParams = {
// 						activeSection: leavingSection,
// 						sectionIndex: sectionIndex - 1,
// 						anchorLink: anchorLink,
// 						element: currentSection,
// 						leavingSection: leavingSectionIndex,
// 						direction: yMovement
// 					};

// 					if (activeSlide) {
// 						slideAnchorLink = activeSlide.getAttribute('data-anchor');
// 						slideIndex = index(activeSlide);
// 					}

// 					if (canScroll) {
// 						addClass(currentSection, ACTIVE);
// 						removeClass(siblings(currentSection), ACTIVE);

// 						if (isFunction(options.onLeave)) {
// 							fireCallback('onLeave', callbacksParams);
// 						}
// 						if (isFunction(options.afterLoad)) {
// 							fireCallback('afterLoad', callbacksParams);
// 						}

// 						stopMedia(leavingSection);
// 						lazyLoad(currentSection);
// 						playMedia(currentSection);

// 						activateMenuAndNav(anchorLink, sectionIndex - 1);

// 						if (options.anchors.length) {
// 							//needed to enter in hashChange event when using the menu with anchor links
// 							lastScrolledDestiny = anchorLink;
// 						}
// 						setState(slideIndex, slideAnchorLink, anchorLink, sectionIndex);
// 					}

// 					//small timeout in order to avoid entering in hashChange event when scrolling is not finished yet
// 					clearTimeout(scrollId);
// 					scrollId = setTimeout(function () {
// 						isScrolling = false;
// 					}, 100);
// 				}

// 				if (options.fitToSection) {
// 					//for the auto adjust of the viewport to fit a whole section
// 					clearTimeout(scrollId2);

// 					scrollId2 = setTimeout(function () {
// 						//checking it again in case it changed during the delay
// 						if (options.fitToSection &&

// 							//is the destination element bigger than the viewport?
// 							$(SECTION_ACTIVE_SEL)[0].offsetHeight <= windowsHeight
// 						) {
// 							fitToSection();
// 						}
// 					}, options.fitToSectionDelay);
// 				}
// 			}
// 		}

// 		/**
// 		* Fits the site to the nearest active section
// 		*/
// 		function fitToSection() {
// 			//checking fitToSection again in case it was set to false before the timeout delay
// 			if (canScroll) {
// 				//allows to scroll to an active section and
// 				//if the section is already active, we prevent firing callbacks
// 				isResizing = true;

// 				scrollPage($(SECTION_ACTIVE_SEL)[0]);
// 				isResizing = false;
// 			}
// 		}

// 		/**
// 		* Determines whether the active section has seen in its whole or not.
// 		*/
// 		function isCompletelyInViewPort(movement) {
// 			var top = $(SECTION_ACTIVE_SEL)[0].offsetTop;
// 			var bottom = top + getWindowHeight();

// 			if (movement == 'up') {
// 				return bottom >= (getScrollTop() + getWindowHeight());
// 			}
// 			return top <= getScrollTop();
// 		}

// 		/**
// 		* Gets the directon of the the scrolling fired by the scroll event.
// 		*/
// 		function getScrollDirection(currentScroll) {
// 			var direction = currentScroll > lastScroll ? 'down' : 'up';

// 			lastScroll = currentScroll;

// 			//needed for auto-height sections to determine if we want to scroll to the top or bottom of the destination
// 			previousDestTop = currentScroll;

// 			return direction;
// 		}

// 		/**
// 		* Determines the way of scrolling up or down:
// 		* by 'automatically' scrolling a section or by using the default and normal scrolling.
// 		*/
// 		function scrolling(type) {
// 			if (!isScrollAllowed.m[type]) {
// 				return;
// 			}

// 			var scrollSection = (type === 'down') ? moveSectionDown : moveSectionUp;

// 			if (options.scrollOverflow) {
// 				var scrollable = options.scrollOverflowHandler.scrollable($(SECTION_ACTIVE_SEL)[0]);
// 				var check = (type === 'down') ? 'bottom' : 'top';

// 				if (scrollable != null) {
// 					//is the scrollbar at the start/end of the scroll?
// 					if (options.scrollOverflowHandler.isScrolled(check, scrollable)) {
// 						scrollSection();
// 					} else {
// 						return true;
// 					}
// 				} else {
// 					// moved up/down
// 					scrollSection();
// 				}
// 			} else {
// 				// moved up/down
// 				scrollSection();
// 			}
// 		}

// 		/*
// 		* Preventing bouncing in iOS #2285
// 		*/
// 		function preventBouncing(e) {
// 			if (options.autoScrolling && isReallyTouch(e)) {
// 				//preventing the easing on iOS devices
// 				preventDefault(e);
// 			}
// 		}

// 		var touchStartY = 0;
// 		var touchStartX = 0;
// 		var touchEndY = 0;
// 		var touchEndX = 0;

// 		/* Detecting touch events

// 		* As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
// 		* This way, the touchstart and the touch moves shows an small difference between them which is the
// 		* used one to determine the direction.
// 		*/
// 		function touchMoveHandler(e) {
// 			var activeSection = closest(e.target, SECTION_SEL);

// 			// additional: if one of the normalScrollElements isn't within options.normalScrollElementTouchThreshold hops up the DOM chain
// 			if (isReallyTouch(e)) {

// 				if (options.autoScrolling) {
// 					//preventing the easing on iOS devices
// 					preventDefault(e);
// 				}

// 				var touchEvents = getEventsPage(e);

// 				touchEndY = touchEvents.y;
// 				touchEndX = touchEvents.x;

// 				//if movement in the X axys is greater than in the Y and the currect section has slides...
// 				if ($(SLIDES_WRAPPER_SEL, activeSection).length && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {

// 					//is the movement greater than the minimum resistance to scroll?
// 					if (!slideMoving && Math.abs(touchStartX - touchEndX) > (window.innerWidth / 100 * options.touchSensitivity)) {
// 						if (touchStartX > touchEndX) {
// 							if (isScrollAllowed.m.right) {
// 								moveSlideRight(activeSection); //next
// 							}
// 						} else {
// 							if (isScrollAllowed.m.left) {
// 								moveSlideLeft(activeSection); //prev
// 							}
// 						}
// 					}
// 				}

// 				//vertical scrolling (only when autoScrolling is enabled)
// 				else if (options.autoScrolling && canScroll) {

// 					//is the movement greater than the minimum resistance to scroll?
// 					if (Math.abs(touchStartY - touchEndY) > (window.innerHeight / 100 * options.touchSensitivity)) {
// 						if (touchStartY > touchEndY) {
// 							scrolling('down');
// 						} else if (touchEndY > touchStartY) {
// 							scrolling('up');
// 						}
// 					}
// 				}
// 			}
// 		}

// 		/**
// 		* As IE >= 10 fires both touch and mouse events when using a mouse in a touchscreen
// 		* this way we make sure that is really a touch event what IE is detecting.
// 		*/
// 		function isReallyTouch(e) {
// 			//if is not IE   ||  IE is detecting `touch` or `pen`
// 			return typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';
// 		}

// 		/**
// 		* Handler for the touch start event.
// 		*/
// 		function touchStartHandler(e) {

// 			//stopping the auto scroll to adjust to a section
// 			if (options.fitToSection) {
// 				activeAnimation = false;
// 			}

// 			if (isReallyTouch(e)) {
// 				var touchEvents = getEventsPage(e);
// 				touchStartY = touchEvents.y;
// 				touchStartX = touchEvents.x;
// 			}
// 		}

// 		/**
// 		* Gets the average of the last `number` elements of the given array.
// 		*/
// 		function getAverage(elements, number) {
// 			var sum = 0;

// 			//taking `number` elements from the end to make the average, if there are not enought, 1
// 			var lastElements = elements.slice(Math.max(elements.length - number, 1));

// 			for (var i = 0; i < lastElements.length; i++) {
// 				sum = sum + lastElements[i];
// 			}

// 			return Math.ceil(sum / number);
// 		}

// 		/**
// 		 * Detecting mousewheel scrolling
// 		 *
// 		 * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
// 		 * http://www.sitepoint.com/html5-javascript-mouse-wheel/
// 		 */
// 		var prevTime = new Date().getTime();

// 		function MouseWheelHandler(e) {
// 			var curTime = new Date().getTime();
// 			var isNormalScroll = hasClass($(COMPLETELY_SEL)[0], NORMAL_SCROLL);

// 			//is scroll allowed?
// 			if (!isScrollAllowed.m.down && !isScrollAllowed.m.up) {
// 				preventDefault(e);
// 				return false;
// 			}

// 			//autoscrolling and not zooming?
// 			if (options.autoScrolling && !controlPressed && !isNormalScroll) {
// 				// cross-browser wheel delta
// 				e = e || window.event;
// 				var value = e.wheelDelta || -e.deltaY || -e.detail;
// 				var delta = Math.max(-1, Math.min(1, value));

// 				var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
// 				var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection);

// 				//Limiting the array to 150 (lets not waste memory!)
// 				if (scrollings.length > 149) {
// 					scrollings.shift();
// 				}

// 				//keeping record of the previous scrollings
// 				scrollings.push(Math.abs(value));

// 				//preventing to scroll the site on mouse wheel when scrollbar is present
// 				if (options.scrollBar) {
// 					preventDefault(e);
// 				}

// 				//time difference between the last scroll and the current one
// 				var timeDiff = curTime - prevTime;
// 				prevTime = curTime;

// 				//haven't they scrolled in a while?
// 				//(enough to be consider a different scrolling action to scroll another section)
// 				if (timeDiff > 200) {
// 					//emptying the array, we dont care about old scrollings for our averages
// 					scrollings = [];
// 				}

// 				if (canScroll) {
// 					var averageEnd = getAverage(scrollings, 10);
// 					var averageMiddle = getAverage(scrollings, 70);
// 					var isAccelerating = averageEnd >= averageMiddle;

// 					//to avoid double swipes...
// 					if (isAccelerating && isScrollingVertically) {
// 						//scrolling down?
// 						if (delta < 0) {
// 							scrolling('down');

// 							//scrolling up?
// 						} else {
// 							scrolling('up');
// 						}
// 					}
// 				}

// 				return false;
// 			}

// 			if (options.fitToSection) {
// 				//stopping the auto scroll to adjust to a section
// 				activeAnimation = false;
// 			}
// 		}

// 		/**
// 		* Slides a slider to the given direction.
// 		* Optional `section` param.
// 		*/
// 		function moveSlide(direction, section) {
// 			var activeSection = section == null ? $(SECTION_ACTIVE_SEL)[0] : section;
// 			var slides = $(SLIDES_WRAPPER_SEL, activeSection)[0];

// 			// more than one slide needed and nothing should be sliding
// 			if (slides == null || slideMoving || $(SLIDE_SEL, slides).length < 2) {
// 				return;
// 			}

// 			var currentSlide = $(SLIDE_ACTIVE_SEL, slides)[0];
// 			var destiny = null;

// 			if (direction === 'left') {
// 				destiny = prevUntil(currentSlide, SLIDE_SEL);
// 			} else {
// 				destiny = nextUntil(currentSlide, SLIDE_SEL);
// 			}

// 			//isn't there a next slide in the secuence?
// 			if (destiny == null) {
// 				//respect loopHorizontal settin
// 				if (!options.loopHorizontal) return;

// 				var slideSiblings = siblings(currentSlide);
// 				if (direction === 'left') {
// 					destiny = slideSiblings[slideSiblings.length - 1]; //last
// 				} else {
// 					destiny = slideSiblings[0]; //first
// 				}
// 			}

// 			slideMoving = true && !FP.test.isTesting;
// 			landscapeScroll(slides, destiny, direction);
// 		}

// 		/**
// 		* Maintains the active slides in the viewport
// 		* (Because the `scroll` animation might get lost with some actions, such as when using continuousVertical)
// 		*/
// 		function keepSlidesPosition() {
// 			var activeSlides = $(SLIDE_ACTIVE_SEL);
// 			for (var i = 0; i < activeSlides.length; i++) {
// 				silentLandscapeScroll(activeSlides[i], 'internal');
// 			}
// 		}

// 		var previousDestTop = 0;
// 		/**
// 		* Returns the destination Y position based on the scrolling direction and
// 		* the height of the section.
// 		*/
// 		function getDestinationPosition(element) {
// 			var elementHeight = element.offsetHeight;
// 			var elementTop = element.offsetTop;

// 			//top of the desination will be at the top of the viewport
// 			var position = elementTop;
// 			var isScrollingDown = elementTop > previousDestTop;
// 			var sectionBottom = position - windowsHeight + elementHeight;
// 			var bigSectionsDestination = options.bigSectionsDestination;

// 			//is the destination element bigger than the viewport?
// 			if (elementHeight > windowsHeight) {
// 				//scrolling up?
// 				if (!isScrollingDown && !bigSectionsDestination || bigSectionsDestination === 'bottom') {
// 					position = sectionBottom;
// 				}
// 			}

// 			//sections equal or smaller than the viewport height && scrolling down? ||  is resizing and its in the last section
// 			else if (isScrollingDown || (isResizing && next(element) == null)) {
// 				//The bottom of the destination will be at the bottom of the viewport
// 				position = sectionBottom;
// 			}

// 			/*
// 			Keeping record of the last scrolled position to determine the scrolling direction.
// 			No conventional methods can be used as the scroll bar might not be present
// 			AND the section might not be active if it is auto-height and didnt reach the middle
// 			of the viewport.
// 			*/
// 			previousDestTop = position;
// 			return position;
// 		}

// 		/**
// 		* Scrolls the site to the given element and scrolls to the slide if a callback is given.
// 		*/
// 		function scrollPage(element, callback, isMovementUp) {
// 			if (element == null) { return; } //there's no element to scroll, leaving the function

// 			var dtop = getDestinationPosition(element);
// 			var slideAnchorLink;
// 			var slideIndex;

// 			//local variables
// 			var v = {
// 				element: element,
// 				callback: callback,
// 				isMovementUp: isMovementUp,
// 				dtop: dtop,
// 				yMovement: getYmovement(element),
// 				anchorLink: element.getAttribute('data-anchor'),
// 				sectionIndex: index(element, SECTION_SEL),
// 				activeSlide: $(SLIDE_ACTIVE_SEL, element)[0],
// 				activeSection: $(SECTION_ACTIVE_SEL)[0],
// 				leavingSection: index($(SECTION_ACTIVE_SEL), SECTION_SEL) + 1,

// 				//caching the value of isResizing at the momment the function is called
// 				//because it will be checked later inside a setTimeout and the value might change
// 				localIsResizing: isResizing
// 			};

// 			//quiting when destination scroll is the same as the current one
// 			if ((v.activeSection == element && !isResizing) || (options.scrollBar && getScrollTop() === v.dtop && !hasClass(element, AUTO_HEIGHT))) { return; }

// 			if (v.activeSlide != null) {
// 				slideAnchorLink = v.activeSlide.getAttribute('data-anchor');
// 				slideIndex = index(v.activeSlide);
// 			}

// 			//callback (onLeave) if the site is not just resizing and readjusting the slides
// 			if (!v.localIsResizing) {
// 				var direction = v.yMovement;

// 				//required for continousVertical
// 				if (typeof isMovementUp !== 'undefined') {
// 					direction = isMovementUp ? 'up' : 'down';
// 				}

// 				//for the callback
// 				v.direction = direction;

// 				if (isFunction(options.onLeave)) {
// 					if (fireCallback('onLeave', v) === false) {
// 						return;
// 					}
// 				}
// 			}

// 			// If continuousVertical && we need to wrap around
// 			if (options.autoScrolling && options.continuousVertical && typeof (v.isMovementUp) !== "undefined" &&
// 				((!v.isMovementUp && v.yMovement == 'up') || // Intending to scroll down but about to go up or
// 					(v.isMovementUp && v.yMovement == 'down'))) { // intending to scroll up but about to go down

// 				v = createInfiniteSections(v);
// 			}

// 			//pausing media of the leaving section (if we are not just resizing, as destinatino will be the same one)
// 			if (!v.localIsResizing) {
// 				stopMedia(v.activeSection);
// 			}

// 			if (options.scrollOverflow) {
// 				options.scrollOverflowHandler.beforeLeave();
// 			}

// 			addClass(element, ACTIVE);
// 			removeClass(siblings(element), ACTIVE);
// 			lazyLoad(element);

// 			if (options.scrollOverflow) {
// 				options.scrollOverflowHandler.onLeave();
// 			}

// 			//preventing from activating the MouseWheelHandler event
// 			//more than once if the page is scrolling
// 			canScroll = false || FP.test.isTesting;

// 			setState(slideIndex, slideAnchorLink, v.anchorLink, v.sectionIndex);

// 			performMovement(v);

// 			//flag to avoid callingn `scrollPage()` twice in case of using anchor links
// 			lastScrolledDestiny = v.anchorLink;

// 			//avoid firing it twice (as it does also on scroll)
// 			activateMenuAndNav(v.anchorLink, v.sectionIndex);
// 		}

// 		/**
// 		* Dispatch events & callbacks making sure it does it on the right format, depending on
// 		* whether v2compatible is being used or not.
// 		*/
// 		function fireCallback(eventName, v) {
// 			var eventData = getEventData(eventName, v);

// 			if (!options.v2compatible) {
// 				trigger(container, eventName, eventData);

// 				if (options[eventName].apply(eventData[Object.keys(eventData)[0]], toArray(eventData)) === false) {
// 					return false;
// 				}
// 			}
// 			else {
// 				if (options[eventName].apply(eventData[0], eventData.slice(1)) === false) {
// 					return false;
// 				}
// 			}

// 			return true;
// 		}

// 		/**
// 		* Makes sure to only create a Panel object if the element exist
// 		*/
// 		function nullOrSection(el) {
// 			return el ? new Section(el) : null;
// 		}

// 		function nullOrSlide(el) {
// 			return el ? new Slide(el) : null;
// 		}

// 		/**
// 		* Gets the event's data for the given event on the right format. Depending on whether
// 		* v2compatible is being used or not.
// 		*/
// 		function getEventData(eventName, v) {
// 			var paramsPerEvent;

// 			if (!options.v2compatible) {

// 				//using functions to run only the necessary bits within the object
// 				paramsPerEvent = {
// 					afterRender: function () {
// 						return {
// 							section: nullOrSection($(SECTION_ACTIVE_SEL)[0]),
// 							slide: nullOrSlide($(SLIDE_ACTIVE_SEL, $(SECTION_ACTIVE_SEL)[0])[0])
// 						};
// 					},
// 					onLeave: function () {
// 						return {
// 							origin: nullOrSection(v.activeSection),
// 							destination: nullOrSection(v.element),
// 							direction: v.direction
// 						};
// 					},

// 					afterLoad: function () {
// 						return paramsPerEvent.onLeave();
// 					},

// 					afterSlideLoad: function () {
// 						return {
// 							section: nullOrSection(v.section),
// 							origin: nullOrSlide(v.prevSlide),
// 							destination: nullOrSlide(v.destiny),
// 							direction: v.direction
// 						};
// 					},

// 					onSlideLeave: function () {
// 						return paramsPerEvent.afterSlideLoad();
// 					}
// 				};
// 			}
// 			else {
// 				paramsPerEvent = {
// 					afterRender: function () { return [container]; },
// 					onLeave: function () { return [v.activeSection, v.leavingSection, (v.sectionIndex + 1), v.direction]; },
// 					afterLoad: function () { return [v.element, v.anchorLink, (v.sectionIndex + 1)]; },
// 					afterSlideLoad: function () { return [v.destiny, v.anchorLink, (v.sectionIndex + 1), v.slideAnchor, v.slideIndex]; },
// 					onSlideLeave: function () { return [v.prevSlide, v.anchorLink, (v.sectionIndex + 1), v.prevSlideIndex, v.direction, v.slideIndex]; },
// 				};
// 			}

// 			return paramsPerEvent[eventName]();
// 		}

// 		/**
// 		* Performs the vertical movement (by CSS3 or by jQuery)
// 		*/
// 		function performMovement(v) {
// 			// using CSS3 translate functionality
// 			if (options.css3 && options.autoScrolling && !options.scrollBar) {

// 				// The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
// 				// that's why we round it to 0.
// 				var translate3d = 'translate3d(0px, -' + Math.round(v.dtop) + 'px, 0px)';
// 				transformContainer(translate3d, true);

// 				//even when the scrollingSpeed is 0 there's a little delay, which might cause the
// 				//scrollingSpeed to change in case of using silentMoveTo();
// 				if (options.scrollingSpeed) {
// 					clearTimeout(afterSectionLoadsId);
// 					afterSectionLoadsId = setTimeout(function () {
// 						afterSectionLoads(v);
// 					}, options.scrollingSpeed);
// 				} else {
// 					afterSectionLoads(v);
// 				}
// 			}

// 			// using JS to animate
// 			else {
// 				var scrollSettings = getScrollSettings(v.dtop);
// 				FP.test.top = -v.dtop + 'px';

// 				scrollTo(scrollSettings.element, scrollSettings.options, options.scrollingSpeed, function () {
// 					if (options.scrollBar) {

// 						/* Hack!
// 						The timeout prevents setting the most dominant section in the viewport as "active" when the user
// 						scrolled to a smaller section by using the mousewheel (auto scrolling) rather than draging the scroll bar.

// 						When using scrollBar:true It seems like the scroll events still getting propagated even after the scrolling animation has finished.
// 						*/
// 						setTimeout(function () {
// 							afterSectionLoads(v);
// 						}, 30);
// 					} else {
// 						afterSectionLoads(v);
// 					}
// 				});
// 			}
// 		}

// 		/**
// 		* Gets the scrolling settings depending on the plugin autoScrolling option
// 		*/
// 		function getScrollSettings(top) {
// 			var scroll = {};

// 			//top property animation
// 			if (options.autoScrolling && !options.scrollBar) {
// 				scroll.options = -top;
// 				scroll.element = $(WRAPPER_SEL)[0];
// 			}

// 			//window real scrolling
// 			else {
// 				scroll.options = top;
// 				scroll.element = window;
// 			}

// 			return scroll;
// 		}

// 		/**
// 		* Adds sections before or after the current one to create the infinite effect.
// 		*/
// 		function createInfiniteSections(v) {
// 			// Scrolling down
// 			if (!v.isMovementUp) {
// 				// Move all previous sections to after the active section
// 				after($(SECTION_ACTIVE_SEL)[0], prevAll(v.activeSection, SECTION_SEL).reverse());
// 			}
// 			else { // Scrolling up
// 				// Move all next sections to before the active section
// 				before($(SECTION_ACTIVE_SEL)[0], nextAll(v.activeSection, SECTION_SEL));
// 			}

// 			// Maintain the displayed position (now that we changed the element order)
// 			silentScroll($(SECTION_ACTIVE_SEL)[0].offsetTop);

// 			// Maintain the active slides visible in the viewport
// 			keepSlidesPosition();

// 			// save for later the elements that still need to be reordered
// 			v.wrapAroundElements = v.activeSection;

// 			// Recalculate animation variables
// 			v.dtop = v.element.offsetTop;
// 			v.yMovement = getYmovement(v.element);

// 			//sections will temporally have another position in the DOM
// 			//updating this values in case we need them
// 			v.leavingSection = index(v.activeSection, SECTION_SEL) + 1;
// 			v.sectionIndex = index(v.element, SECTION_SEL);

// 			return v;
// 		}

// 		/**
// 		* Fix section order after continuousVertical changes have been animated
// 		*/
// 		function continuousVerticalFixSectionOrder(v) {
// 			// If continuousVertical is in effect (and autoScrolling would also be in effect then),
// 			// finish moving the elements around so the direct navigation will function more simply
// 			if (v.wrapAroundElements == null) {
// 				return;
// 			}

// 			if (v.isMovementUp) {
// 				before($(SECTION_SEL)[0], v.wrapAroundElements);
// 			}
// 			else {
// 				after($(SECTION_SEL)[$(SECTION_SEL).length - 1], v.wrapAroundElements);
// 			}

// 			silentScroll($(SECTION_ACTIVE_SEL)[0].offsetTop);

// 			// Maintain the active slides visible in the viewport
// 			keepSlidesPosition();
// 		}


// 		/**
// 		* Actions to do once the section is loaded.
// 		*/
// 		function afterSectionLoads(v) {
// 			continuousVerticalFixSectionOrder(v);

// 			//callback (afterLoad) if the site is not just resizing and readjusting the slides
// 			if (isFunction(options.afterLoad) && !v.localIsResizing) {
// 				fireCallback('afterLoad', v);
// 			}

// 			if (options.scrollOverflow) {
// 				options.scrollOverflowHandler.afterLoad();
// 			}

// 			if (!v.localIsResizing) {
// 				playMedia(v.element);
// 			}

// 			addClass(v.element, COMPLETELY);
// 			removeClass(siblings(v.element), COMPLETELY);

// 			canScroll = true;

// 			if (isFunction(v.callback)) {
// 				v.callback();
// 			}
// 		}

// 		/**
// 		* Sets the value for the given attribute from the `data-` attribute with the same suffix
// 		* ie: data-srcset ==> srcset  |  data-src ==> src
// 		*/
// 		function setSrc(element, attribute) {
// 			element.setAttribute(attribute, element.getAttribute('data-' + attribute));
// 			element.removeAttribute('data-' + attribute);
// 		}

// 		/**
// 		* Lazy loads image, video and audio elements.
// 		*/
// 		function lazyLoad(destiny) {
// 			if (!options.lazyLoading) {
// 				return;
// 			}

// 			var panel = getSlideOrSection(destiny);

// 			$('img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]', panel).forEach(function (element) {
// 				['src', 'srcset'].forEach(function (type) {
// 					var attribute = element.getAttribute('data-' + type);
// 					if (attribute != null && attribute) {
// 						setSrc(element, type);
// 					}
// 				});

// 				if (matches(element, 'source')) {
// 					var elementToPlay = closest(element, 'video, audio');
// 					if (elementToPlay) {
// 						elementToPlay.load();
// 					}
// 				}
// 			});
// 		}

// 		/**
// 		* Plays video and audio elements.
// 		*/
// 		function playMedia(destiny) {
// 			var panel = getSlideOrSection(destiny);

// 			//playing HTML5 media elements
// 			$('video, audio', panel).forEach(function (element) {
// 				if (element.hasAttribute('data-autoplay') && typeof element.play === 'function') {
// 					element.play();
// 				}
// 			});

// 			//youtube videos
// 			$('iframe[src*="youtube.com/embed/"]', panel).forEach(function (element) {
// 				if (element.hasAttribute('data-autoplay')) {
// 					playYoutube(element);
// 				}

// 				//in case the URL was not loaded yet. On page load we need time for the new URL (with the API string) to load.
// 				element.onload = function () {
// 					if (element.hasAttribute('data-autoplay')) {
// 						playYoutube(element);
// 					}
// 				};
// 			});
// 		}

// 		/**
// 		* Plays a youtube video
// 		*/
// 		function playYoutube(element) {
// 			element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
// 		}

// 		/**
// 		* Stops video and audio elements.
// 		*/
// 		function stopMedia(destiny) {
// 			var panel = getSlideOrSection(destiny);

// 			//stopping HTML5 media elements
// 			$('video, audio', panel).forEach(function (element) {
// 				if (!element.hasAttribute('data-keepplaying') && typeof element.pause === 'function') {
// 					element.pause();
// 				}
// 			});

// 			//youtube videos
// 			$('iframe[src*="youtube.com/embed/"]', panel).forEach(function (element) {
// 				if (/youtube\.com\/embed\//.test(element.getAttribute('src')) && !element.hasAttribute('data-keepplaying')) {
// 					element.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
// 				}
// 			});
// 		}

// 		/**
// 		* Gets the active slide (or section) for the given section
// 		*/
// 		function getSlideOrSection(destiny) {
// 			var slide = $(SLIDE_ACTIVE_SEL, destiny);
// 			if (slide.length) {
// 				destiny = slide[0];
// 			}

// 			return destiny;
// 		}

// 		/**
// 		* Scrolls to the anchor in the URL when loading the site
// 		*/
// 		function scrollToAnchor() {
// 			var anchors = getAnchorsURL();
// 			var sectionAnchor = anchors.section;
// 			var slideAnchor = anchors.slide;

// 			if (sectionAnchor) {  //if theres any #
// 				if (options.animateAnchor) {
// 					scrollPageAndSlide(sectionAnchor, slideAnchor);
// 				} else {
// 					silentMoveTo(sectionAnchor, slideAnchor);
// 				}
// 			}
// 		}

// 		/**
// 		* Detecting any change on the URL to scroll to the given anchor link
// 		* (a way to detect back history button as we play with the hashes on the URL)
// 		*/
// 		function hashChangeHandler() {
// 			if (!isScrolling && !options.lockAnchors) {
// 				var anchors = getAnchorsURL();
// 				var sectionAnchor = anchors.section;
// 				var slideAnchor = anchors.slide;

// 				//when moving to a slide in the first section for the first time (first time to add an anchor to the URL)
// 				var isFirstSlideMove = (typeof lastScrolledDestiny === 'undefined');
// 				var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' && typeof slideAnchor === 'undefined' && !slideMoving);

// 				if (sectionAnchor && sectionAnchor.length) {
// 					/*in order to call scrollpage() only once for each destination at a time
// 					It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
// 					event is fired on every scroll too.*/
// 					if ((sectionAnchor && sectionAnchor !== lastScrolledDestiny) && !isFirstSlideMove
// 						|| isFirstScrollMove
// 						|| (!slideMoving && lastScrolledSlide != slideAnchor)) {

// 						scrollPageAndSlide(sectionAnchor, slideAnchor);
// 					}
// 				}
// 			}
// 		}

// 		//gets the URL anchors (section and slide)
// 		function getAnchorsURL() {
// 			var section;
// 			var slide;
// 			var hash = window.location.hash;

// 			if (hash.length) {
// 				//getting the anchor link in the URL and deleting the `#`
// 				var anchorsParts = hash.replace('#', '').split('/');

// 				//using / for visual reasons and not as a section/slide separator #2803
// 				var isFunkyAnchor = hash.indexOf('#/') > -1;

// 				section = isFunkyAnchor ? '/' + anchorsParts[1] : decodeURIComponent(anchorsParts[0]);

// 				var slideAnchor = isFunkyAnchor ? anchorsParts[2] : anchorsParts[1];
// 				if (slideAnchor && slideAnchor.length) {
// 					slide = decodeURIComponent(slideAnchor);
// 				}
// 			}

// 			return {
// 				section: section,
// 				slide: slide
// 			};
// 		}

// 		//Sliding with arrow keys, both, vertical and horizontal
// 		function keydownHandler(e) {
// 			clearTimeout(keydownId);

// 			var activeElement = document.activeElement;
// 			var keyCode = e.keyCode;

// 			//tab?
// 			if (keyCode === 9) {
// 				onTab(e);
// 			}

// 			else if (!matches(activeElement, 'textarea') && !matches(activeElement, 'input') && !matches(activeElement, 'select') &&
// 				activeElement.getAttribute('contentEditable') !== "true" && activeElement.getAttribute('contentEditable') !== '' &&
// 				options.keyboardScrolling && options.autoScrolling) {

// 				//preventing the scroll with arrow keys & spacebar & Page Up & Down keys
// 				var keyControls = [40, 38, 32, 33, 34];
// 				if (keyControls.indexOf(keyCode) > -1) {
// 					preventDefault(e);
// 				}

// 				controlPressed = e.ctrlKey;

// 				keydownId = setTimeout(function () {
// 					onkeydown(e);
// 				}, 150);
// 			}
// 		}

// 		function tooltipTextHandler() {
// 			/*jshint validthis:true */
// 			trigger(prev(this), 'click');
// 		}

// 		//to prevent scrolling while zooming
// 		function keyUpHandler(e) {
// 			if (isWindowFocused) { //the keyup gets fired on new tab ctrl + t in Firefox
// 				controlPressed = e.ctrlKey;
// 			}
// 		}

// 		//binding the mousemove when the mouse's middle button is released
// 		function mouseDownHandler(e) {
// 			//middle button
// 			if (e.which == 2) {
// 				oldPageY = e.pageY;
// 				container.addEventListener('mousemove', mouseMoveHandler);
// 			}
// 		}

// 		//unbinding the mousemove when the mouse's middle button is released
// 		function mouseUpHandler(e) {
// 			//middle button
// 			if (e.which == 2) {
// 				container.removeEventListener('mousemove', mouseMoveHandler);
// 			}
// 		}

// 		/**
// 		* Makes sure the tab key will only focus elements within the current section/slide
// 		* preventing this way from breaking the page.
// 		* Based on "Modals and keyboard traps"
// 		* from https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex
// 		*/
// 		function onTab(e) {
// 			var isShiftPressed = e.shiftKey;
// 			var activeElement = document.activeElement;
// 			var focusableElements = getFocusables(getSlideOrSection($(SECTION_ACTIVE_SEL)[0]));

// 			function preventAndFocusFirst(e) {
// 				preventDefault(e);
// 				return focusableElements[0] ? focusableElements[0].focus() : null;
// 			}

// 			//outside any section or slide? Let's not hijack the tab!
// 			if (isFocusOutside(e)) {
// 				return;
// 			}

// 			//is there an element with focus?
// 			if (activeElement) {
// 				if (closest(activeElement, SECTION_ACTIVE_SEL + ',' + SECTION_ACTIVE_SEL + ' ' + SLIDE_ACTIVE_SEL) == null) {
// 					activeElement = preventAndFocusFirst(e);
// 				}
// 			}

// 			//no element if focused? Let's focus the first one of the section/slide
// 			else {
// 				preventAndFocusFirst(e);
// 			}

// 			//when reached the first or last focusable element of the section/slide
// 			//we prevent the tab action to keep it in the last focusable element
// 			if (!isShiftPressed && activeElement == focusableElements[focusableElements.length - 1] ||
// 				isShiftPressed && activeElement == focusableElements[0]
// 			) {
// 				preventDefault(e);
// 			}
// 		}

// 		/**
// 		* Gets all the focusable elements inside the passed element.
// 		*/
// 		function getFocusables(el) {
// 			return [].slice.call($(focusableElementsString, el)).filter(function (item) {
// 				return item.getAttribute('tabindex') !== '-1'
// 					//are also not hidden elements (or with hidden parents)
// 					&& item.offsetParent !== null;
// 			});
// 		}

// 		/**
// 		* Determines whether the focus is outside fullpage.js sections/slides or not.
// 		*/
// 		function isFocusOutside(e) {
// 			var allFocusables = getFocusables(document);
// 			var currentFocusIndex = allFocusables.indexOf(document.activeElement);
// 			var focusDestinationIndex = e.shiftKey ? currentFocusIndex - 1 : currentFocusIndex + 1;
// 			var focusDestination = allFocusables[focusDestinationIndex];
// 			var destinationItemSlide = nullOrSlide(closest(focusDestination, SLIDE_SEL));
// 			var destinationItemSection = nullOrSection(closest(focusDestination, SECTION_SEL));

// 			return !destinationItemSlide && !destinationItemSection;
// 		}

// 		//Scrolling horizontally when clicking on the slider controls.
// 		function slideArrowHandler() {
// 			/*jshint validthis:true */
// 			var section = closest(this, SECTION_SEL);

// 			/*jshint validthis:true */
// 			if (hasClass(this, SLIDES_PREV)) {
// 				if (isScrollAllowed.m.left) {
// 					moveSlideLeft(section);
// 				}
// 			} else {
// 				if (isScrollAllowed.m.right) {
// 					moveSlideRight(section);
// 				}
// 			}
// 		}

// 		//when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
// 		function blurHandler() {
// 			isWindowFocused = false;
// 			controlPressed = false;
// 		}

// 		//Scrolls to the section when clicking the navigation bullet
// 		function sectionBulletHandler(e) {
// 			preventDefault(e);

// 			/*jshint validthis:true */
// 			var indexBullet = index(closest(this, SECTION_NAV_SEL + ' li'));
// 			scrollPage($(SECTION_SEL)[indexBullet]);
// 		}

// 		//Scrolls the slider to the given slide destination for the given section
// 		function slideBulletHandler(e) {
// 			preventDefault(e);

// 			/*jshint validthis:true */
// 			var slides = $(SLIDES_WRAPPER_SEL, closest(this, SECTION_SEL))[0];
// 			var destiny = $(SLIDE_SEL, slides)[index(closest(this, 'li'))];

// 			landscapeScroll(slides, destiny);
// 		}

// 		//Menu item handler when not using anchors or using lockAnchors:true
// 		function menuItemsHandler(e) {
// 			if ($(options.menu)[0] && (options.lockAnchors || !options.anchors.length)) {
// 				preventDefault(e);
// 				moveTo(this.getAttribute('data-menuanchor'));
// 			}
// 		}

// 		/**
// 		* Keydown event
// 		*/
// 		function onkeydown(e) {
// 			var shiftPressed = e.shiftKey;

// 			//do nothing if we can not scroll or we are not using horizotnal key arrows.
// 			if (!canScroll && [37, 39].indexOf(e.keyCode) < 0) {
// 				return;
// 			}

// 			switch (e.keyCode) {
// 				//up
// 				case 38:
// 				case 33:
// 					if (isScrollAllowed.k.up) {
// 						moveSectionUp();
// 					}
// 					break;

// 				//down
// 				case 32: //spacebar
// 					if (shiftPressed && isScrollAllowed.k.up) {
// 						moveSectionUp();
// 						break;
// 					}
// 				/* falls through */
// 				case 40:
// 				case 34:
// 					if (isScrollAllowed.k.down) {
// 						moveSectionDown();
// 					}
// 					break;

// 				//Home
// 				case 36:
// 					if (isScrollAllowed.k.up) {
// 						moveTo(1);
// 					}
// 					break;

// 				//End
// 				case 35:
// 					if (isScrollAllowed.k.down) {
// 						moveTo($(SECTION_SEL).length);
// 					}
// 					break;

// 				//left
// 				case 37:
// 					if (isScrollAllowed.k.left) {
// 						moveSlideLeft();
// 					}
// 					break;

// 				//right
// 				case 39:
// 					if (isScrollAllowed.k.right) {
// 						moveSlideRight();
// 					}
// 					break;

// 				default:
// 					return; // exit this handler for other keys
// 			}
// 		}

// 		/**
// 		* Detecting the direction of the mouse movement.
// 		* Used only for the middle button of the mouse.
// 		*/
// 		var oldPageY = 0;
// 		function mouseMoveHandler(e) {
// 			if (canScroll) {
// 				// moving up
// 				if (e.pageY < oldPageY && isScrollAllowed.m.up) {
// 					moveSectionUp();
// 				}

// 				// moving down
// 				else if (e.pageY > oldPageY && isScrollAllowed.m.down) {
// 					moveSectionDown();
// 				}
// 			}
// 			oldPageY = e.pageY;
// 		}

// 		/**
// 		* Scrolls horizontal sliders.
// 		*/
// 		function landscapeScroll(slides, destiny, direction) {
// 			var section = closest(slides, SECTION_SEL);
// 			var v = {
// 				slides: slides,
// 				destiny: destiny,
// 				direction: direction,
// 				destinyPos: { left: destiny.offsetLeft },
// 				slideIndex: index(destiny),
// 				section: section,
// 				sectionIndex: index(section, SECTION_SEL),
// 				anchorLink: section.getAttribute('data-anchor'),
// 				slidesNav: $(SLIDES_NAV_SEL, section)[0],
// 				slideAnchor: getAnchor(destiny),
// 				prevSlide: $(SLIDE_ACTIVE_SEL, section)[0],
// 				prevSlideIndex: index($(SLIDE_ACTIVE_SEL, section)[0]),

// 				//caching the value of isResizing at the momment the function is called
// 				//because it will be checked later inside a setTimeout and the value might change
// 				localIsResizing: isResizing
// 			};
// 			v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex);

// 			//important!! Only do it when not resizing
// 			if (!v.localIsResizing) {
// 				//preventing from scrolling to the next/prev section when using scrollHorizontally
// 				canScroll = false;
// 			}

// 			if (options.onSlideLeave) {

// 				//if the site is not just resizing and readjusting the slides
// 				if (!v.localIsResizing && v.xMovement !== 'none') {
// 					if (isFunction(options.onSlideLeave)) {
// 						if (fireCallback('onSlideLeave', v) === false) {
// 							slideMoving = false;
// 							return;
// 						}
// 					}
// 				}
// 			}

// 			addClass(destiny, ACTIVE);
// 			removeClass(siblings(destiny), ACTIVE);

// 			if (!v.localIsResizing) {
// 				stopMedia(v.prevSlide);
// 				lazyLoad(destiny);
// 			}

// 			if (!options.loopHorizontal && options.controlArrows) {
// 				//hidding it for the fist slide, showing for the rest
// 				toggle($(SLIDES_ARROW_PREV_SEL, section), v.slideIndex !== 0);

// 				//hidding it for the last slide, showing for the rest
// 				toggle($(SLIDES_ARROW_NEXT_SEL, section), next(destiny) != null);
// 			}

// 			//only changing the URL if the slides are in the current section (not for resize re-adjusting)
// 			if (hasClass(section, ACTIVE) && !v.localIsResizing) {
// 				setState(v.slideIndex, v.slideAnchor, v.anchorLink, v.sectionIndex);
// 			}

// 			performHorizontalMove(slides, v, true);
// 		}


// 		function afterSlideLoads(v) {
// 			activeSlidesNavigation(v.slidesNav, v.slideIndex);

// 			//if the site is not just resizing and readjusting the slides
// 			if (!v.localIsResizing) {
// 				if (isFunction(options.afterSlideLoad)) {
// 					fireCallback('afterSlideLoad', v);
// 				}

// 				//needs to be inside the condition to prevent problems with continuousVertical and scrollHorizontally
// 				//and to prevent double scroll right after a windows resize
// 				canScroll = true;

// 				playMedia(v.destiny);
// 			}

// 			//letting them slide again
// 			slideMoving = false;
// 		}

// 		/**
// 		* Performs the horizontal movement. (CSS3 or jQuery)
// 		*
// 		* @param fireCallback {Bool} - determines whether or not to fire the callback
// 		*/
// 		function performHorizontalMove(slides, v, fireCallback) {
// 			var destinyPos = v.destinyPos;

// 			if (options.css3) {
// 				var translate3d = 'translate3d(-' + Math.round(destinyPos.left) + 'px, 0px, 0px)';

// 				FP.test.translate3dH[v.sectionIndex] = translate3d;
// 				css(addAnimation($(SLIDES_CONTAINER_SEL, slides)), getTransforms(translate3d));

// 				afterSlideLoadsId = setTimeout(function () {
// 					if (fireCallback) {
// 						afterSlideLoads(v);
// 					}
// 				}, options.scrollingSpeed);
// 			} else {
// 				FP.test.left[v.sectionIndex] = Math.round(destinyPos.left);

// 				scrollTo(slides, Math.round(destinyPos.left), options.scrollingSpeed, function () {
// 					if (fireCallback) {
// 						afterSlideLoads(v);
// 					}
// 				});
// 			}
// 		}

// 		/**
// 		* Sets the state for the horizontal bullet navigations.
// 		*/
// 		function activeSlidesNavigation(slidesNav, slideIndex) {
// 			if (options.slidesNavigation && slidesNav != null) {
// 				removeClass($(ACTIVE_SEL, slidesNav), ACTIVE);
// 				addClass($('a', $('li', slidesNav)[slideIndex]), ACTIVE);
// 			}
// 		}

// 		var previousHeight = windowsHeight;

// 		//when resizing the site, we adjust the heights of the sections, slimScroll...
// 		function resizeHandler() {
// 			//checking if it needs to get responsive
// 			responsive();

// 			// rebuild immediately on touch devices
// 			if (isTouchDevice) {
// 				var activeElement = document.activeElement;

// 				//if the keyboard is NOT visible
// 				if (!matches(activeElement, 'textarea') && !matches(activeElement, 'input') && !matches(activeElement, 'select')) {
// 					var currentHeight = getWindowHeight();

// 					//making sure the change in the viewport size is enough to force a rebuild. (20 % of the window to avoid problems when hidding scroll bars)
// 					if (Math.abs(currentHeight - previousHeight) > (20 * Math.max(previousHeight, currentHeight) / 100)) {
// 						resizeId = setTimeout(function () {
// 							reBuild(true);
// 							previousHeight = currentHeight;

// 							//issue #3336
// 							//when using Chrome we add a small timeout to get the right window height
// 							//https://stackoverflow.com/a/12556928/1081396
// 							//https://stackoverflow.com/questions/13807810/ios-chrome-detection
// 						}, navigator.userAgent.match('CriOS') ? 50 : 0);
// 					}
// 				}
// 			} else {
// 				//in order to call the functions only when the resize is finished
// 				//http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
// 				clearTimeout(resizeId);

// 				resizeId = setTimeout(function () {
// 					reBuild(true);
// 				}, 350);
// 			}
// 		}

// 		/**
// 		* Checks if the site needs to get responsive and disables autoScrolling if so.
// 		* A class `fp-responsive` is added to the plugin's container in case the user wants to use it for his own responsive CSS.
// 		*/
// 		function responsive() {
// 			var widthLimit = options.responsive || options.responsiveWidth; //backwards compatiblity
// 			var heightLimit = options.responsiveHeight;

// 			//only calculating what we need. Remember its called on the resize event.
// 			var isBreakingPointWidth = widthLimit && window.innerWidth < widthLimit;
// 			var isBreakingPointHeight = heightLimit && window.innerHeight < heightLimit;

// 			if (widthLimit && heightLimit) {
// 				setResponsive(isBreakingPointWidth || isBreakingPointHeight);
// 			}
// 			else if (widthLimit) {
// 				setResponsive(isBreakingPointWidth);
// 			}
// 			else if (heightLimit) {
// 				setResponsive(isBreakingPointHeight);
// 			}
// 		}

// 		/**
// 		* Adds transition animations for the given element
// 		*/
// 		function addAnimation(element) {
// 			var transition = 'all ' + options.scrollingSpeed + 'ms ' + options.easingcss3;

// 			removeClass(element, NO_TRANSITION);
// 			return css(element, {
// 				'-webkit-transition': transition,
// 				'transition': transition
// 			});
// 		}

// 		/**
// 		* Remove transition animations for the given element
// 		*/
// 		function removeAnimation(element) {
// 			return addClass(element, NO_TRANSITION);
// 		}

// 		/**
// 		* Activating the vertical navigation bullets according to the given slide name.
// 		*/
// 		function activateNavDots(name, sectionIndex) {
// 			if (options.navigation && $(SECTION_NAV_SEL)[0] != null) {
// 				removeClass($(ACTIVE_SEL, $(SECTION_NAV_SEL)[0]), ACTIVE);
// 				if (name) {
// 					addClass($('a[href="#' + name + '"]', $(SECTION_NAV_SEL)[0]), ACTIVE);
// 				} else {
// 					addClass($('a', $('li', $(SECTION_NAV_SEL)[0])[sectionIndex]), ACTIVE);
// 				}
// 			}
// 		}

// 		/**
// 		* Activating the website main menu elements according to the given slide name.
// 		*/
// 		function activateMenuElement(name) {
// 			var menu = $(options.menu)[0];
// 			if (options.menu && menu != null) {
// 				removeClass($(ACTIVE_SEL, menu), ACTIVE);
// 				addClass($('[data-menuanchor="' + name + '"]', menu), ACTIVE);
// 			}
// 		}

// 		/**
// 		* Sets to active the current menu and vertical nav items.
// 		*/
// 		function activateMenuAndNav(anchor, index) {
// 			activateMenuElement(anchor);
// 			activateNavDots(anchor, index);
// 		}

// 		/**
// 		* Retuns `up` or `down` depending on the scrolling movement to reach its destination
// 		* from the current section.
// 		*/
// 		function getYmovement(destiny) {
// 			var fromIndex = index($(SECTION_ACTIVE_SEL)[0], SECTION_SEL);
// 			var toIndex = index(destiny, SECTION_SEL);
// 			if (fromIndex == toIndex) {
// 				return 'none';
// 			}
// 			if (fromIndex > toIndex) {
// 				return 'up';
// 			}
// 			return 'down';
// 		}

// 		/**
// 		* Retuns `right` or `left` depending on the scrolling movement to reach its destination
// 		* from the current slide.
// 		*/
// 		function getXmovement(fromIndex, toIndex) {
// 			if (fromIndex == toIndex) {
// 				return 'none';
// 			}
// 			if (fromIndex > toIndex) {
// 				return 'left';
// 			}
// 			return 'right';
// 		}

// 		function addTableClass(element) {
// 			//In case we are styling for the 2nd time as in with reponsiveSlides
// 			if (!hasClass(element, TABLE)) {
// 				var wrapper = document.createElement('div');
// 				wrapper.className = TABLE_CELL;
// 				wrapper.style.height = getTableHeight(element) + 'px';

// 				addClass(element, TABLE);
// 				wrapInner(element, wrapper);
// 			}
// 		}

// 		function getTableHeight(element) {
// 			var sectionHeight = windowsHeight;

// 			if (options.paddingTop || options.paddingBottom) {
// 				var section = element;
// 				if (!hasClass(section, SECTION)) {
// 					section = closest(element, SECTION_SEL);
// 				}

// 				var paddings = parseInt(getComputedStyle(section)['padding-top']) + parseInt(getComputedStyle(section)['padding-bottom']);
// 				sectionHeight = (windowsHeight - paddings);
// 			}

// 			return sectionHeight;
// 		}

// 		/**
// 		* Adds a css3 transform property to the container class with or without animation depending on the animated param.
// 		*/
// 		function transformContainer(translate3d, animated) {
// 			if (animated) {
// 				addAnimation(container);
// 			} else {
// 				removeAnimation(container);
// 			}

// 			css(container, getTransforms(translate3d));
// 			FP.test.translate3d = translate3d;

// 			//syncronously removing the class after the animation has been applied.
// 			setTimeout(function () {
// 				removeClass(container, NO_TRANSITION);
// 			}, 10);
// 		}

// 		/**
// 		* Gets a section by its anchor / index
// 		*/
// 		function getSectionByAnchor(sectionAnchor) {
// 			var section = $(SECTION_SEL + '[data-anchor="' + sectionAnchor + '"]', container)[0];
// 			if (!section) {
// 				var sectionIndex = typeof sectionAnchor !== 'undefined' ? sectionAnchor - 1 : 0;
// 				section = $(SECTION_SEL)[sectionIndex];
// 			}

// 			return section;
// 		}

// 		/**
// 		* Gets a slide inside a given section by its anchor / index
// 		*/
// 		function getSlideByAnchor(slideAnchor, section) {
// 			var slide = $(SLIDE_SEL + '[data-anchor="' + slideAnchor + '"]', section)[0];
// 			if (slide == null) {
// 				slideAnchor = typeof slideAnchor !== 'undefined' ? slideAnchor : 0;
// 				slide = $(SLIDE_SEL, section)[slideAnchor];
// 			}

// 			return slide;
// 		}

// 		/**
// 		* Scrolls to the given section and slide anchors
// 		*/
// 		function scrollPageAndSlide(sectionAnchor, slideAnchor) {
// 			var section = getSectionByAnchor(sectionAnchor);

// 			//do nothing if there's no section with the given anchor name
// 			if (section == null) return;

// 			var slide = getSlideByAnchor(slideAnchor, section);

// 			//we need to scroll to the section and then to the slide
// 			if (getAnchor(section) !== lastScrolledDestiny && !hasClass(section, ACTIVE)) {
// 				scrollPage(section, function () {
// 					scrollSlider(slide);
// 				});
// 			}
// 			//if we were already in the section
// 			else {
// 				scrollSlider(slide);
// 			}
// 		}

// 		/**
// 		* Scrolls the slider to the given slide destination for the given section
// 		*/
// 		function scrollSlider(slide) {
// 			if (slide != null) {
// 				landscapeScroll(closest(slide, SLIDES_WRAPPER_SEL), slide);
// 			}
// 		}

// 		/**
// 		* Creates a landscape navigation bar with dots for horizontal sliders.
// 		*/
// 		function addSlidesNavigation(section, numSlides) {
// 			appendTo(createElementFromHTML('<div class="' + SLIDES_NAV + '"><ul></ul></div>'), section);
// 			var nav = $(SLIDES_NAV_SEL, section)[0];

// 			//top or bottom
// 			addClass(nav, 'fp-' + options.slidesNavPosition);

// 			for (var i = 0; i < numSlides; i++) {
// 				appendTo(createElementFromHTML('<li><a href="#"><span class="fp-sr-only">' + getBulletLinkName(i, 'Slide') + '</span><span></span></a></li>'), $('ul', nav)[0]);
// 			}

// 			//centering it
// 			css(nav, { 'margin-left': '-' + (nav.innerWidth / 2) + 'px' });

// 			addClass($('a', $('li', nav)[0]), ACTIVE);
// 		}


// 		/**
// 		* Sets the state of the website depending on the active section/slide.
// 		* It changes the URL hash when needed and updates the body class.
// 		*/
// 		function setState(slideIndex, slideAnchor, anchorLink, sectionIndex) {
// 			var sectionHash = '';

// 			if (options.anchors.length && !options.lockAnchors) {

// 				//isn't it the first slide?
// 				if (slideIndex) {
// 					if (anchorLink != null) {
// 						sectionHash = anchorLink;
// 					}

// 					//slide without anchor link? We take the index instead.
// 					if (slideAnchor == null) {
// 						slideAnchor = slideIndex;
// 					}

// 					lastScrolledSlide = slideAnchor;
// 					setUrlHash(sectionHash + '/' + slideAnchor);

// 					//first slide won't have slide anchor, just the section one
// 				} else if (slideIndex != null) {
// 					lastScrolledSlide = slideAnchor;
// 					setUrlHash(anchorLink);
// 				}

// 				//section without slides
// 				else {
// 					setUrlHash(anchorLink);
// 				}
// 			}

// 			setBodyClass();
// 		}

// 		/**
// 		* Sets the URL hash.
// 		*/
// 		function setUrlHash(url) {
// 			if (options.recordHistory) {
// 				location.hash = url;
// 			} else {
// 				//Mobile Chrome doesn't work the normal way, so... lets use HTML5 for phones :)
// 				if (isTouchDevice || isTouch) {
// 					window.history.replaceState(undefined, undefined, '#' + url);
// 				} else {
// 					var baseUrl = window.location.href.split('#')[0];
// 					window.location.replace(baseUrl + '#' + url);
// 				}
// 			}
// 		}

// 		/**
// 		* Gets the anchor for the given slide / section. Its index will be used if there's none.
// 		*/
// 		function getAnchor(element) {
// 			if (!element) {
// 				return null;
// 			}
// 			var anchor = element.getAttribute('data-anchor');
// 			var elementIndex = index(element);

// 			//Slide without anchor link? We take the index instead.
// 			if (anchor == null) {
// 				anchor = elementIndex;
// 			}

// 			return anchor;
// 		}

// 		/**
// 		* Sets a class for the body of the page depending on the active section / slide
// 		*/
// 		function setBodyClass() {
// 			var section = $(SECTION_ACTIVE_SEL)[0];
// 			var slide = $(SLIDE_ACTIVE_SEL, section)[0];

// 			var sectionAnchor = getAnchor(section);
// 			var slideAnchor = getAnchor(slide);

// 			var text = String(sectionAnchor);

// 			if (slide) {
// 				text = text + '-' + slideAnchor;
// 			}

// 			//changing slash for dash to make it a valid CSS style
// 			text = text.replace('/', '-').replace('#', '');

// 			//removing previous anchor classes
// 			var classRe = new RegExp('\\b\\s?' + VIEWING_PREFIX + '-[^\\s]+\\b', "g");
// 			$body.className = $body.className.replace(classRe, '');

// 			//adding the current anchor
// 			addClass($body, VIEWING_PREFIX + '-' + text);
// 		}

// 		/**
// 		* Checks for translate3d support
// 		* @return boolean
// 		* http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
// 		*/
// 		function support3d() {
// 			var el = document.createElement('p'),
// 				has3d,
// 				transforms = {
// 					'webkitTransform': '-webkit-transform',
// 					'OTransform': '-o-transform',
// 					'msTransform': '-ms-transform',
// 					'MozTransform': '-moz-transform',
// 					'transform': 'transform'
// 				};

// 			//preventing the style p:empty{display: none;} from returning the wrong result
// 			el.style.display = 'block'

// 			// Add it to the body to get the computed style.
// 			document.body.insertBefore(el, null);

// 			for (var t in transforms) {
// 				if (el.style[t] !== undefined) {
// 					el.style[t] = 'translate3d(1px,1px,1px)';
// 					has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
// 				}
// 			}

// 			document.body.removeChild(el);

// 			return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
// 		}

// 		/**
// 		* Removes the auto scrolling action fired by the mouse wheel and trackpad.
// 		* After this function is called, the mousewheel and trackpad movements won't scroll through sections.
// 		*/
// 		function removeMouseWheelHandler() {
// 			if (document.addEventListener) {
// 				document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
// 				document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
// 				document.removeEventListener('MozMousePixelScroll', MouseWheelHandler, false); //old Firefox
// 			} else {
// 				document.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
// 			}
// 		}

// 		/**
// 		* Adds the auto scrolling action for the mouse wheel and trackpad.
// 		* After this function is called, the mousewheel and trackpad movements will scroll through sections
// 		* https://developer.mozilla.org/en-US/docs/Web/Events/wheel
// 		*/
// 		function addMouseWheelHandler() {
// 			var prefix = '';
// 			var _addEventListener;

// 			if (window.addEventListener) {
// 				_addEventListener = "addEventListener";
// 			} else {
// 				_addEventListener = "attachEvent";
// 				prefix = 'on';
// 			}

// 			// detect available wheel event
// 			var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
// 				document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
// 					'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox


// 			if (support == 'DOMMouseScroll') {
// 				document[_addEventListener](prefix + 'MozMousePixelScroll', MouseWheelHandler, false);
// 			}

// 			//handle MozMousePixelScroll in older Firefox
// 			else {
// 				document[_addEventListener](prefix + support, MouseWheelHandler, false);
// 			}
// 		}

// 		/**
// 		* Binding the mousemove when the mouse's middle button is pressed
// 		*/
// 		function addMiddleWheelHandler() {
// 			container.addEventListener('mousedown', mouseDownHandler);
// 			container.addEventListener('mouseup', mouseUpHandler);
// 		}

// 		/**
// 		* Unbinding the mousemove when the mouse's middle button is released
// 		*/
// 		function removeMiddleWheelHandler() {
// 			container.removeEventListener('mousedown', mouseDownHandler);
// 			container.removeEventListener('mouseup', mouseUpHandler);
// 		}

// 		/**
// 		* Adds the possibility to auto scroll through sections on touch devices.
// 		*/
// 		function addTouchHandler() {
// 			if (isTouchDevice || isTouch) {
// 				if (options.autoScrolling) {
// 					$body.removeEventListener(events.touchmove, preventBouncing, { passive: false });
// 					$body.addEventListener(events.touchmove, preventBouncing, { passive: false });
// 				}

// 				var wrapper = $(WRAPPER_SEL)[0];
// 				if (wrapper) {
// 					wrapper.removeEventListener(events.touchstart, touchStartHandler);
// 					wrapper.removeEventListener(events.touchmove, touchMoveHandler, { passive: false });

// 					wrapper.addEventListener(events.touchstart, touchStartHandler);
// 					wrapper.addEventListener(events.touchmove, touchMoveHandler, { passive: false });
// 				}
// 			}
// 		}

// 		/**
// 		* Removes the auto scrolling for touch devices.
// 		*/
// 		function removeTouchHandler() {
// 			if (isTouchDevice || isTouch) {
// 				// normalScrollElements requires it off #2691
// 				if (options.autoScrolling) {
// 					$body.removeEventListener(events.touchmove, touchMoveHandler, { passive: false });
// 					$body.removeEventListener(events.touchmove, preventBouncing, { passive: false });
// 				}

// 				var wrapper = $(WRAPPER_SEL)[0];
// 				if (wrapper) {
// 					wrapper.removeEventListener(events.touchstart, touchStartHandler);
// 					wrapper.removeEventListener(events.touchmove, touchMoveHandler, { passive: false });
// 				}
// 			}
// 		}

// 		/*
// 		* Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
// 		* http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
// 		*/
// 		function getMSPointer() {
// 			var pointer;

// 			//IE >= 11 & rest of browsers
// 			if (window.PointerEvent) {
// 				pointer = { down: 'pointerdown', move: 'pointermove' };
// 			}

// 			//IE < 11
// 			else {
// 				pointer = { down: 'MSPointerDown', move: 'MSPointerMove' };
// 			}

// 			return pointer;
// 		}

// 		/**
// 		* Gets the pageX and pageY properties depending on the browser.
// 		* https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
// 		*/
// 		function getEventsPage(e) {
// 			var events = [];

// 			events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
// 			events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

// 			//in touch devices with scrollBar:true, e.pageY is detected, but we have to deal with touch events. #1008
// 			if (isTouch && isReallyTouch(e) && options.scrollBar && typeof e.touches !== 'undefined') {
// 				events.y = e.touches[0].pageY;
// 				events.x = e.touches[0].pageX;
// 			}

// 			return events;
// 		}

// 		/**
// 		* Slides silently (with no animation) the active slider to the given slide.
// 		* @param noCallback {bool} true or defined -> no callbacks
// 		*/
// 		function silentLandscapeScroll(activeSlide, noCallbacks) {
// 			setScrollingSpeed(0, 'internal');

// 			if (typeof noCallbacks !== 'undefined') {
// 				//preventing firing callbacks afterSlideLoad etc.
// 				isResizing = true;
// 			}

// 			landscapeScroll(closest(activeSlide, SLIDES_WRAPPER_SEL), activeSlide);

// 			if (typeof noCallbacks !== 'undefined') {
// 				isResizing = false;
// 			}

// 			setScrollingSpeed(originals.scrollingSpeed, 'internal');
// 		}

// 		/**
// 		* Scrolls silently (with no animation) the page to the given Y position.
// 		*/
// 		function silentScroll(top) {
// 			// The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
// 			// that's why we round it to 0.
// 			var roundedTop = Math.round(top);

// 			if (options.css3 && options.autoScrolling && !options.scrollBar) {
// 				var translate3d = 'translate3d(0px, -' + roundedTop + 'px, 0px)';
// 				transformContainer(translate3d, false);
// 			}
// 			else if (options.autoScrolling && !options.scrollBar) {
// 				css(container, { 'top': -roundedTop + 'px' });
// 				FP.test.top = -roundedTop + 'px';
// 			}
// 			else {
// 				var scrollSettings = getScrollSettings(roundedTop);
// 				setScrolling(scrollSettings.element, scrollSettings.options);
// 			}
// 		}

// 		/**
// 		* Returns the cross-browser transform string.
// 		*/
// 		function getTransforms(translate3d) {
// 			return {
// 				'-webkit-transform': translate3d,
// 				'-moz-transform': translate3d,
// 				'-ms-transform': translate3d,
// 				'transform': translate3d
// 			};
// 		}

// 		/**
// 		* Allowing or disallowing the mouse/swipe scroll in a given direction. (not for keyboard)
// 		* @type  m (mouse) or k (keyboard)
// 		*/
// 		function setIsScrollAllowed(value, direction, type) {
// 			//up, down, left, right
// 			if (direction !== 'all') {
// 				isScrollAllowed[type][direction] = value;
// 			}

// 			//all directions?
// 			else {
// 				Object.keys(isScrollAllowed[type]).forEach(function (key) {
// 					isScrollAllowed[type][key] = value;
// 				});
// 			}
// 		}

// 		/*
// 		* Destroys fullpage.js plugin events and optinally its html markup and styles
// 		*/
// 		function destroy(all) {
// 			setAutoScrolling(false, 'internal');
// 			setAllowScrolling(true);
// 			setMouseHijack(false);
// 			setKeyboardScrolling(false);
// 			addClass(container, DESTROYED);

// 			clearTimeout(afterSlideLoadsId);
// 			clearTimeout(afterSectionLoadsId);
// 			clearTimeout(resizeId);
// 			clearTimeout(scrollId);
// 			clearTimeout(scrollId2);

// 			window.removeEventListener('scroll', scrollHandler);
// 			window.removeEventListener('hashchange', hashChangeHandler);
// 			window.removeEventListener('resize', resizeHandler);

// 			document.removeEventListener('keydown', keydownHandler);
// 			document.removeEventListener('keyup', keyUpHandler);

// 			['click', 'touchstart'].forEach(function (eventName) {
// 				document.removeEventListener(eventName, delegatedEvents);
// 			});

// 			['mouseenter', 'touchstart', 'mouseleave', 'touchend'].forEach(function (eventName) {
// 				document.removeEventListener(eventName, onMouseEnterOrLeave, true); //true is required!
// 			});

// 			clearTimeout(afterSlideLoadsId);
// 			clearTimeout(afterSectionLoadsId);

// 			//lets make a mess!
// 			if (all) {
// 				destroyStructure();
// 			}
// 		}

// 		/*
// 		* Removes inline styles added by fullpage.js
// 		*/
// 		function destroyStructure() {
// 			//reseting the `top` or `translate` properties to 0
// 			silentScroll(0);

// 			//loading all the lazy load content
// 			$('img[data-src], source[data-src], audio[data-src], iframe[data-src]', container).forEach(function (item) {
// 				setSrc(item, 'src');
// 			});

// 			$('img[data-srcset]').forEach(function (item) {
// 				setSrc(item, 'srcset');
// 			});

// 			remove($(SECTION_NAV_SEL + ', ' + SLIDES_NAV_SEL + ', ' + SLIDES_ARROW_SEL));

// 			//removing inline styles
// 			css($(SECTION_SEL), {
// 				'height': '',
// 				'background-color': '',
// 				'padding': ''
// 			});

// 			css($(SLIDE_SEL), {
// 				'width': ''
// 			});

// 			css(container, {
// 				'height': '',
// 				'position': '',
// 				'-ms-touch-action': '',
// 				'touch-action': ''
// 			});

// 			css($htmlBody, {
// 				'overflow': '',
// 				'height': ''
// 			});

// 			// remove .fp-enabled class
// 			removeClass($('html'), ENABLED);

// 			// remove .fp-responsive class
// 			removeClass($body, RESPONSIVE);

// 			// remove all of the .fp-viewing- classes
// 			$body.className.split(/\s+/).forEach(function (className) {
// 				if (className.indexOf(VIEWING_PREFIX) === 0) {
// 					removeClass($body, className);
// 				}
// 			});

// 			//removing added classes
// 			$(SECTION_SEL + ', ' + SLIDE_SEL).forEach(function (item) {
// 				if (options.scrollOverflowHandler && options.scrollOverflow) {
// 					options.scrollOverflowHandler.remove(item);
// 				}
// 				removeClass(item, TABLE + ' ' + ACTIVE + ' ' + COMPLETELY);
// 				var previousStyles = item.getAttribute('data-fp-styles');
// 				if (previousStyles) {
// 					item.setAttribute('style', item.getAttribute('data-fp-styles'));
// 				}

// 				//removing anchors if they were not set using the HTML markup
// 				if (hasClass(item, SECTION) && !g_initialAnchorsInDom) {
// 					item.removeAttribute('data-anchor');
// 				}
// 			});

// 			//removing the applied transition from the fullpage wrapper
// 			removeAnimation(container);

// 			//Unwrapping content
// 			[TABLE_CELL_SEL, SLIDES_CONTAINER_SEL, SLIDES_WRAPPER_SEL].forEach(function (selector) {
// 				$(selector, container).forEach(function (item) {
// 					//unwrap not being use in case there's no child element inside and its just text
// 					unwrap(item);
// 				});
// 			});

// 			//removing the applied transition from the fullpage wrapper
// 			css(container, {
// 				'-webkit-transition': 'none',
// 				'transition': 'none'
// 			});

// 			//scrolling the page to the top with no animation
// 			window.scrollTo(0, 0);

// 			//removing selectors
// 			var usedSelectors = [SECTION, SLIDE, SLIDES_CONTAINER];
// 			usedSelectors.forEach(function (item) {
// 				removeClass($('.' + item), item);
// 			});
// 		}

// 		/*
// 		* Sets the state for a variable with multiple states (original, and temporal)
// 		* Some variables such as `autoScrolling` or `recordHistory` might change automatically its state when using `responsive` or `autoScrolling:false`.
// 		* This function is used to keep track of both states, the original and the temporal one.
// 		* If type is not 'internal', then we assume the user is globally changing the variable.
// 		*/
// 		function setVariableState(variable, value, type) {
// 			options[variable] = value;
// 			if (type !== 'internal') {
// 				originals[variable] = value;
// 			}
// 		}

// 		/**
// 		* Displays warnings
// 		*/
// 		function displayWarnings() {
// 			if (!isOK) {
// 				showError('error', 'Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:');
// 				showError('error', 'https://github.com/alvarotrigo/fullPage.js#options.');
// 			}

// 			var extensions = ['fadingEffect', 'continuousHorizontal', 'scrollHorizontally', 'interlockedSlides', 'resetSliders', 'responsiveSlides', 'offsetSections', 'dragAndMove', 'scrollOverflowReset', 'parallax'];
// 			if (hasClass($('html'), ENABLED)) {
// 				showError('error', 'Fullpage.js can only be initialized once and you are doing it multiple times!');
// 				return;
// 			}

// 			// Disable mutually exclusive settings
// 			if (options.continuousVertical &&
// 				(options.loopTop || options.loopBottom)) {
// 				options.continuousVertical = false;
// 				showError('warn', 'Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
// 			}

// 			if (options.scrollOverflow &&
// 				(options.scrollBar || !options.autoScrolling)) {
// 				showError('warn', 'Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox');
// 			}

// 			if (options.continuousVertical && (options.scrollBar || !options.autoScrolling)) {
// 				options.continuousVertical = false;
// 				showError('warn', 'Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
// 			}

// 			if (options.scrollOverflow && options.scrollOverflowHandler == null) {
// 				options.scrollOverflow = false;
// 				showError('error', 'The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.');
// 			}

// 			//using extensions? Wrong file!
// 			extensions.forEach(function (extension) {
// 				//is the option set to true?
// 				if (options[extension]) {
// 					showError('warn', 'fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: ' + extension);
// 				}
// 			});

// 			//anchors can not have the same value as any element ID or NAME
// 			options.anchors.forEach(function (name) {

// 				//case insensitive selectors (http://stackoverflow.com/a/19465187/1081396)
// 				var nameAttr = [].slice.call($('[name]')).filter(function (item) {
// 					return item.getAttribute('name') && item.getAttribute('name').toLowerCase() == name.toLowerCase();
// 				});

// 				var idAttr = [].slice.call($('[id]')).filter(function (item) {
// 					return item.getAttribute('id') && item.getAttribute('id').toLowerCase() == name.toLowerCase();
// 				});

// 				if (idAttr.length || nameAttr.length) {
// 					showError('error', 'data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');
// 					if (idAttr.length) {
// 						showError('error', '"' + name + '" is is being used by another element `id` property');
// 					}
// 					if (nameAttr.length) {
// 						showError('error', '"' + name + '" is is being used by another element `name` property');
// 					}
// 				}
// 			});
// 		}

// 		/**
// 		* Getting the position of the element to scroll when using jQuery animations
// 		*/
// 		function getScrolledPosition(element) {
// 			var position;

// 			//is not the window element and is a slide?
// 			if (element.self != window && hasClass(element, SLIDES_WRAPPER)) {
// 				position = element.scrollLeft;
// 			}
// 			else if (!options.autoScrolling || options.scrollBar) {
// 				position = getScrollTop();
// 			}
// 			else {
// 				position = element.offsetTop;
// 			}

// 			//gets the top property of the wrapper
// 			return position;
// 		}

// 		/**
// 		* Simulates the animated scrollTop of jQuery. Used when css3:false or scrollBar:true or autoScrolling:false
// 		* http://stackoverflow.com/a/16136789/1081396
// 		*/
// 		function scrollTo(element, to, duration, callback) {
// 			var start = getScrolledPosition(element);
// 			var change = to - start;
// 			var currentTime = 0;
// 			var increment = 20;
// 			activeAnimation = true;

// 			var animateScroll = function () {
// 				if (activeAnimation) { //in order to stope it from other function whenever we want
// 					var val = to;

// 					currentTime += increment;

// 					if (duration) {
// 						val = window.fp_easings[options.easing](currentTime, start, change, duration);
// 					}

// 					setScrolling(element, val);

// 					if (currentTime < duration) {
// 						setTimeout(animateScroll, increment);
// 					} else if (typeof callback !== 'undefined') {
// 						callback();
// 					}
// 				} else if (currentTime < duration) {
// 					callback();
// 				}
// 			};

// 			animateScroll();
// 		}

// 		/**
// 		* Scrolls the page / slider the given number of pixels.
// 		* It will do it one or another way dependiong on the library's config.
// 		*/
// 		function setScrolling(element, val) {
// 			if (!options.autoScrolling || options.scrollBar || (element.self != window && hasClass(element, SLIDES_WRAPPER))) {

// 				//scrolling horizontally through the slides?
// 				if (element.self != window && hasClass(element, SLIDES_WRAPPER)) {
// 					element.scrollLeft = val;
// 				}
// 				//vertical scroll
// 				else {
// 					element.scrollTo(0, val);
// 				}
// 			} else {
// 				element.style.top = val + 'px';
// 			}
// 		}

// 		/**
// 		* Gets the active slide.
// 		*/
// 		function getActiveSlide() {
// 			var activeSlide = $(SLIDE_ACTIVE_SEL, $(SECTION_ACTIVE_SEL)[0])[0];
// 			return nullOrSlide(activeSlide);
// 		}

// 		/**
// 		* Gets the active section.
// 		*/
// 		function getActiveSection() {
// 			return new Section($(SECTION_ACTIVE_SEL)[0]);
// 		}

// 		/**
// 		* Item. Slide or Section objects share the same properties.
// 		*/
// 		function Item(el, selector) {
// 			this.anchor = el.getAttribute('data-anchor');
// 			this.item = el;
// 			this.index = index(el, selector);
// 			this.isLast = this.index === el.parentElement.querySelectorAll(selector).length - 1;
// 			this.isFirst = !this.index;
// 		}

// 		/**
// 		* Section object
// 		*/
// 		function Section(el) {
// 			Item.call(this, el, SECTION_SEL);
// 		}

// 		/**
// 		* Slide object
// 		*/
// 		function Slide(el) {
// 			Item.call(this, el, SLIDE_SEL);
// 		}

// 		return FP;
// 	} //end of $.fn.fullpage


// 	//utils
// 	/**
// 	* Shows a message in the console of the given type.
// 	*/
// 	function showError(type, text) {
// 		window.console && window.console[type] && window.console[type]('fullPage: ' + text);
// 	}

// 	/**
// 	* Equivalent or jQuery function $().
// 	*/
// 	function $(selector, context) {
// 		context = arguments.length > 1 ? context : document;
// 		return context ? context.querySelectorAll(selector) : null;
// 	}

// 	/**
// 	* Extends a given Object properties and its childs.
// 	*/
// 	function deepExtend(out) {
// 		out = out || {};
// 		for (var i = 1, len = arguments.length; i < len; ++i) {
// 			var obj = arguments[i];

// 			if (!obj) {
// 				continue;
// 			}

// 			for (var key in obj) {
// 				if (!obj.hasOwnProperty(key)) {
// 					continue;
// 				}

// 				// based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
// 				if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
// 					out[key] = deepExtend(out[key], obj[key]);
// 					continue;
// 				}

// 				out[key] = obj[key];
// 			}
// 		}
// 		return out;
// 	}

// 	/**
// 	* Checks if the passed element contains the passed class.
// 	*/
// 	function hasClass(el, className) {
// 		if (el == null) {
// 			return false;
// 		}
// 		if (el.classList) {
// 			return el.classList.contains(className);
// 		}
// 		return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
// 	}

// 	/**
// 	* Gets the window height. Crossbrowser.
// 	*/
// 	function getWindowHeight() {
// 		return 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
// 	}

// 	/**
// 	* Set's the CSS properties for the passed item/s.
// 	* @param {NodeList|HTMLElement} items
// 	* @param {Object} props css properties and values.
// 	*/
// 	function css(items, props) {
// 		items = getList(items);

// 		var key;
// 		for (key in props) {
// 			if (props.hasOwnProperty(key)) {
// 				if (key !== null) {
// 					for (var i = 0; i < items.length; i++) {
// 						var item = items[i];
// 						item.style[key] = props[key];
// 					}
// 				}
// 			}
// 		}

// 		return items;
// 	}

// 	/**
// 	* Generic function to get the previous or next element.
// 	*/
// 	function until(item, selector, fn) {
// 		var sibling = item[fn];
// 		while (sibling && !matches(sibling, selector)) {
// 			sibling = sibling[fn];
// 		}

// 		return sibling;
// 	}

// 	/**
// 	* Gets the previous element to the passed element that matches the passed selector.
// 	*/
// 	function prevUntil(item, selector) {
// 		return until(item, selector, 'previousElementSibling');
// 	}

// 	/**
// 	* Gets the next element to the passed element that matches the passed selector.
// 	*/
// 	function nextUntil(item, selector) {
// 		return until(item, selector, 'nextElementSibling');
// 	}

// 	/**
// 	* Gets the previous element to the passed element.
// 	*/
// 	function prev(item) {
// 		return item.previousElementSibling;
// 	}

// 	/**
// 	* Gets the next element to the passed element.
// 	*/
// 	function next(item) {
// 		return item.nextElementSibling;
// 	}

// 	/**
// 	* Gets the last element from the passed list of elements.
// 	*/
// 	function last(item) {
// 		return item[item.length - 1];
// 	}

// 	/**
// 	* Gets index from the passed element.
// 	* @param {String} selector is optional.
// 	*/
// 	function index(item, selector) {
// 		item = isArrayOrList(item) ? item[0] : item;
// 		var children = selector != null ? $(selector, item.parentNode) : item.parentNode.childNodes;
// 		var num = 0;
// 		for (var i = 0; i < children.length; i++) {
// 			if (children[i] == item) return num;
// 			if (children[i].nodeType == 1) num++;
// 		}
// 		return -1;
// 	}

// 	/**
// 	* Gets an iterable element for the passed element/s
// 	*/
// 	function getList(item) {
// 		return !isArrayOrList(item) ? [item] : item;
// 	}

// 	/**
// 	* Adds the display=none property for the passed element/s
// 	*/
// 	function hide(el) {
// 		el = getList(el);

// 		for (var i = 0; i < el.length; i++) {
// 			el[i].style.display = 'none';
// 		}
// 		return el;
// 	}

// 	/**
// 	* Adds the display=block property for the passed element/s
// 	*/
// 	function show(el) {
// 		el = getList(el);

// 		for (var i = 0; i < el.length; i++) {
// 			el[i].style.display = 'block';
// 		}
// 		return el;
// 	}

// 	/**
// 	* Checks if the passed element is an iterable element or not
// 	*/
// 	function isArrayOrList(el) {
// 		return Object.prototype.toString.call(el) === '[object Array]' ||
// 			Object.prototype.toString.call(el) === '[object NodeList]';
// 	}

// 	/**
// 	* Adds the passed class to the passed element/s
// 	*/
// 	function addClass(el, className) {
// 		el = getList(el);

// 		for (var i = 0; i < el.length; i++) {
// 			var item = el[i];
// 			if (item.classList) {
// 				item.classList.add(className);
// 			}
// 			else {
// 				item.className += ' ' + className;
// 			}
// 		}
// 		return el;
// 	}

// 	/**
// 	* Removes the passed class to the passed element/s
// 	* @param {String} `className` can be multiple classnames separated by whitespace
// 	*/
// 	function removeClass(el, className) {
// 		el = getList(el);

// 		var classNames = className.split(' ');

// 		for (var a = 0; a < classNames.length; a++) {
// 			className = classNames[a];
// 			for (var i = 0; i < el.length; i++) {
// 				var item = el[i];
// 				if (item.classList) {
// 					item.classList.remove(className);
// 				}
// 				else {
// 					item.className = item.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
// 				}
// 			}
// 		}
// 		return el;
// 	}

// 	/**
// 	* Appends the given element ot the given parent.
// 	*/
// 	function appendTo(el, parent) {
// 		parent.appendChild(el);
// 	}

// 	/**
// 	Usage:

// 	var wrapper = document.createElement('div');
// 	wrapper.className = 'fp-slides';
// 	wrap($('.slide'), wrapper);

// 	https://jsfiddle.net/qwzc7oy3/15/ (vanilla)
// 	https://jsfiddle.net/oya6ndka/1/ (jquery equivalent)
// 	*/
// 	function wrap(toWrap, wrapper, isWrapAll) {
// 		var newParent;
// 		wrapper = wrapper || document.createElement('div');
// 		for (var i = 0; i < toWrap.length; i++) {
// 			var item = toWrap[i];
// 			if (isWrapAll && !i || !isWrapAll) {
// 				newParent = wrapper.cloneNode(true);
// 				item.parentNode.insertBefore(newParent, item);
// 			}
// 			newParent.appendChild(item);
// 		}
// 		return toWrap;
// 	}

// 	/**
// 	Usage:
// 	var wrapper = document.createElement('div');
// 	wrapper.className = 'fp-slides';
// 	wrap($('.slide'), wrapper);

// 	https://jsfiddle.net/qwzc7oy3/27/ (vanilla)
// 	https://jsfiddle.net/oya6ndka/4/ (jquery equivalent)
// 	*/
// 	function wrapAll(toWrap, wrapper) {
// 		wrap(toWrap, wrapper, true);
// 	}

// 	/**
// 	* Usage:
// 	* wrapInner(document.querySelector('#pepe'), '<div class="test">afdas</div>');
// 	* wrapInner(document.querySelector('#pepe'), element);
// 	*
// 	* https://jsfiddle.net/zexxz0tw/6/
// 	*
// 	* https://stackoverflow.com/a/21817590/1081396
// 	*/
// 	function wrapInner(parent, wrapper) {
// 		if (typeof wrapper === "string") {
// 			wrapper = createElementFromHTML(wrapper);
// 		}

// 		parent.appendChild(wrapper);

// 		while (parent.firstChild !== wrapper) {
// 			wrapper.appendChild(parent.firstChild);
// 		}
// 	}

// 	/**
// 	* Usage:
// 	* unwrap(document.querySelector('#pepe'));
// 	* unwrap(element);
// 	*
// 	* https://jsfiddle.net/szjt0hxq/1/
// 	*
// 	*/
// 	function unwrap(wrapper) {
// 		var wrapperContent = document.createDocumentFragment();
// 		while (wrapper.firstChild) {
// 			wrapperContent.appendChild(wrapper.firstChild);
// 		}

// 		wrapper.parentNode.replaceChild(wrapperContent, wrapper);
// 	}

// 	/**
// 	* http://stackoverflow.com/questions/22100853/dom-pure-javascript-solution-to-jquery-closest-implementation
// 	* Returns the element or `false` if there's none
// 	*/
// 	function closest(el, selector) {
// 		if (el && el.nodeType === 1) {
// 			if (matches(el, selector)) {
// 				return el;
// 			}
// 			return closest(el.parentNode, selector);
// 		}
// 		return null;
// 	}

// 	/**
// 	* Places one element (rel) after another one or group of them (reference).
// 	* @param {HTMLElement} reference
// 	* @param {HTMLElement|NodeList|String} el
// 	* https://jsfiddle.net/9s97hhzv/1/
// 	*/
// 	function after(reference, el) {
// 		insertBefore(reference, reference.nextSibling, el);
// 	}

// 	/**
// 	* Places one element (rel) before another one or group of them (reference).
// 	* @param {HTMLElement} reference
// 	* @param {HTMLElement|NodeList|String} el
// 	* https://jsfiddle.net/9s97hhzv/1/
// 	*/
// 	function before(reference, el) {
// 		insertBefore(reference, reference, el);
// 	}

// 	/**
// 	* Based in https://stackoverflow.com/a/19316024/1081396
// 	* and https://stackoverflow.com/a/4793630/1081396
// 	*/
// 	function insertBefore(reference, beforeElement, el) {
// 		if (!isArrayOrList(el)) {
// 			if (typeof el == 'string') {
// 				el = createElementFromHTML(el);
// 			}
// 			el = [el];
// 		}

// 		for (var i = 0; i < el.length; i++) {
// 			reference.parentNode.insertBefore(el[i], beforeElement);
// 		}
// 	}

// 	//http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
// 	function getScrollTop() {
// 		var doc = document.documentElement;
// 		return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
// 	}

// 	/**
// 	* Gets the siblings of the passed element
// 	*/
// 	function siblings(el) {
// 		return Array.prototype.filter.call(el.parentNode.children, function (child) {
// 			return child !== el;
// 		});
// 	}

// 	//for IE 9 ?
// 	function preventDefault(event) {
// 		if (event.preventDefault) {
// 			event.preventDefault();
// 		}
// 		else {
// 			event.returnValue = false;
// 		}
// 	}

// 	/**
// 	* Determines whether the passed item is of function type.
// 	*/
// 	function isFunction(item) {
// 		if (typeof item === 'function') {
// 			return true;
// 		}
// 		var type = Object.prototype.toString(item);
// 		return type === '[object Function]' || type === '[object GeneratorFunction]';
// 	}

// 	/**
// 	* Trigger custom events
// 	*/
// 	function trigger(el, eventName, data) {
// 		var event;
// 		data = typeof data === 'undefined' ? {} : data;

// 		// Native
// 		if (typeof window.CustomEvent === "function") {
// 			event = new CustomEvent(eventName, { detail: data });
// 		}
// 		else {
// 			event = document.createEvent('CustomEvent');
// 			event.initCustomEvent(eventName, true, true, data);
// 		}

// 		el.dispatchEvent(event);
// 	}

// 	/**
// 	* Polyfill of .matches()
// 	*/
// 	function matches(el, selector) {
// 		return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
// 	}

// 	/**
// 	* Toggles the visibility of the passed element el.
// 	*/
// 	function toggle(el, value) {
// 		if (typeof value === "boolean") {
// 			for (var i = 0; i < el.length; i++) {
// 				el[i].style.display = value ? 'block' : 'none';
// 			}
// 		}
// 		//we don't use it in other way, so no else :)

// 		return el;
// 	}

// 	/**
// 	* Creates a HTMLElement from the passed HTML string.
// 	* https://stackoverflow.com/a/494348/1081396
// 	*/
// 	function createElementFromHTML(htmlString) {
// 		var div = document.createElement('div');
// 		div.innerHTML = htmlString.trim();

// 		// Change this to div.childNodes to support multiple top-level nodes
// 		return div.firstChild;
// 	}

// 	/**
// 	* Removes the passed item/s from the DOM.
// 	*/
// 	function remove(items) {
// 		items = getList(items);
// 		for (var i = 0; i < items.length; i++) {
// 			var item = items[i];
// 			if (item && item.parentElement) {
// 				item.parentNode.removeChild(item);
// 			}
// 		}
// 	}

// 	/**
// 	* Filters an array by the passed filter funtion.
// 	*/
// 	function filter(el, filterFn) {
// 		Array.prototype.filter.call(el, filterFn);
// 	}

// 	//https://jsfiddle.net/w1rktecz/
// 	function untilAll(item, selector, fn) {
// 		var sibling = item[fn];
// 		var siblings = [];
// 		while (sibling) {
// 			if (matches(sibling, selector) || selector == null) {
// 				siblings.push(sibling);
// 			}
// 			sibling = sibling[fn];
// 		}

// 		return siblings;
// 	}

// 	/**
// 	* Gets all next elements matching the passed selector.
// 	*/
// 	function nextAll(item, selector) {
// 		return untilAll(item, selector, 'nextElementSibling');
// 	}

// 	/**
// 	* Gets all previous elements matching the passed selector.
// 	*/
// 	function prevAll(item, selector) {
// 		return untilAll(item, selector, 'previousElementSibling');
// 	}

// 	/**
// 	* Converts an object to an array.
// 	*/
// 	function toArray(objectData) {
// 		return Object.keys(objectData).map(function (key) {
// 			return objectData[key];
// 		});
// 	}

// 	/**
// 	* forEach polyfill for IE
// 	* https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Browser_Compatibility
// 	*/
// 	if (window.NodeList && !NodeList.prototype.forEach) {
// 		NodeList.prototype.forEach = function (callback, thisArg) {
// 			thisArg = thisArg || window;
// 			for (var i = 0; i < this.length; i++) {
// 				callback.call(thisArg, this[i], i, this);
// 			}
// 		};
// 	}

// 	//utils are public, so we can use it wherever we want
// 	window.fp_utils = {
// 		$: $,
// 		deepExtend: deepExtend,
// 		hasClass: hasClass,
// 		getWindowHeight: getWindowHeight,
// 		css: css,
// 		until: until,
// 		prevUntil: prevUntil,
// 		nextUntil: nextUntil,
// 		prev: prev,
// 		next: next,
// 		last: last,
// 		index: index,
// 		getList: getList,
// 		hide: hide,
// 		show: show,
// 		isArrayOrList: isArrayOrList,
// 		addClass: addClass,
// 		removeClass: removeClass,
// 		appendTo: appendTo,
// 		wrap: wrap,
// 		wrapAll: wrapAll,
// 		wrapInner: wrapInner,
// 		unwrap: unwrap,
// 		closest: closest,
// 		after: after,
// 		before: before,
// 		insertBefore: insertBefore,
// 		getScrollTop: getScrollTop,
// 		siblings: siblings,
// 		preventDefault: preventDefault,
// 		isFunction: isFunction,
// 		trigger: trigger,
// 		matches: matches,
// 		toggle: toggle,
// 		createElementFromHTML: createElementFromHTML,
// 		remove: remove,
// 		filter: filter,
// 		untilAll: untilAll,
// 		nextAll: nextAll,
// 		prevAll: prevAll,
// 		showError: showError
// 	};

// 	return initialise;
// }));

// /**
//  * jQuery adapter for fullPage.js 3.0.0
//  */
// if (window.jQuery && window.fullpage) {
// 	(function ($, fullpage) {
// 		'use strict';

// 		// No jQuery No Go
// 		if (!$ || !fullpage) {
// 			window.fp_utils.showError('error', 'jQuery is required to use the jQuery fullpage adapter!');
// 			return;
// 		}

// 		$.fn.fullpage = function (options) {
// 			var FP = new fullpage(this[0], options);

// 			//Static API
// 			Object.keys(FP).forEach(function (key) {
// 				$.fn.fullpage[key] = FP[key];
// 			});
// 		};
// 	})(window.jQuery, window.fullpage);
// }
/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
	var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

	if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
		window.addEventListener('hashchange', function () {
			var id = location.hash.substring(1),
			    element;

			if (!/^[A-z0-9_-]+$/.test(id)) {
				return;
			}

			element = document.getElementById(id);

			if (element) {
				if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false);
	}
})();
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function (window, document, exportName, undefined) {
    'use strict';

    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
    var TEST_ELEMENT = document.createElement('div');

    var TYPE_FUNCTION = 'function';

    var round = Math.round;
    var abs = Math.abs;
    var now = Date.now;

    /**
     * set a timeout with a given scope
     * @param {Function} fn
     * @param {Number} timeout
     * @param {Object} context
     * @returns {number}
     */
    function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout);
    }

    /**
     * if the argument is an array, we want to execute the fn on each entry
     * if it aint an array we don't want to do a thing.
     * this is used by all the methods that accept a single and array argument.
     * @param {*|Array} arg
     * @param {String} fn
     * @param {Object} [context]
     * @returns {Boolean}
     */
    function invokeArrayArg(arg, fn, context) {
        if (Array.isArray(arg)) {
            each(arg, context[fn], context);
            return true;
        }
        return false;
    }

    /**
     * walk objects and arrays
     * @param {Object} obj
     * @param {Function} iterator
     * @param {Object} context
     */
    function each(obj, iterator, context) {
        var i;

        if (!obj) {
            return;
        }

        if (obj.forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length !== undefined) {
            i = 0;
            while (i < obj.length) {
                iterator.call(context, obj[i], i, obj);
                i++;
            }
        } else {
            for (i in obj) {
                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
            }
        }
    }

    /**
     * wrap a method with a deprecation warning and stack trace
     * @param {Function} method
     * @param {String} name
     * @param {String} message
     * @returns {Function} A new function wrapping the supplied method.
     */
    function deprecate(method, name, message) {
        var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
        return function () {
            var e = new Error('get-stack-trace');
            var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

            var log = window.console && (window.console.warn || window.console.log);
            if (log) {
                log.call(window.console, deprecationMessage, stack);
            }
            return method.apply(this, arguments);
        };
    }

    /**
     * extend object.
     * means that properties in dest will be overwritten by the ones in src.
     * @param {Object} target
     * @param {...Object} objects_to_assign
     * @returns {Object} target
     */
    var assign;
    if (typeof Object.assign !== 'function') {
        assign = function assign(target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    } else {
        assign = Object.assign;
    }

    /**
     * extend object.
     * means that properties in dest will be overwritten by the ones in src.
     * @param {Object} dest
     * @param {Object} src
     * @param {Boolean} [merge=false]
     * @returns {Object} dest
     */
    var extend = deprecate(function extend(dest, src, merge) {
        var keys = Object.keys(src);
        var i = 0;
        while (i < keys.length) {
            if (!merge || merge && dest[keys[i]] === undefined) {
                dest[keys[i]] = src[keys[i]];
            }
            i++;
        }
        return dest;
    }, 'extend', 'Use `assign`.');

    /**
     * merge the values from src in the dest.
     * means that properties that exist in dest will not be overwritten by src
     * @param {Object} dest
     * @param {Object} src
     * @returns {Object} dest
     */
    var merge = deprecate(function merge(dest, src) {
        return extend(dest, src, true);
    }, 'merge', 'Use `assign`.');

    /**
     * simple class inheritance
     * @param {Function} child
     * @param {Function} base
     * @param {Object} [properties]
     */
    function inherit(child, base, properties) {
        var baseP = base.prototype,
            childP;

        childP = child.prototype = Object.create(baseP);
        childP.constructor = child;
        childP._super = baseP;

        if (properties) {
            assign(childP, properties);
        }
    }

    /**
     * simple function bind
     * @param {Function} fn
     * @param {Object} context
     * @returns {Function}
     */
    function bindFn(fn, context) {
        return function boundFn() {
            return fn.apply(context, arguments);
        };
    }

    /**
     * let a boolean value also be a function that must return a boolean
     * this first item in args will be used as the context
     * @param {Boolean|Function} val
     * @param {Array} [args]
     * @returns {Boolean}
     */
    function boolOrFn(val, args) {
        if (typeof val == TYPE_FUNCTION) {
            return val.apply(args ? args[0] || undefined : undefined, args);
        }
        return val;
    }

    /**
     * use the val2 when val1 is undefined
     * @param {*} val1
     * @param {*} val2
     * @returns {*}
     */
    function ifUndefined(val1, val2) {
        return val1 === undefined ? val2 : val1;
    }

    /**
     * addEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function addEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.addEventListener(type, handler, false);
        });
    }

    /**
     * removeEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function removeEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.removeEventListener(type, handler, false);
        });
    }

    /**
     * find if a node is in the given parent
     * @method hasParent
     * @param {HTMLElement} node
     * @param {HTMLElement} parent
     * @return {Boolean} found
     */
    function hasParent(node, parent) {
        while (node) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    /**
     * small indexOf wrapper
     * @param {String} str
     * @param {String} find
     * @returns {Boolean} found
     */
    function inStr(str, find) {
        return str.indexOf(find) > -1;
    }

    /**
     * split string on whitespace
     * @param {String} str
     * @returns {Array} words
     */
    function splitStr(str) {
        return str.trim().split(/\s+/g);
    }

    /**
     * find if a array contains the object using indexOf or a simple polyFill
     * @param {Array} src
     * @param {String} find
     * @param {String} [findByKey]
     * @return {Boolean|Number} false when not found, or the index
     */
    function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey) {
            return src.indexOf(find);
        } else {
            var i = 0;
            while (i < src.length) {
                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
                    return i;
                }
                i++;
            }
            return -1;
        }
    }

    /**
     * convert array-like objects to real arrays
     * @param {Object} obj
     * @returns {Array}
     */
    function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
    }

    /**
     * unique array with objects based on a key (like 'id') or just by the array's value
     * @param {Array} src [{id:1},{id:2},{id:1}]
     * @param {String} [key]
     * @param {Boolean} [sort=False]
     * @returns {Array} [{id:1},{id:2}]
     */
    function uniqueArray(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;

        while (i < src.length) {
            var val = key ? src[i][key] : src[i];
            if (inArray(values, val) < 0) {
                results.push(src[i]);
            }
            values[i] = val;
            i++;
        }

        if (sort) {
            if (!key) {
                results = results.sort();
            } else {
                results = results.sort(function sortUniqueArray(a, b) {
                    return a[key] > b[key];
                });
            }
        }

        return results;
    }

    /**
     * get the prefixed property
     * @param {Object} obj
     * @param {String} property
     * @returns {String|Undefined} prefixed
     */
    function prefixed(obj, property) {
        var prefix, prop;
        var camelProp = property[0].toUpperCase() + property.slice(1);

        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
            prefix = VENDOR_PREFIXES[i];
            prop = prefix ? prefix + camelProp : property;

            if (prop in obj) {
                return prop;
            }
            i++;
        }
        return undefined;
    }

    /**
     * get a unique id
     * @returns {number} uniqueId
     */
    var _uniqueId = 1;
    function uniqueId() {
        return _uniqueId++;
    }

    /**
     * get the window object of an element
     * @param {HTMLElement} element
     * @returns {DocumentView|Window}
     */
    function getWindowForElement(element) {
        var doc = element.ownerDocument || element;
        return doc.defaultView || doc.parentWindow || window;
    }

    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

    var SUPPORT_TOUCH = 'ontouchstart' in window;
    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

    var INPUT_TYPE_TOUCH = 'touch';
    var INPUT_TYPE_PEN = 'pen';
    var INPUT_TYPE_MOUSE = 'mouse';
    var INPUT_TYPE_KINECT = 'kinect';

    var COMPUTE_INTERVAL = 25;

    var INPUT_START = 1;
    var INPUT_MOVE = 2;
    var INPUT_END = 4;
    var INPUT_CANCEL = 8;

    var DIRECTION_NONE = 1;
    var DIRECTION_LEFT = 2;
    var DIRECTION_RIGHT = 4;
    var DIRECTION_UP = 8;
    var DIRECTION_DOWN = 16;

    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

    var PROPS_XY = ['x', 'y'];
    var PROPS_CLIENT_XY = ['clientX', 'clientY'];

    /**
     * create new input type manager
     * @param {Manager} manager
     * @param {Function} callback
     * @returns {Input}
     * @constructor
     */
    function Input(manager, callback) {
        var self = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget;

        // smaller wrapper around the handler, for the scope and the enabled state of the manager,
        // so when disabled the input events are completely bypassed.
        this.domHandler = function (ev) {
            if (boolOrFn(manager.options.enable, [manager])) {
                self.handler(ev);
            }
        };

        this.init();
    }

    Input.prototype = {
        /**
         * should handle the inputEvent data and trigger the callback
         * @virtual
         */
        handler: function () {},

        /**
         * bind the events
         */
        init: function () {
            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },

        /**
         * unbind the events
         */
        destroy: function () {
            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        }
    };

    /**
     * create new input type manager
     * called by the Manager constructor
     * @param {Hammer} manager
     * @returns {Input}
     */
    function createInputInstance(manager) {
        var Type;
        var inputClass = manager.options.inputClass;

        if (inputClass) {
            Type = inputClass;
        } else if (SUPPORT_POINTER_EVENTS) {
            Type = PointerEventInput;
        } else if (SUPPORT_ONLY_TOUCH) {
            Type = TouchInput;
        } else if (!SUPPORT_TOUCH) {
            Type = MouseInput;
        } else {
            Type = TouchMouseInput;
        }
        return new Type(manager, inputHandler);
    }

    /**
     * handle input events
     * @param {Manager} manager
     * @param {String} eventType
     * @param {Object} input
     */
    function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length;
        var changedPointersLen = input.changedPointers.length;
        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

        input.isFirst = !!isFirst;
        input.isFinal = !!isFinal;

        if (isFirst) {
            manager.session = {};
        }

        // source event is the normalized value of the domEvents
        // like 'touchstart, mouseup, pointerdown'
        input.eventType = eventType;

        // compute scale, rotation etc
        computeInputData(manager, input);

        // emit secret event
        manager.emit('hammer.input', input);

        manager.recognize(input);
        manager.session.prevInput = input;
    }

    /**
     * extend the data with some usable properties like scale, rotate, velocity etc
     * @param {Object} manager
     * @param {Object} input
     */
    function computeInputData(manager, input) {
        var session = manager.session;
        var pointers = input.pointers;
        var pointersLength = pointers.length;

        // store the first input to calculate the distance and direction
        if (!session.firstInput) {
            session.firstInput = simpleCloneInputData(input);
        }

        // to compute scale and rotation we need to store the multiple touches
        if (pointersLength > 1 && !session.firstMultiple) {
            session.firstMultiple = simpleCloneInputData(input);
        } else if (pointersLength === 1) {
            session.firstMultiple = false;
        }

        var firstInput = session.firstInput;
        var firstMultiple = session.firstMultiple;
        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

        var center = input.center = getCenter(pointers);
        input.timeStamp = now();
        input.deltaTime = input.timeStamp - firstInput.timeStamp;

        input.angle = getAngle(offsetCenter, center);
        input.distance = getDistance(offsetCenter, center);

        computeDeltaXY(session, input);
        input.offsetDirection = getDirection(input.deltaX, input.deltaY);

        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
        input.overallVelocityX = overallVelocity.x;
        input.overallVelocityY = overallVelocity.y;
        input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;

        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

        input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;

        computeIntervalInputData(session, input);

        // find the correct target
        var target = manager.element;
        if (hasParent(input.srcEvent.target, target)) {
            target = input.srcEvent.target;
        }
        input.target = target;
    }

    function computeDeltaXY(session, input) {
        var center = input.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevInput = session.prevInput || {};

        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
            prevDelta = session.prevDelta = {
                x: prevInput.deltaX || 0,
                y: prevInput.deltaY || 0
            };

            offset = session.offsetDelta = {
                x: center.x,
                y: center.y
            };
        }

        input.deltaX = prevDelta.x + (center.x - offset.x);
        input.deltaY = prevDelta.y + (center.y - offset.y);
    }

    /**
     * velocity is calculated every x ms
     * @param {Object} session
     * @param {Object} input
     */
    function computeIntervalInputData(session, input) {
        var last = session.lastInterval || input,
            deltaTime = input.timeStamp - last.timeStamp,
            velocity,
            velocityX,
            velocityY,
            direction;

        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
            var deltaX = input.deltaX - last.deltaX;
            var deltaY = input.deltaY - last.deltaY;

            var v = getVelocity(deltaTime, deltaX, deltaY);
            velocityX = v.x;
            velocityY = v.y;
            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
            direction = getDirection(deltaX, deltaY);

            session.lastInterval = input;
        } else {
            // use latest velocity info if it doesn't overtake a minimum period
            velocity = last.velocity;
            velocityX = last.velocityX;
            velocityY = last.velocityY;
            direction = last.direction;
        }

        input.velocity = velocity;
        input.velocityX = velocityX;
        input.velocityY = velocityY;
        input.direction = direction;
    }

    /**
     * create a simple clone from the input used for storage of firstInput and firstMultiple
     * @param {Object} input
     * @returns {Object} clonedInputData
     */
    function simpleCloneInputData(input) {
        // make a simple copy of the pointers because we will get a reference if we don't
        // we only need clientXY for the calculations
        var pointers = [];
        var i = 0;
        while (i < input.pointers.length) {
            pointers[i] = {
                clientX: round(input.pointers[i].clientX),
                clientY: round(input.pointers[i].clientY)
            };
            i++;
        }

        return {
            timeStamp: now(),
            pointers: pointers,
            center: getCenter(pointers),
            deltaX: input.deltaX,
            deltaY: input.deltaY
        };
    }

    /**
     * get the center of all the pointers
     * @param {Array} pointers
     * @return {Object} center contains `x` and `y` properties
     */
    function getCenter(pointers) {
        var pointersLength = pointers.length;

        // no need to loop when only one touch
        if (pointersLength === 1) {
            return {
                x: round(pointers[0].clientX),
                y: round(pointers[0].clientY)
            };
        }

        var x = 0,
            y = 0,
            i = 0;
        while (i < pointersLength) {
            x += pointers[i].clientX;
            y += pointers[i].clientY;
            i++;
        }

        return {
            x: round(x / pointersLength),
            y: round(y / pointersLength)
        };
    }

    /**
     * calculate the velocity between two points. unit is in px per ms.
     * @param {Number} deltaTime
     * @param {Number} x
     * @param {Number} y
     * @return {Object} velocity `x` and `y`
     */
    function getVelocity(deltaTime, x, y) {
        return {
            x: x / deltaTime || 0,
            y: y / deltaTime || 0
        };
    }

    /**
     * get the direction between two points
     * @param {Number} x
     * @param {Number} y
     * @return {Number} direction
     */
    function getDirection(x, y) {
        if (x === y) {
            return DIRECTION_NONE;
        }

        if (abs(x) >= abs(y)) {
            return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }

    /**
     * calculate the absolute distance between two points
     * @param {Object} p1 {x, y}
     * @param {Object} p2 {x, y}
     * @param {Array} [props] containing x and y keys
     * @return {Number} distance
     */
    function getDistance(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];

        return Math.sqrt(x * x + y * y);
    }

    /**
     * calculate the angle between two coordinates
     * @param {Object} p1
     * @param {Object} p2
     * @param {Array} [props] containing x and y keys
     * @return {Number} angle
     */
    function getAngle(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    /**
     * calculate the rotation degrees between two pointersets
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} rotation
     */
    function getRotation(start, end) {
        return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
    }

    /**
     * calculate the scale factor between two pointersets
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} scale
     */
    function getScale(start, end) {
        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
    }

    var MOUSE_INPUT_MAP = {
        mousedown: INPUT_START,
        mousemove: INPUT_MOVE,
        mouseup: INPUT_END
    };

    var MOUSE_ELEMENT_EVENTS = 'mousedown';
    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

    /**
     * Mouse events input
     * @constructor
     * @extends Input
     */
    function MouseInput() {
        this.evEl = MOUSE_ELEMENT_EVENTS;
        this.evWin = MOUSE_WINDOW_EVENTS;

        this.pressed = false; // mousedown state

        Input.apply(this, arguments);
    }

    inherit(MouseInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function MEhandler(ev) {
            var eventType = MOUSE_INPUT_MAP[ev.type];

            // on start we want to have the left mouse button down
            if (eventType & INPUT_START && ev.button === 0) {
                this.pressed = true;
            }

            if (eventType & INPUT_MOVE && ev.which !== 1) {
                eventType = INPUT_END;
            }

            // mouse must be down
            if (!this.pressed) {
                return;
            }

            if (eventType & INPUT_END) {
                this.pressed = false;
            }

            this.callback(this.manager, eventType, {
                pointers: [ev],
                changedPointers: [ev],
                pointerType: INPUT_TYPE_MOUSE,
                srcEvent: ev
            });
        }
    });

    var POINTER_INPUT_MAP = {
        pointerdown: INPUT_START,
        pointermove: INPUT_MOVE,
        pointerup: INPUT_END,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL
    };

    // in IE10 the pointer types is defined as an enum
    var IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
    };

    var POINTER_ELEMENT_EVENTS = 'pointerdown';
    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

    // IE10 has prefixed support, and case-sensitive
    if (window.MSPointerEvent && !window.PointerEvent) {
        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
    }

    /**
     * Pointer events input
     * @constructor
     * @extends Input
     */
    function PointerEventInput() {
        this.evEl = POINTER_ELEMENT_EVENTS;
        this.evWin = POINTER_WINDOW_EVENTS;

        Input.apply(this, arguments);

        this.store = this.manager.session.pointerEvents = [];
    }

    inherit(PointerEventInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function PEhandler(ev) {
            var store = this.store;
            var removePointer = false;

            var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

            var isTouch = pointerType == INPUT_TYPE_TOUCH;

            // get index of the event in the store
            var storeIndex = inArray(store, ev.pointerId, 'pointerId');

            // start and mouse must be down
            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                if (storeIndex < 0) {
                    store.push(ev);
                    storeIndex = store.length - 1;
                }
            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                removePointer = true;
            }

            // it not found, so the pointer hasn't been down (so it's probably a hover)
            if (storeIndex < 0) {
                return;
            }

            // update the event in the store
            store[storeIndex] = ev;

            this.callback(this.manager, eventType, {
                pointers: store,
                changedPointers: [ev],
                pointerType: pointerType,
                srcEvent: ev
            });

            if (removePointer) {
                // remove from the store
                store.splice(storeIndex, 1);
            }
        }
    });

    var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Touch events input
     * @constructor
     * @extends Input
     */
    function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        this.started = false;

        Input.apply(this, arguments);
    }

    inherit(SingleTouchInput, Input, {
        handler: function TEhandler(ev) {
            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

            // should we handle the touch events?
            if (type === INPUT_START) {
                this.started = true;
            }

            if (!this.started) {
                return;
            }

            var touches = normalizeSingleTouches.call(this, ev, type);

            // when done, reset the started state
            if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
                this.started = false;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches);
        var changed = toArray(ev.changedTouches);

        if (type & (INPUT_END | INPUT_CANCEL)) {
            all = uniqueArray(all.concat(changed), 'identifier', true);
        }

        return [all, changed];
    }

    var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Multi-user touch events input
     * @constructor
     * @extends Input
     */
    function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS;
        this.targetIds = {};

        Input.apply(this, arguments);
    }

    inherit(TouchInput, Input, {
        handler: function MTEhandler(ev) {
            var type = TOUCH_INPUT_MAP[ev.type];
            var touches = getTouches.call(this, ev, type);
            if (!touches) {
                return;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function getTouches(ev, type) {
        var allTouches = toArray(ev.touches);
        var targetIds = this.targetIds;

        // when there is only one touch, the process can be simplified
        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
            targetIds[allTouches[0].identifier] = true;
            return [allTouches, allTouches];
        }

        var i,
            targetTouches,
            changedTouches = toArray(ev.changedTouches),
            changedTargetTouches = [],
            target = this.target;

        // get target touches from touches
        targetTouches = allTouches.filter(function (touch) {
            return hasParent(touch.target, target);
        });

        // collect touches
        if (type === INPUT_START) {
            i = 0;
            while (i < targetTouches.length) {
                targetIds[targetTouches[i].identifier] = true;
                i++;
            }
        }

        // filter changed touches to only contain touches that exist in the collected target ids
        i = 0;
        while (i < changedTouches.length) {
            if (targetIds[changedTouches[i].identifier]) {
                changedTargetTouches.push(changedTouches[i]);
            }

            // cleanup removed touches
            if (type & (INPUT_END | INPUT_CANCEL)) {
                delete targetIds[changedTouches[i].identifier];
            }
            i++;
        }

        if (!changedTargetTouches.length) {
            return;
        }

        return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
    }

    /**
     * Combined touch and mouse input
     *
     * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
     * This because touch devices also emit mouse events while doing a touch.
     *
     * @constructor
     * @extends Input
     */

    var DEDUP_TIMEOUT = 2500;
    var DEDUP_DISTANCE = 25;

    function TouchMouseInput() {
        Input.apply(this, arguments);

        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler);
        this.mouse = new MouseInput(this.manager, handler);

        this.primaryTouch = null;
        this.lastTouches = [];
    }

    inherit(TouchMouseInput, Input, {
        /**
         * handle mouse and touch events
         * @param {Hammer} manager
         * @param {String} inputEvent
         * @param {Object} inputData
         */
        handler: function TMEhandler(manager, inputEvent, inputData) {
            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
                isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

            if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
                return;
            }

            // when we're in a touch event, record touches to  de-dupe synthetic mouse event
            if (isTouch) {
                recordTouches.call(this, inputEvent, inputData);
            } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
                return;
            }

            this.callback(manager, inputEvent, inputData);
        },

        /**
         * remove the event listeners
         */
        destroy: function destroy() {
            this.touch.destroy();
            this.mouse.destroy();
        }
    });

    function recordTouches(eventType, eventData) {
        if (eventType & INPUT_START) {
            this.primaryTouch = eventData.changedPointers[0].identifier;
            setLastTouch.call(this, eventData);
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            setLastTouch.call(this, eventData);
        }
    }

    function setLastTouch(eventData) {
        var touch = eventData.changedPointers[0];

        if (touch.identifier === this.primaryTouch) {
            var lastTouch = { x: touch.clientX, y: touch.clientY };
            this.lastTouches.push(lastTouch);
            var lts = this.lastTouches;
            var removeLastTouch = function () {
                var i = lts.indexOf(lastTouch);
                if (i > -1) {
                    lts.splice(i, 1);
                }
            };
            setTimeout(removeLastTouch, DEDUP_TIMEOUT);
        }
    }

    function isSyntheticEvent(eventData) {
        var x = eventData.srcEvent.clientX,
            y = eventData.srcEvent.clientY;
        for (var i = 0; i < this.lastTouches.length; i++) {
            var t = this.lastTouches[i];
            var dx = Math.abs(x - t.x),
                dy = Math.abs(y - t.y);
            if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
                return true;
            }
        }
        return false;
    }

    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

    // magical touchAction value
    var TOUCH_ACTION_COMPUTE = 'compute';
    var TOUCH_ACTION_AUTO = 'auto';
    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
    var TOUCH_ACTION_NONE = 'none';
    var TOUCH_ACTION_PAN_X = 'pan-x';
    var TOUCH_ACTION_PAN_Y = 'pan-y';
    var TOUCH_ACTION_MAP = getTouchActionProps();

    /**
     * Touch Action
     * sets the touchAction property or uses the js alternative
     * @param {Manager} manager
     * @param {String} value
     * @constructor
     */
    function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
    }

    TouchAction.prototype = {
        /**
         * set the touchAction value on the element or enable the polyfill
         * @param {String} value
         */
        set: function (value) {
            // find out the touch-action by the event handlers
            if (value == TOUCH_ACTION_COMPUTE) {
                value = this.compute();
            }

            if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
                this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
            }
            this.actions = value.toLowerCase().trim();
        },

        /**
         * just re-set the touchAction value
         */
        update: function () {
            this.set(this.manager.options.touchAction);
        },

        /**
         * compute the value for the touchAction property based on the recognizer's settings
         * @returns {String} value
         */
        compute: function () {
            var actions = [];
            each(this.manager.recognizers, function (recognizer) {
                if (boolOrFn(recognizer.options.enable, [recognizer])) {
                    actions = actions.concat(recognizer.getTouchAction());
                }
            });
            return cleanTouchActions(actions.join(' '));
        },

        /**
         * this method is called on each input cycle and provides the preventing of the browser behavior
         * @param {Object} input
         */
        preventDefaults: function (input) {
            var srcEvent = input.srcEvent;
            var direction = input.offsetDirection;

            // if the touch action did prevented once this session
            if (this.manager.session.prevented) {
                srcEvent.preventDefault();
                return;
            }

            var actions = this.actions;
            var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

            if (hasNone) {
                //do not prevent defaults if this is a tap gesture

                var isTapPointer = input.pointers.length === 1;
                var isTapMovement = input.distance < 2;
                var isTapTouchTime = input.deltaTime < 250;

                if (isTapPointer && isTapMovement && isTapTouchTime) {
                    return;
                }
            }

            if (hasPanX && hasPanY) {
                // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
                return;
            }

            if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
                return this.preventSrc(srcEvent);
            }
        },

        /**
         * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
         * @param {Object} srcEvent
         */
        preventSrc: function (srcEvent) {
            this.manager.session.prevented = true;
            srcEvent.preventDefault();
        }
    };

    /**
     * when the touchActions are collected they are not a valid value, so we need to clean things up. *
     * @param {String} actions
     * @returns {*}
     */
    function cleanTouchActions(actions) {
        // none
        if (inStr(actions, TOUCH_ACTION_NONE)) {
            return TOUCH_ACTION_NONE;
        }

        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

        // if both pan-x and pan-y are set (different recognizers
        // for different directions, e.g. horizontal pan but vertical swipe?)
        // we need none (as otherwise with pan-x pan-y combined none of these
        // recognizers will work, since the browser would handle all panning
        if (hasPanX && hasPanY) {
            return TOUCH_ACTION_NONE;
        }

        // pan-x OR pan-y
        if (hasPanX || hasPanY) {
            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
        }

        // manipulation
        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
            return TOUCH_ACTION_MANIPULATION;
        }

        return TOUCH_ACTION_AUTO;
    }

    function getTouchActionProps() {
        if (!NATIVE_TOUCH_ACTION) {
            return false;
        }
        var touchMap = {};
        var cssSupports = window.CSS && window.CSS.supports;
        ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {

            // If css.supports is not supported but there is native touch-action assume it supports
            // all values. This is the case for IE 10 and 11.
            touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
        });
        return touchMap;
    }

    /**
     * Recognizer flow explained; *
     * All recognizers have the initial state of POSSIBLE when a input session starts.
     * The definition of a input session is from the first input until the last input, with all it's movement in it. *
     * Example session for mouse-input: mousedown -> mousemove -> mouseup
     *
     * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
     * which determines with state it should be.
     *
     * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
     * POSSIBLE to give it another change on the next cycle.
     *
     *               Possible
     *                  |
     *            +-----+---------------+
     *            |                     |
     *      +-----+-----+               |
     *      |           |               |
     *   Failed      Cancelled          |
     *                          +-------+------+
     *                          |              |
     *                      Recognized       Began
     *                                         |
     *                                      Changed
     *                                         |
     *                                  Ended/Recognized
     */
    var STATE_POSSIBLE = 1;
    var STATE_BEGAN = 2;
    var STATE_CHANGED = 4;
    var STATE_ENDED = 8;
    var STATE_RECOGNIZED = STATE_ENDED;
    var STATE_CANCELLED = 16;
    var STATE_FAILED = 32;

    /**
     * Recognizer
     * Every recognizer needs to extend from this class.
     * @constructor
     * @param {Object} options
     */
    function Recognizer(options) {
        this.options = assign({}, this.defaults, options || {});

        this.id = uniqueId();

        this.manager = null;

        // default is enable true
        this.options.enable = ifUndefined(this.options.enable, true);

        this.state = STATE_POSSIBLE;

        this.simultaneous = {};
        this.requireFail = [];
    }

    Recognizer.prototype = {
        /**
         * @virtual
         * @type {Object}
         */
        defaults: {},

        /**
         * set options
         * @param {Object} options
         * @return {Recognizer}
         */
        set: function (options) {
            assign(this.options, options);

            // also update the touchAction, in case something changed about the directions/enabled state
            this.manager && this.manager.touchAction.update();
            return this;
        },

        /**
         * recognize simultaneous with an other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        recognizeWith: function (otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
                return this;
            }

            var simultaneous = this.simultaneous;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (!simultaneous[otherRecognizer.id]) {
                simultaneous[otherRecognizer.id] = otherRecognizer;
                otherRecognizer.recognizeWith(this);
            }
            return this;
        },

        /**
         * drop the simultaneous link. it doesnt remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRecognizeWith: function (otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            delete this.simultaneous[otherRecognizer.id];
            return this;
        },

        /**
         * recognizer can only run when an other is failing
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        requireFailure: function (otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
                return this;
            }

            var requireFail = this.requireFail;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (inArray(requireFail, otherRecognizer) === -1) {
                requireFail.push(otherRecognizer);
                otherRecognizer.requireFailure(this);
            }
            return this;
        },

        /**
         * drop the requireFailure link. it does not remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRequireFailure: function (otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            var index = inArray(this.requireFail, otherRecognizer);
            if (index > -1) {
                this.requireFail.splice(index, 1);
            }
            return this;
        },

        /**
         * has require failures boolean
         * @returns {boolean}
         */
        hasRequireFailures: function () {
            return this.requireFail.length > 0;
        },

        /**
         * if the recognizer can recognize simultaneous with an other recognizer
         * @param {Recognizer} otherRecognizer
         * @returns {Boolean}
         */
        canRecognizeWith: function (otherRecognizer) {
            return !!this.simultaneous[otherRecognizer.id];
        },

        /**
         * You should use `tryEmit` instead of `emit` directly to check
         * that all the needed recognizers has failed before emitting.
         * @param {Object} input
         */
        emit: function (input) {
            var self = this;
            var state = this.state;

            function emit(event) {
                self.manager.emit(event, input);
            }

            // 'panstart' and 'panmove'
            if (state < STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }

            emit(self.options.event); // simple 'eventName' events

            if (input.additionalEvent) {
                // additional event(panleft, panright, pinchin, pinchout...)
                emit(input.additionalEvent);
            }

            // panend and pancancel
            if (state >= STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }
        },

        /**
         * Check that all the require failure recognizers has failed,
         * if true, it emits a gesture event,
         * otherwise, setup the state to FAILED.
         * @param {Object} input
         */
        tryEmit: function (input) {
            if (this.canEmit()) {
                return this.emit(input);
            }
            // it's failing anyway
            this.state = STATE_FAILED;
        },

        /**
         * can we emit?
         * @returns {boolean}
         */
        canEmit: function () {
            var i = 0;
            while (i < this.requireFail.length) {
                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                    return false;
                }
                i++;
            }
            return true;
        },

        /**
         * update the recognizer
         * @param {Object} inputData
         */
        recognize: function (inputData) {
            // make a new copy of the inputData
            // so we can change the inputData without messing up the other recognizers
            var inputDataClone = assign({}, inputData);

            // is is enabled and allow recognizing?
            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
                this.reset();
                this.state = STATE_FAILED;
                return;
            }

            // reset when we've reached the end
            if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
                this.state = STATE_POSSIBLE;
            }

            this.state = this.process(inputDataClone);

            // the recognizer has recognized a gesture
            // so trigger an event
            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
                this.tryEmit(inputDataClone);
            }
        },

        /**
         * return the state of the recognizer
         * the actual recognizing happens in this method
         * @virtual
         * @param {Object} inputData
         * @returns {Const} STATE
         */
        process: function (inputData) {}, // jshint ignore:line

        /**
         * return the preferred touch-action
         * @virtual
         * @returns {Array}
         */
        getTouchAction: function () {},

        /**
         * called when the gesture isn't allowed to recognize
         * like when another is being recognized or it is disabled
         * @virtual
         */
        reset: function () {}
    };

    /**
     * get a usable string, used as event postfix
     * @param {Const} state
     * @returns {String} state
     */
    function stateStr(state) {
        if (state & STATE_CANCELLED) {
            return 'cancel';
        } else if (state & STATE_ENDED) {
            return 'end';
        } else if (state & STATE_CHANGED) {
            return 'move';
        } else if (state & STATE_BEGAN) {
            return 'start';
        }
        return '';
    }

    /**
     * direction cons to string
     * @param {Const} direction
     * @returns {String}
     */
    function directionStr(direction) {
        if (direction == DIRECTION_DOWN) {
            return 'down';
        } else if (direction == DIRECTION_UP) {
            return 'up';
        } else if (direction == DIRECTION_LEFT) {
            return 'left';
        } else if (direction == DIRECTION_RIGHT) {
            return 'right';
        }
        return '';
    }

    /**
     * get a recognizer by name if it is bound to a manager
     * @param {Recognizer|String} otherRecognizer
     * @param {Recognizer} recognizer
     * @returns {Recognizer}
     */
    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        if (manager) {
            return manager.get(otherRecognizer);
        }
        return otherRecognizer;
    }

    /**
     * This recognizer is just used as a base for the simple attribute recognizers.
     * @constructor
     * @extends Recognizer
     */
    function AttrRecognizer() {
        Recognizer.apply(this, arguments);
    }

    inherit(AttrRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof AttrRecognizer
         */
        defaults: {
            /**
             * @type {Number}
             * @default 1
             */
            pointers: 1
        },

        /**
         * Used to check if it the recognizer receives valid input, like input.distance > 10.
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {Boolean} recognized
         */
        attrTest: function (input) {
            var optionPointers = this.options.pointers;
            return optionPointers === 0 || input.pointers.length === optionPointers;
        },

        /**
         * Process the input and return the state for the recognizer
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {*} State
         */
        process: function (input) {
            var state = this.state;
            var eventType = input.eventType;

            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
            var isValid = this.attrTest(input);

            // on cancel input and we've recognized before, return STATE_CANCELLED
            if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
                return state | STATE_CANCELLED;
            } else if (isRecognized || isValid) {
                if (eventType & INPUT_END) {
                    return state | STATE_ENDED;
                } else if (!(state & STATE_BEGAN)) {
                    return STATE_BEGAN;
                }
                return state | STATE_CHANGED;
            }
            return STATE_FAILED;
        }
    });

    /**
     * Pan
     * Recognized when the pointer is down and moved in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */
    function PanRecognizer() {
        AttrRecognizer.apply(this, arguments);

        this.pX = null;
        this.pY = null;
    }

    inherit(PanRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PanRecognizer
         */
        defaults: {
            event: 'pan',
            threshold: 10,
            pointers: 1,
            direction: DIRECTION_ALL
        },

        getTouchAction: function () {
            var direction = this.options.direction;
            var actions = [];
            if (direction & DIRECTION_HORIZONTAL) {
                actions.push(TOUCH_ACTION_PAN_Y);
            }
            if (direction & DIRECTION_VERTICAL) {
                actions.push(TOUCH_ACTION_PAN_X);
            }
            return actions;
        },

        directionTest: function (input) {
            var options = this.options;
            var hasMoved = true;
            var distance = input.distance;
            var direction = input.direction;
            var x = input.deltaX;
            var y = input.deltaY;

            // lock to axis?
            if (!(direction & options.direction)) {
                if (options.direction & DIRECTION_HORIZONTAL) {
                    direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
                    hasMoved = x != this.pX;
                    distance = Math.abs(input.deltaX);
                } else {
                    direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
                    hasMoved = y != this.pY;
                    distance = Math.abs(input.deltaY);
                }
            }
            input.direction = direction;
            return hasMoved && distance > options.threshold && direction & options.direction;
        },

        attrTest: function (input) {
            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
        },

        emit: function (input) {

            this.pX = input.deltaX;
            this.pY = input.deltaY;

            var direction = directionStr(input.direction);

            if (direction) {
                input.additionalEvent = this.options.event + direction;
            }
            this._super.emit.call(this, input);
        }
    });

    /**
     * Pinch
     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
     * @constructor
     * @extends AttrRecognizer
     */
    function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(PinchRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'pinch',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function () {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function (input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
        },

        emit: function (input) {
            if (input.scale !== 1) {
                var inOut = input.scale < 1 ? 'in' : 'out';
                input.additionalEvent = this.options.event + inOut;
            }
            this._super.emit.call(this, input);
        }
    });

    /**
     * Press
     * Recognized when the pointer is down for x ms without any movement.
     * @constructor
     * @extends Recognizer
     */
    function PressRecognizer() {
        Recognizer.apply(this, arguments);

        this._timer = null;
        this._input = null;
    }

    inherit(PressRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PressRecognizer
         */
        defaults: {
            event: 'press',
            pointers: 1,
            time: 251, // minimal time of the pointer to be pressed
            threshold: 9 // a minimal movement is ok, but keep it low
        },

        getTouchAction: function () {
            return [TOUCH_ACTION_AUTO];
        },

        process: function (input) {
            var options = this.options;
            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTime = input.deltaTime > options.time;

            this._input = input;

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
                this.reset();
            } else if (input.eventType & INPUT_START) {
                this.reset();
                this._timer = setTimeoutContext(function () {
                    this.state = STATE_RECOGNIZED;
                    this.tryEmit();
                }, options.time, this);
            } else if (input.eventType & INPUT_END) {
                return STATE_RECOGNIZED;
            }
            return STATE_FAILED;
        },

        reset: function () {
            clearTimeout(this._timer);
        },

        emit: function (input) {
            if (this.state !== STATE_RECOGNIZED) {
                return;
            }

            if (input && input.eventType & INPUT_END) {
                this.manager.emit(this.options.event + 'up', input);
            } else {
                this._input.timeStamp = now();
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    /**
     * Rotate
     * Recognized when two or more pointer are moving in a circular motion.
     * @constructor
     * @extends AttrRecognizer
     */
    function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(RotateRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof RotateRecognizer
         */
        defaults: {
            event: 'rotate',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function () {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function (input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
        }
    });

    /**
     * Swipe
     * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */
    function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(SwipeRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof SwipeRecognizer
         */
        defaults: {
            event: 'swipe',
            threshold: 10,
            velocity: 0.3,
            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
            pointers: 1
        },

        getTouchAction: function () {
            return PanRecognizer.prototype.getTouchAction.call(this);
        },

        attrTest: function (input) {
            var direction = this.options.direction;
            var velocity;

            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
                velocity = input.overallVelocity;
            } else if (direction & DIRECTION_HORIZONTAL) {
                velocity = input.overallVelocityX;
            } else if (direction & DIRECTION_VERTICAL) {
                velocity = input.overallVelocityY;
            }

            return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
        },

        emit: function (input) {
            var direction = directionStr(input.offsetDirection);
            if (direction) {
                this.manager.emit(this.options.event + direction, input);
            }

            this.manager.emit(this.options.event, input);
        }
    });

    /**
     * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
     * between the given interval and position. The delay option can be used to recognize multi-taps without firing
     * a single tap.
     *
     * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
     * multi-taps being recognized.
     * @constructor
     * @extends Recognizer
     */
    function TapRecognizer() {
        Recognizer.apply(this, arguments);

        // previous time and center,
        // used for tap counting
        this.pTime = false;
        this.pCenter = false;

        this._timer = null;
        this._input = null;
        this.count = 0;
    }

    inherit(TapRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'tap',
            pointers: 1,
            taps: 1,
            interval: 300, // max time between the multi-tap taps
            time: 250, // max time of the pointer to be down (like finger on the screen)
            threshold: 9, // a minimal movement is ok, but keep it low
            posThreshold: 10 // a multi-tap can be a bit off the initial position
        },

        getTouchAction: function () {
            return [TOUCH_ACTION_MANIPULATION];
        },

        process: function (input) {
            var options = this.options;

            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTouchTime = input.deltaTime < options.time;

            this.reset();

            if (input.eventType & INPUT_START && this.count === 0) {
                return this.failTimeout();
            }

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (validMovement && validTouchTime && validPointers) {
                if (input.eventType != INPUT_END) {
                    return this.failTimeout();
                }

                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

                this.pTime = input.timeStamp;
                this.pCenter = input.center;

                if (!validMultiTap || !validInterval) {
                    this.count = 1;
                } else {
                    this.count += 1;
                }

                this._input = input;

                // if tap count matches we have recognized it,
                // else it has began recognizing...
                var tapCount = this.count % options.taps;
                if (tapCount === 0) {
                    // no failing requirements, immediately trigger the tap event
                    // or wait as long as the multitap interval to trigger
                    if (!this.hasRequireFailures()) {
                        return STATE_RECOGNIZED;
                    } else {
                        this._timer = setTimeoutContext(function () {
                            this.state = STATE_RECOGNIZED;
                            this.tryEmit();
                        }, options.interval, this);
                        return STATE_BEGAN;
                    }
                }
            }
            return STATE_FAILED;
        },

        failTimeout: function () {
            this._timer = setTimeoutContext(function () {
                this.state = STATE_FAILED;
            }, this.options.interval, this);
            return STATE_FAILED;
        },

        reset: function () {
            clearTimeout(this._timer);
        },

        emit: function () {
            if (this.state == STATE_RECOGNIZED) {
                this._input.tapCount = this.count;
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    /**
     * Simple way to create a manager with a default set of recognizers.
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */
    function Hammer(element, options) {
        options = options || {};
        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
        return new Manager(element, options);
    }

    /**
     * @const {string}
     */
    Hammer.VERSION = '2.0.7';

    /**
     * default settings
     * @namespace
     */
    Hammer.defaults = {
        /**
         * set if DOM events are being triggered.
         * But this is slower and unused by simple implementations, so disabled by default.
         * @type {Boolean}
         * @default false
         */
        domEvents: false,

        /**
         * The value for the touchAction property/fallback.
         * When set to `compute` it will magically set the correct value based on the added recognizers.
         * @type {String}
         * @default compute
         */
        touchAction: TOUCH_ACTION_COMPUTE,

        /**
         * @type {Boolean}
         * @default true
         */
        enable: true,

        /**
         * EXPERIMENTAL FEATURE -- can be removed/changed
         * Change the parent input target element.
         * If Null, then it is being set the to main element.
         * @type {Null|EventTarget}
         * @default null
         */
        inputTarget: null,

        /**
         * force an input class
         * @type {Null|Function}
         * @default null
         */
        inputClass: null,

        /**
         * Default recognizer setup when calling `Hammer()`
         * When creating a new Manager these will be skipped.
         * @type {Array}
         */
        preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],

        /**
         * Some CSS properties can be used to improve the working of Hammer.
         * Add them to this method and they will be set when creating a new Manager.
         * @namespace
         */
        cssProps: {
            /**
             * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userSelect: 'none',

            /**
             * Disable the Windows Phone grippers when pressing an element.
             * @type {String}
             * @default 'none'
             */
            touchSelect: 'none',

            /**
             * Disables the default callout shown when you touch and hold a touch target.
             * On iOS, when you touch and hold a touch target such as a link, Safari displays
             * a callout containing information about the link. This property allows you to disable that callout.
             * @type {String}
             * @default 'none'
             */
            touchCallout: 'none',

            /**
             * Specifies whether zooming is enabled. Used by IE10>
             * @type {String}
             * @default 'none'
             */
            contentZooming: 'none',

            /**
             * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userDrag: 'none',

            /**
             * Overrides the highlight color shown when the user taps a link or a JavaScript
             * clickable element in iOS. This property obeys the alpha value, if specified.
             * @type {String}
             * @default 'rgba(0,0,0,0)'
             */
            tapHighlightColor: 'rgba(0,0,0,0)'
        }
    };

    var STOP = 1;
    var FORCED_STOP = 2;

    /**
     * Manager
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */
    function Manager(element, options) {
        this.options = assign({}, Hammer.defaults, options || {});

        this.options.inputTarget = this.options.inputTarget || element;

        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};

        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);

        toggleCssProps(this, true);

        each(this.options.recognizers, function (item) {
            var recognizer = this.add(new item[0](item[1]));
            item[2] && recognizer.recognizeWith(item[2]);
            item[3] && recognizer.requireFailure(item[3]);
        }, this);
    }

    Manager.prototype = {
        /**
         * set options
         * @param {Object} options
         * @returns {Manager}
         */
        set: function (options) {
            assign(this.options, options);

            // Options that need a little more setup
            if (options.touchAction) {
                this.touchAction.update();
            }
            if (options.inputTarget) {
                // Clean up existing event listeners and reinitialize
                this.input.destroy();
                this.input.target = options.inputTarget;
                this.input.init();
            }
            return this;
        },

        /**
         * stop recognizing for this session.
         * This session will be discarded, when a new [input]start event is fired.
         * When forced, the recognizer cycle is stopped immediately.
         * @param {Boolean} [force]
         */
        stop: function (force) {
            this.session.stopped = force ? FORCED_STOP : STOP;
        },

        /**
         * run the recognizers!
         * called by the inputHandler function on every movement of the pointers (touches)
         * it walks through all the recognizers and tries to detect the gesture that is being made
         * @param {Object} inputData
         */
        recognize: function (inputData) {
            var session = this.session;
            if (session.stopped) {
                return;
            }

            // run the touch-action polyfill
            this.touchAction.preventDefaults(inputData);

            var recognizer;
            var recognizers = this.recognizers;

            // this holds the recognizer that is being recognized.
            // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
            // if no recognizer is detecting a thing, it is set to `null`
            var curRecognizer = session.curRecognizer;

            // reset when the last recognizer is recognized
            // or when we're in a new session
            if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
                curRecognizer = session.curRecognizer = null;
            }

            var i = 0;
            while (i < recognizers.length) {
                recognizer = recognizers[i];

                // find out if we are allowed try to recognize the input for this one.
                // 1.   allow if the session is NOT forced stopped (see the .stop() method)
                // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
                //      that is being recognized.
                // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
                //      this can be setup with the `recognizeWith()` method on the recognizer.
                if (session.stopped !== FORCED_STOP && ( // 1
                !curRecognizer || recognizer == curRecognizer || // 2
                recognizer.canRecognizeWith(curRecognizer))) {
                    // 3
                    recognizer.recognize(inputData);
                } else {
                    recognizer.reset();
                }

                // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
                // current active recognizer. but only if we don't already have an active recognizer
                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                    curRecognizer = session.curRecognizer = recognizer;
                }
                i++;
            }
        },

        /**
         * get a recognizer by its event name.
         * @param {Recognizer|String} recognizer
         * @returns {Recognizer|Null}
         */
        get: function (recognizer) {
            if (recognizer instanceof Recognizer) {
                return recognizer;
            }

            var recognizers = this.recognizers;
            for (var i = 0; i < recognizers.length; i++) {
                if (recognizers[i].options.event == recognizer) {
                    return recognizers[i];
                }
            }
            return null;
        },

        /**
         * add a recognizer to the manager
         * existing recognizers with the same event name will be removed
         * @param {Recognizer} recognizer
         * @returns {Recognizer|Manager}
         */
        add: function (recognizer) {
            if (invokeArrayArg(recognizer, 'add', this)) {
                return this;
            }

            // remove existing
            var existing = this.get(recognizer.options.event);
            if (existing) {
                this.remove(existing);
            }

            this.recognizers.push(recognizer);
            recognizer.manager = this;

            this.touchAction.update();
            return recognizer;
        },

        /**
         * remove a recognizer by name or instance
         * @param {Recognizer|String} recognizer
         * @returns {Manager}
         */
        remove: function (recognizer) {
            if (invokeArrayArg(recognizer, 'remove', this)) {
                return this;
            }

            recognizer = this.get(recognizer);

            // let's make sure this recognizer exists
            if (recognizer) {
                var recognizers = this.recognizers;
                var index = inArray(recognizers, recognizer);

                if (index !== -1) {
                    recognizers.splice(index, 1);
                    this.touchAction.update();
                }
            }

            return this;
        },

        /**
         * bind event
         * @param {String} events
         * @param {Function} handler
         * @returns {EventEmitter} this
         */
        on: function (events, handler) {
            if (events === undefined) {
                return;
            }
            if (handler === undefined) {
                return;
            }

            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
            });
            return this;
        },

        /**
         * unbind event, leave emit blank to remove all handlers
         * @param {String} events
         * @param {Function} [handler]
         * @returns {EventEmitter} this
         */
        off: function (events, handler) {
            if (events === undefined) {
                return;
            }

            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                if (!handler) {
                    delete handlers[event];
                } else {
                    handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
                }
            });
            return this;
        },

        /**
         * emit event to the listeners
         * @param {String} event
         * @param {Object} data
         */
        emit: function (event, data) {
            // we also want to trigger dom events
            if (this.options.domEvents) {
                triggerDomEvent(event, data);
            }

            // no handlers, so skip it all
            var handlers = this.handlers[event] && this.handlers[event].slice();
            if (!handlers || !handlers.length) {
                return;
            }

            data.type = event;
            data.preventDefault = function () {
                data.srcEvent.preventDefault();
            };

            var i = 0;
            while (i < handlers.length) {
                handlers[i](data);
                i++;
            }
        },

        /**
         * destroy the manager and unbinds all events
         * it doesn't unbind dom events, that is the user own responsibility
         */
        destroy: function () {
            this.element && toggleCssProps(this, false);

            this.handlers = {};
            this.session = {};
            this.input.destroy();
            this.element = null;
        }
    };

    /**
     * add/remove the css properties as defined in manager.options.cssProps
     * @param {Manager} manager
     * @param {Boolean} add
     */
    function toggleCssProps(manager, add) {
        var element = manager.element;
        if (!element.style) {
            return;
        }
        var prop;
        each(manager.options.cssProps, function (value, name) {
            prop = prefixed(element.style, name);
            if (add) {
                manager.oldCssProps[prop] = element.style[prop];
                element.style[prop] = value;
            } else {
                element.style[prop] = manager.oldCssProps[prop] || '';
            }
        });
        if (!add) {
            manager.oldCssProps = {};
        }
    }

    /**
     * trigger dom event
     * @param {String} event
     * @param {Object} data
     */
    function triggerDomEvent(event, data) {
        var gestureEvent = document.createEvent('Event');
        gestureEvent.initEvent(event, true, true);
        gestureEvent.gesture = data;
        data.target.dispatchEvent(gestureEvent);
    }

    assign(Hammer, {
        INPUT_START: INPUT_START,
        INPUT_MOVE: INPUT_MOVE,
        INPUT_END: INPUT_END,
        INPUT_CANCEL: INPUT_CANCEL,

        STATE_POSSIBLE: STATE_POSSIBLE,
        STATE_BEGAN: STATE_BEGAN,
        STATE_CHANGED: STATE_CHANGED,
        STATE_ENDED: STATE_ENDED,
        STATE_RECOGNIZED: STATE_RECOGNIZED,
        STATE_CANCELLED: STATE_CANCELLED,
        STATE_FAILED: STATE_FAILED,

        DIRECTION_NONE: DIRECTION_NONE,
        DIRECTION_LEFT: DIRECTION_LEFT,
        DIRECTION_RIGHT: DIRECTION_RIGHT,
        DIRECTION_UP: DIRECTION_UP,
        DIRECTION_DOWN: DIRECTION_DOWN,
        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
        DIRECTION_ALL: DIRECTION_ALL,

        Manager: Manager,
        Input: Input,
        TouchAction: TouchAction,

        TouchInput: TouchInput,
        MouseInput: MouseInput,
        PointerEventInput: PointerEventInput,
        TouchMouseInput: TouchMouseInput,
        SingleTouchInput: SingleTouchInput,

        Recognizer: Recognizer,
        AttrRecognizer: AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,

        on: addEventListeners,
        off: removeEventListeners,
        each: each,
        merge: merge,
        extend: extend,
        assign: assign,
        inherit: inherit,
        bindFn: bindFn,
        prefixed: prefixed
    });

    // this prevents errors when Hammer is loaded in the presence of an AMD
    //  style loader but by script tag, not by the loader.
    var freeGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}; // jshint ignore:line
    freeGlobal.Hammer = Hammer;

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Hammer;
        });
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = Hammer;
    } else {
        window[exportName] = Hammer;
    }
})(window, document, 'Hammer');
(function ($) {

	$('a[href*=#]:not([href=#])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
})(jQuery);
//# sourceMappingURL=theme.js.map
