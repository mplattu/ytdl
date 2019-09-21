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

document.addEventListener('prechange', function(event) {
  document.querySelector('ons-toolbar .center')
    .innerHTML = event.tabItem.getAttribute('label');
});

// Define global vars for all apps which must be called when their page is viewed
var domAppStatus = null;
var domAppDownload = null;

document.addEventListener('init', function(event) {
  var page = event.target.id;

  console.log("Page Change: " + page);

  // Render page apps when the app nodes are rendered
  if (page == "page_submit") {
    ReactDOM.render(<PageSubmit />, document.getElementById('app_submit'));
  }

  if (page == "page_status") {
    domAppStatus = ReactDOM.render(<PageStatus />, document.getElementById('app_status'));

    document.getElementById("page_status").addEventListener("show", function(event) {
      domAppStatus.onShow();
    });
  }

  if (page == "page_download") {
    domAppDownload = ReactDOM.render(<PageDownload />, document.getElementById('app_download'));

    document.getElementById("page_download").addEventListener("show", function(event) {
      domAppDownload.onShow();
    });
  }
});
