var React = require('react');
var Ons = require('react-onsenui');

export class MenuLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    //this.handleClick = this.handleClick.bind(this);

    console.log('MenuLeft constructor executed');
  }

  setTab(tabIndex) {
    console.log("setTab called: "+tabIndex);
    if (document.getElementById('page_tabbar_tabs')) {
      document.getElementById('page_tabbar_tabs').setActiveTab(tabIndex);
    }
  }

  handleClick(event, id) {
    //event.preventDefault();
    console.log(event.target);
    console.log(event.target.id);
    console.log(event.target.value);
    console.log(id);
  }

  render() {
    return (
      <Ons.List>
        <Ons.ListItem tappable onClick={() => this.setTab(0)}>Submit</Ons.ListItem>
        <Ons.ListItem tappable onClick={() => this.setTab(1)}>Status</Ons.ListItem>
        <Ons.ListItem tappable onClick={() => this.setTab(2)}>Download</Ons.ListItem>
      </Ons.List>
    )
  }

  /*render() {
    return (
      <ons-list>
        <ons-list-item ><div onclick="console.log('foobar');">Submit</div></ons-list-item>
      </ons-list>
    )
  }*/
}
