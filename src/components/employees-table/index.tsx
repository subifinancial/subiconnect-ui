import { useOrganisations } from '../../hooks';
import { useOrganisation } from '../../hooks/use-organisations';
import { listAllEmployees } from '../../services/api/employee/actions';
import type { ColumnDef, ListOptions } from '../../types/components/data-table';
import type { Employee, SelectableEmployeeColumns } from '../../types/employee';
import type { DataTableToolbarFilterOptions } from '../../ui/data-table-toolbar';
import GenericTable from '../../ui/extended/table/generic-table';
import React from 'react';

const EmployeesTable: React.FC<{
  columns: ColumnDef<Employee>[];
  enabledColumns?: SelectableEmployeeColumns[];
}> = ({ columns, enabledColumns = [] }) => {
  const listAction = React.useCallback(
    (options: ListOptions | undefined) =>
      listAllEmployees({
        ...options,
        params: { fields: enabledColumns, ...options?.params },
      }),
    [enabledColumns],
  );

  const filterOptions = [
    {
      columnId: 'organisation',
      title: 'Organisation',
      options: [
        {
          label: 'Johns Bricklaying',
          value: 'Johns Bricklaying',
          // icon?: React.ComponentType<{ className?: string }>;
        },
      ],
    },
  ] satisfies DataTableToolbarFilterOptions<Employee, unknown>;

  return (
    <GenericTable
      name='Employee'
      listAction={listAction}
      queryKeyFilters={[{ enabledColumns }]}
      dataTableProps={{ toolbarProps: { filterOptions, hideSearchBar: false } }}
      columns={columns}
    />
  );
};

export default EmployeesTable;
