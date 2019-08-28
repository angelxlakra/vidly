import React from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const Table = props => {
  const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table table-striped">
      <TableHead columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
