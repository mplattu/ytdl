var React = require('react');

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
      <ons-list>
        <ons-list-item tappable onClick={() => this.setTab(0)}>Submit</ons-list-item>
        <ons-list-item tappable onClick={() => this.setTab(1)}>Status</ons-list-item>
        <ons-list-item tappable onClick={() => this.setTab(2)}>Download</ons-list-item>
      </ons-list>
    )
  }
}
