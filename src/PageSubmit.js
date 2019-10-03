var React = require('react');

import Ajax from './Ajax';

export class PageSubmit extends React.Component {
  constructor(props) {
    super(props);

    // bind event handlers to class context
    this.eventTargetChanged = this.eventTargetChanged.bind(this);
    this.eventSave = this.eventSave.bind(this);

    this.state = {
      url: "",
      targetType: "m4v_nokia500",
      statusText: ""
    };
  }

  eventTargetChanged(event) {
    this.setState({
      targetType: event.target.value,
      statusText: ""
    });
  }

  eventSave() {
    console.log("url: "+this.state.url);
    console.log("targetType: "+this.state.targetType);

    var ajax = new Ajax("server.php");

    var data = {
      "function": "submit",
      url: this.state.url,
      target: this.state.targetType
    }

    ajax.postData(data)
      .then(this.setState({statusText:"Job submitted"}))
      .catch(error => this.setState({statusText:"Error: "+error}));
  }

  render() {
    return (
      <p>
        <ons-input
          modifier="underbar"
          value={this.state.url}
          onChange={(event) => { this.setState({url: event.target.value, statusText: ""})} }
          placeholder="Paste URL here"></ons-input>

        <br/>

        <ons-list>
          <ons-list-header>
            Post Processing Options
            </ons-list-header>

            <ons-list-item tappable>
              <label className="left">
                <ons-radio
                  name="target_type"
                  checked={this.state.targetType === "mp3"}
                  onChange={this.eventTargetChanged}
                  id="mp3"
                  value="mp3"
                  modifier='material'></ons-radio>
              </label>
              <label className="center" for="mp3">
                MP3-audio
              </label>
            </ons-list-item>

            <ons-list-item tappable>
              <label className="left">
                <ons-radio
                  name="target_type"
                  checked={this.state.targetType === "m4v_nokia500"}
                  onChange={this.eventTargetChanged}
                  id="m4v_nokia500"
                  value="m4v_nokia500"
                  modifier='material'></ons-radio>
              </label>
              <label className="center" for="m4v_nokia500">
                MP4-video (Small)
              </label>
            </ons-list-item>

            <ons-list-item tappable>
              <label className="left">
                <ons-radio
                  name="target_type"
                  checked={this.state.targetType === "m4v_original"}
                  onChange={this.eventTargetChanged}
                  id="m4v_original"
                  value="m4v_original"
                  modifier='material'></ons-radio>
              </label>
              <label className="center" for="m4v_original">
                MP4-video (Original)
              </label>
            </ons-list-item>
          </ons-list>
        <br/>

        <ons-button
          onClick={this.eventSave}>
          Add Job
        </ons-button>

        <br/>

        {this.state.statusText}

      </p>
    );
  }
}
