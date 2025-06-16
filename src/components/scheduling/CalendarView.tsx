import FullCalendar, { DateSelectArg, EventDropArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export type CalendarViewType = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

interface CalendarViewProps {
  initialView?: CalendarViewType;
  events: EventInput[];
  onSelect?: (arg: DateSelectArg) => void;
  onDrop?: (arg: EventDropArg) => void;
}

export default function CalendarView({
  initialView = 'dayGridMonth',
  events,
  onSelect,
  onDrop,
}: CalendarViewProps) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={initialView}
      headerToolbar={{
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      height="auto"
      selectable={Boolean(onSelect)}
      editable={Boolean(onDrop)}
      events={events}
      select={onSelect}
      eventDrop={onDrop}
    />
  );
}
