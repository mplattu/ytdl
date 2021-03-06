var React = require('react'); // FIXME: This is not needed?
var ReactDOM = require('react-dom');
var ons = require('onsenui'); // FIXME: This is not needed?
var Ons = require('react-onsenui'); // FIXME: This is not needed?

// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './custom.css';

// Require page classes
import {PageSubmit} from './PageSubmit';
import {PageStatus} from './PageStatus';
import {PageDownload} from './PageDownload';

import {MenuLeft} from './MenuLeft';

document.addEventListener('prechange', function(event) {
  document.getElementById('page_title').innerHTML = event.tabItem.getAttribute('label');
});

// Define global vars for all apps which must be called when their page is viewed
var domAppStatus = null;
var domAppDownload = null;

function button_menu_left() {
  console.log("button_menu_left()");
}

document.addEventListener('init', function(event) {
  var page = event.target.id;

  console.log("init event for id: " + page);

  // Render page apps when the app nodes are rendered
  if (page == "page_splitter") {
    ReactDOM.render(<MenuLeft />, document.getElementById("menu_left"));
  }

  if (page == "page_tabbar") {
    document.getElementById('button_menu_left').onclick = function() {
      console.log('button_menu_left clicked');
      document.getElementById("page_splitter_left").open();
    }

    document.getElementById('menu_left').onclick = function () {
      setTimeout(function () { document.getElementById('page_splitter_left').close(); }, 50);
    }
  }

  if (page == "page_submit") {
    ReactDOM.render(<PageSubmit />, document.getElementById('app_submit'));
  }

  if (page == "page_status") {
    domAppStatus = ReactDOM.render(<PageStatus />, document.getElementById('app_status'));

    document.getElementById("page_status").addEventListener("show", function(event) {
      domAppStatus.onShow();
    });

    document.getElementById("page_status").addEventListener("hide", function(event) {
      domAppStatus.onHide();
    });
  }

  if (page == "page_download") {
    domAppDownload = ReactDOM.render(<PageDownload />, document.getElementById('app_download'));

    document.getElementById("page_download").addEventListener("show", function(event) {
      domAppDownload.onShow();
    });

    document.getElementById("page_download").addEventListener("hide", function(event) {
      domAppDownload.onHide();
    });
  }
});
