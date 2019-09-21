var React = require('react');

import Ajax from './Ajax';

export class PageFileCommon extends React.Component {
  constructor(props) {
    super(props);

    this.onShow = this.onShow.bind(this);

    this.state = {
      tableData: [],
      fileType: "",
      refreshHandle: null
    }
  }

  setRefresh() {
    console.log("setRefresh: "+this.state.fileType);
    this.state.refreshHandle = setTimeout(function() { this.updateStatusData(); }.bind(this), 5000);
  }

  updateStatusData() {
    var ajax = new Ajax("server.php");

    var data = {
      "function": "files",
      type: this.state.fileType
    }

    ajax.postData(data)
      .then(data => { this.setState({tableData: data.files}); this.setRefresh(); } )
      .catch(error => { this.setState({statusText:"Error: "+error}); this.setRefresh(); } );
  }

  getTranslatedIcon(icon) {
    if (icon === "audio") {
      return "fa-file-audio";
    }

    if (icon === "video") {
      return "fa-file-video";
    }
    if (icon === "clock") {
      return "fa-clock";
    }

    return "fa-file";
  }

  onShow() {
    // Called by show event (see index.js)
    this.updateStatusData();
  }

  onHide() {
    // Called by hide event (see index.js)
    
    if (this.state.refreshHandle != null) {
      clearTimeout(this.state.refreshHandle);
      this.state.refreshHandle = null;
    }
  }
}
