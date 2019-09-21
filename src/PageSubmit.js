var React = require('react');
var Ons = require('react-onsenui');

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
        <Ons.Input
          underbar
          value={this.state.url}
          onChange={(event) => { this.setState({url: event.target.value, statusText: ""})} }
          placeholder="Paste URL here" />

        <br/>

        <Ons.ListHeader>
          Post Processing Options
        </Ons.ListHeader>

        <Ons.ListItem tappable>
          <label className="left">
            <Ons.Radio
              name="target_type"
              checked={this.state.targetType === "mp3"}
              onChange={this.eventTargetChanged}
              inputId="mp3"
              value="mp3"
              modifier='material' />
          </label>
          <label className="center" for="mp3">
            MP3-audio
          </label>
        </Ons.ListItem>

        <Ons.ListItem tappable>
          <label className="left">
            <Ons.Radio
              name="target_type"
              checked={this.state.targetType === "m4v_nokia500"}
              onChange={this.eventTargetChanged}
              inputId="m4v_nokia500"
              value="m4v_nokia500"
              modifier='material' />
          </label>
          <label className="center" for="m4v_nokia500">
            MP4-video (Small)
          </label>
        </Ons.ListItem>

        <Ons.ListItem tappable>
          <label className="left">
            <Ons.Radio
              name="target_type"
              checked={this.state.targetType === "m4v_original"}
              onChange={this.eventTargetChanged}
              inputId="m4v_original"
              value="m4v_original"
              modifier='material' />
          </label>
          <label className="center" for="m4v_original">
            MP4-video (Original)
          </label>
        </Ons.ListItem>

        <br/>

        <Ons.Button
          onClick={this.eventSave}>
          Add Job
        </Ons.Button>

        <br/>

        {this.state.statusText}

      </p>
    );
  }
}
