import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId, INITIAL_EVENTS } from './event-utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    // aspectRatio: 2.5,
    timeZone: 'UTC',
    // height: '100%',
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });

  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {}

  /**
   * Toggles the visibility of the calendar by updating the boolean value of 'calendarVisible'.
   */
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  /**
   * Toggles the display of weekends on the calendar by updating the calendar options.
   */
  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  /**
   * Handles the selection of a date on the calendar by prompting the user to enter a new title for the event.
   * If a title is provided, a new event is added to the calendar with the specified title, start, end, and all-day status.
   *
   * @param selectInfo The DateSelectArg object containing information about the selected date range.
   */
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  /**
   * Handles the event click action by prompting the user for confirmation before deleting the clicked event.
   *
   * @param clickInfo The EventClickArg object containing information about the clicked event.
   */
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  /**
   * Updates the current events with the provided array of EventApi objects and triggers change detection.
   * This method is a workaround for the 'pressionChangedAfterItHasBeenCheckedError'.
   *
   * @param events An array of EventApi objects to update the current events with.
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
