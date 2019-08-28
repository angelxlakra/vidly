import React, { Component } from "react";

class TableHead extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  raiseIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    if (sortColumn.order === "desc") return <i className="fa fa-sort-desc" />;
  };
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key}
            >
              {column.label}
              {this.raiseIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
