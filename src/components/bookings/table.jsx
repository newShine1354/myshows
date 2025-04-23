import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";

export const DEFAULT_QUERY = {
  size: 10,
  skip: 0,
  search: "",
};

export const DEFAULT_SORTING = {
  columnAccessor: "id",
  direction: "asc",
};

const PAGE_SIZES = [DEFAULT_QUERY.size, 20, 30, 50, 100];

export const Table = ({
  records,
  columns,
  totalRecords,
  filters,
  onPageChange,
  onRowSelection,
}) => {
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const handlePageChange = (event) => {
    setPage(event);
    onPageChange({
      ...filters,
      skip: (event - 1) * filters?.size,
    });
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event);
    onPageChange({
      ...filters,
      size: event,
      skip: 0,
    });
  };

  const handleRowSelection = (row) => {
    setSelectedRecords(row);

    onRowSelection(row);
  };

  const resetRowSelection = () => {
    setSelectedRecords([]);
  };

  return (
    <div className="d-flex justify-content-center">
      <div
        className=""
        style={{
          width: "80%",
          marginTop: 40,
        }}
      >
        <h2
          style={{
            marginBottom: 20,
          }}
        >
          Tickets
        </h2>
        <DataTable
          className="table-hover whitespace-nowrap"
          classNames={{
            pagination: "!px-4",
            header: !onRowSelection ? "z-0" : undefined,
          }}
          styles={{
            header: {
              backgroundColor: "#228be6",
              paddingTop: 5,
              paddingBottom: 5,
            },
            table: {
              border: "1px solid gray",
              borderRadius: 15,
            },
          }}
          records={records}
          columns={columns}
          highlightOnHover
          totalRecords={totalRecords}
          page={page}
          onPageChange={handlePageChange}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing ${from} to ${to} of ${totalRecords} entries`
          }
          recordsPerPageOptions={PAGE_SIZES}
          recordsPerPage={pageSize}
          onRecordsPerPageChange={handlePageSizeChange}
          selectedRecords={onRowSelection ? selectedRecords : undefined}
          onSelectedRecordsChange={
            onRowSelection ? handleRowSelection : undefined
          }
        />
      </div>
    </div>
  );
};
