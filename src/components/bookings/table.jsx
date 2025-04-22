import React, { useState, useEffect } from 'react';
import { DataTable } from 'mantine-datatable';

export const DEFAULT_QUERY = {
    size: 10,
    skip: 0,
    search: '',
    sorting: DEFAULT_SORT,
  };
  
  export const DEFAULT_SORTING = {
    columnAccessor: 'id',
    direction: 'asc',
  };

const PAGE_SIZES = [DEFAULT_QUERY.size, 20, 30, 50, 100];

export const Table = ({
    records,
    columns,
    totalRecords,
    filters,
    onPageChange,
    onSortStatusChange,
    onRowSelection,
}) => {
    const [sortStatus, setSortStatus] = useState(DEFAULT_SORTING);
    const [page, setPage] = useState(1);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const handleSortChange = (p) => {
        setSortStatus(p);
        onSortStatusChange({
            ...filters,
            sorting: `${p.columnAccessor} ${p.direction}`,
        });
    };

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

    return (<>
        <DataTable
            className="table-hover whitespace-nowrap"
            classNames={{
                pagination: '!px-4',
                header: !onRowSelection ? 'z-0' : undefined,
            }}
            records={records}
            columns={columns}
            highlightOnHover
            totalRecords={totalRecords}
            page={page}
            onPageChange={handlePageChange}
            sortStatus={sortStatus}
            onSortStatusChange={handleSortChange}
            minHeight={200}
            paginationText={({ from, to, totalRecords }) =>
                `Showing ${from} to ${to} of ${totalRecords} entries`
            }
            recordsPerPageOptions={PAGE_SIZES}
            recordsPerPage={pageSize}
            onRecordsPerPageChange={handlePageSizeChange}
            selectedRecords={onRowSelection ? selectedRecords : undefined}
            onSelectedRecordsChange={onRowSelection ? handleRowSelection : undefined}
        />
    </>

    );
};