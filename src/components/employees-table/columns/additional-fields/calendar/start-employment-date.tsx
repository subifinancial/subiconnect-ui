import { useCalendar } from '@/context/table/columns/calendars/calendar-context';
import type { ColumnDef } from '@/types/components/data-table';
import type { Employee } from '@/types/employee';
import { DataTableColumnHeader } from '@/ui/data-table-column-header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import type { CellContext } from '@tanstack/react-table';
import React from 'react';

const StartEmploymentDateCell: React.FC<CellContext<Employee, unknown>> = ({
  row,
}) => {
  const { selectedCalendarId, setSelectedCalendarId } = useCalendar();

  const id =
    selectedCalendarId ?? row.original.info?.calendars?.[0]?.id?.toString();

  React.useEffect(() => {
    if (!selectedCalendarId) {
      setSelectedCalendarId(row.original.info?.calendars?.[0]?.id?.toString());
    }
  }, [selectedCalendarId]);

  if (!row.original.info.calendars || row.original.info.calendars.length === 0)
    return '';

  if (row.original.info.calendars.length === 1) {
    if (!row.original.info.calendars[0]?.startEmploymentDate) return '';

    if (!selectedCalendarId)
      setSelectedCalendarId(row.original.info.calendars[0]!.id.toString());

    return row.original.info.calendars[0]?.startEmploymentDate;
  }

  return (
    <Select value={id} onValueChange={setSelectedCalendarId}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {row.original.info.calendars.map((calendar) => {
          if (!calendar.startEmploymentDate) return null;
          return (
            <SelectItem key={calendar.id} value={calendar.id.toString()}>
              {calendar.startEmploymentDate}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export const startEmploymentDateColumn: ColumnDef<Employee> = {
  id: 'startEmploymentDate',
  accessorKey: 'info.calendars',
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title={'Start Date'}
      className='sc-w-[130px]'
    />
  ),
  cell: StartEmploymentDateCell,
};
