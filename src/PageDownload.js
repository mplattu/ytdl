var React = require('react');

import ReactTable from 'react-table'
import 'react-table/react-table.css'

import {PageFileCommon} from './PageFileCommon';
import GetColumnWidth from './GetColumnWidth';

export class PageDownload extends PageFileCommon {
  constructor(props) {
    super(props);

    this.state.fileType = "download";
  }

  render() {
    var getColumnWidth = new GetColumnWidth();

    const columns = [{
      Header: 'Icon',
      accessor: 'icon',
      maxWidth:50,
      Cell: row => (
        <div>
          <ons-icon icon={this.getTranslatedIcon(row.value)}></ons-icon>
        </div>
      )
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: row => (
        <div>
          { row.original.wait ? row.value : <a href={'final/'+row.value} target="_blank">{row.value}</a> }
        </div>
      )
    },
    {
      Header: 'Size',
      accessor: 'size',
      width: getColumnWidth.get(this.state.tableData, 'size', 'Size')
    }];

    return (
      <p>
      <ReactTable data={this.state.tableData} columns={columns} />
      </p>
    );
  }
}
