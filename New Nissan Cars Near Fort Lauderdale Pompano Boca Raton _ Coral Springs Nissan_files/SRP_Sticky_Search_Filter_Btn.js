var srpRefineSearchFiltersOffset;
var refineBtnFirst;
var collapsingHeight;
var combinedHeight;
var srpRefineSearchPanel;
var sidebarWidth;
var resizeTimeout;

var positionRel = 'relative';
var positionFixed = 'fixed';
var refineBtnFirstHeight = 68;
var srpRefineSearchAccordion = document.getElementById('srpRefineSearch_accordion');
var srpRefineSearchFilters = $('#srpRefineSearch_Filters');
var srpRefineSearchBtn = $('button[onclick="refineSearch();"]');


function initSearchBtnUpdate() {
  
  window.addEventListener('scroll', ifElseCSSCheckScroll, false);
  window.addEventListener('resize', resizeRefineBtnThrottler, false);

  setupRefineBtnElems();
  addRefineBtnStyles();
  collapseHeightCheck();
  srpRefineSearchFiltersCheck();
  ifElseCSSCheckScroll();
  
}


function resizeRefineBtnThrottler() {
  
  if ( !resizeTimeout ) {
    resizeTimeout = setTimeout(function() {
      resizeTimeout = null;
      resizeRefineBtnHandler();
    }, 66);
  }

}


function resizeRefineBtnHandler() {

  getSetRefineSearchBtnWidth();
  srpRefineSearchFiltersCheck();
  ifElseCSSCheckScroll();

}


function setupRefineBtnElems() {
  
  $('button[onclick="refineSearch();"]').not('button[onclick="refineSearch();"]:first').remove();
  
  refineBtnFirst = $('button[onclick="refineSearch();"]:first');

  srpRefineSearchPanel = $(srpRefineSearchAccordion).find('.panel');

  srpRefineSearchPanel.append(refineBtnFirst);

}


function getSetRefineSearchBtnWidth() {

  sidebarWidth = srpRefineSearchPanel[0].getBoundingClientRect().width;
  refineBtnFirst[0].style.width = sidebarWidth + 'px';

}


function addRefineBtnStyles() {

  var refineBtnStyle = document.createElement('style');
  refineBtnStyle.type = 'text/css';
  refineBtnStyle.innerHTML = '.cssBase { height: ' + refineBtnFirstHeight + 'px; bottom: 0px; z-index: 999; border: 1px solid #fff; border-bottom: 20px solid #fff; border-top: none; transition: unset; margin-bottom: 0; } .cssBase:active, .cssBase:hover, .cssBase:focus, .cssBase:active:focus { border: 1px solid #fff; border-bottom: 20px solid #fff; border-top: none; outline: none;}';
  document.getElementsByTagName('head')[0].appendChild(refineBtnStyle);
  
  refineBtnFirst.addClass('cssBase');
  
  getSetRefineSearchBtnWidth();

}


function collapseHeightCheck() {

  $('div[id^="collapse"]').each(function() {

    var collapsingElem = $(this);
    var collapsingElemList = collapsingElem.find('.list-unstyled');
    var previousCss = collapsingElem.attr('style');
  
    collapsingElem.attr('style', 'position: absolute; visibility: hidden; display: block;');
  
    var optionHeight = collapsingElemList.height();
    
    collapsingElem.attr('style', previousCss ? previousCss : '');
    collapsingElemList.attr('style', 'height: ' + optionHeight + 'px;');

  });

}


function srpRefineSearchFiltersCheck() {

  srpRefineSearchFiltersOffset = srpRefineSearchFilters.offset().top + srpRefineSearchFilters.innerHeight();

}


function ifElseCSSCheckScroll() {
  var filterStickyPoint = $('#content-main-inventory').parent().offset().top;
  var $windowH = $(window).height();

  if ($windowH > filterStickyPoint){
    nonContentAbove();
  } else {
    bigContentAbove();
  }
}

function nonContentAbove() {
  if (((window.scrollY || document.documentElement.scrollTop) + window.innerHeight - refineBtnFirstHeight > srpRefineSearchFiltersOffset )){
      refineBtnFirst[0].style.position = positionRel;
    } else {
      refineBtnFirst[0].style.position = positionFixed;
    }
}

function bigContentAbove() {
  var filterStickyPoint = $('#content-main-inventory').parent().offset().top;

    if (((window.scrollY || document.documentElement.scrollTop) + window.innerHeight - refineBtnFirstHeight > srpRefineSearchFiltersOffset ) || ((window.scrollY || document.documentElement.scrollTop) + refineBtnFirstHeight < filterStickyPoint)){
      refineBtnFirst[0].style.position = positionRel;
    } else {
      refineBtnFirst[0].style.position = positionFixed;
    }
}

function ifElseCSSCheckShowCollapse(elem) {
  
  collapsingHeight = elem.find('.list-unstyled').outerHeight(true);
  combinedHeight = srpRefineSearchFiltersOffset + collapsingHeight;

  if ( (window.scrollY || document.documentElement.scrollTop) + window.innerHeight - refineBtnFirstHeight > combinedHeight ) {
    refineBtnFirst[0].style.position = positionRel;
  } else {
    refineBtnFirst[0].style.position = positionFixed;
  }

}


function ifElseCSSCheckHideCollapse(elem) {

  collapsingHeight = elem.find('.list-unstyled').outerHeight(true);
  combinedHeight = srpRefineSearchFiltersOffset - collapsingHeight;
  
  if ( (window.scrollY || document.documentElement.scrollTop) + window.innerHeight - refineBtnFirstHeight < combinedHeight ) {
    refineBtnFirst[0].style.position = positionFixed;
  } else {
    refineBtnFirst[0].style.position = positionRel;
  }

}

$('div[id^="collapse"]').on('show.bs.collapse', function () {

  srpRefineSearchFiltersCheck();
  
  if (srpRefineSearchBtn.length) {
    ifElseCSSCheckShowCollapse($(this));
    ifElseCSSCheckScroll();
  }

});

$('div[id^="collapse"]').on('shown.bs.collapse', function () {

  srpRefineSearchFiltersCheck();
  
  if (srpRefineSearchBtn.length) {
    ifElseCSSCheckScroll();
  }

});

$('div[id^="collapse"]').on('hide.bs.collapse', function () {

  srpRefineSearchFiltersCheck();
  
  if (srpRefineSearchBtn.length) {
    ifElseCSSCheckHideCollapse($(this));
    ifElseCSSCheckScroll();
  }

});

$('div[id^="collapse"]').on('hidden.bs.collapse', function () {

  srpRefineSearchFiltersCheck();
  
  if (srpRefineSearchBtn.length) {
    ifElseCSSCheckShowCollapse($(this));
    ifElseCSSCheckScroll();
  }

});


if (srpRefineSearchAccordion && srpRefineSearchBtn.length) {
  initSearchBtnUpdate();
}