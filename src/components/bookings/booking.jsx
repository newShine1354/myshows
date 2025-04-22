import React from 'react'
import { Table } from './table'

const Booking = () => {
    
  return (
    <div>
      <Table
              records={admins && admins.data}
              columns={getColumns({ refetch })}
              totalRecords={admins?.count || 0}
              onPageChange={handlePageChange}
              onSortStatusChange={handleSortChange}
              filters={queryData}
              onRowSelection={handleRowSelection}
            />
    </div>
  )
}

export default Booking
