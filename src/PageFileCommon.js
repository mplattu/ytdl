var React = require('react');

import Ajax from './Ajax';

export class PageFileCommon extends React.Component {
  constructor(props) {
    super(props);

    this.onShow = this.onShow.bind(this);

    this.state = {
      tableData: [],
      fileType: ""
    }
  }

  updateStatusData() {
    var ajax = new Ajax("server.php");

    var data = {
      "function": "files",
      type: this.state.fileType
    }

    ajax.postData(data)
      .then(data => this.setState({tableData: data.files}))
      .catch(error => this.setState({statusText:"Error: "+error}));
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
    // Called by show event in page_status (see index.js)
    this.updateStatusData();
  }
}
