import { useEffect, useRef, useState } from 'react';

// material-ui
import { useMediaQuery, Box, Dialog, SpeedDial, Tooltip, useTheme, Skeleton, Grid } from '@mui/material';

// third-party
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import esLocale from '@fullcalendar/core/locales/es';

// project imports
import Loader from 'components/Loader';
import { PopupTransition } from 'components/@extended/Transitions';
import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
import Toolbar from 'sections/apps/calendar/Toolbar';
import AddEventForm from 'sections/apps/calendar/AddEventForm';

import { getEvents, selectEvent, selectRange, toggleModal, updateCalendarView, updateEvent } from 'store/reducers/calendar';
import { format, getMonth, getYear } from 'date-fns';
import { Add } from 'iconsax-react';
import { dispatch, useSelector } from 'store';
import useAuth from 'hooks/useAuth';
import BookingDetailModal from 'components/BookingDetailModal';

// ==============================|| CALENDAR - MAIN ||============================== //

const Calendar = () => {
  const theme = useTheme();
  const { getClinicBookingListCalendar } = useAuth();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { calendarView } = useSelector((state) => state.calendar);
  const [month, setMonth] = useState(getMonth(new Date()) + 1);
  const [year, setYear] = useState(getYear(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await getClinicBookingListCalendar(activeFilter, "month", month, year);
      // console.log(response.data)
      if (response.data.success) {
        const transformedEvents = response.data.data.map(booking => ({
          id: booking.id,
          title: `${booking.service.name} con ${booking.pets.name}`,
          start: booking.date,
          end: new Date(new Date(booking.date).setHours(new Date(booking.date).getHours() + 1)),
          backgroundColor: booking.status === 'active' ? theme.palette.success.main : theme.palette.info.main,
          borderColor: theme.palette.divider,
          extendedProps: {
            booking: booking,
            additionalInfo: booking.additional_info,
            contact: booking.additional_contact,
            status: booking.status,
            user: {
              name: booking.user.name,
              phone: booking.user.phone,
              address: booking.user.address,
              email: booking.user.email,
            },
            pets: booking.pets,
            clinic: booking.clinic,
            booking_code: booking.booking_code,
          }
        }));
        setEvents(transformedEvents);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [activeFilter, month, year]);

  useEffect(() => {
    const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
    const viewCall = dispatch(updateCalendarView(newView));
    // const eventCall = dispatch(getEvents());
    // Promise.all([viewCall, eventCall]).then(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownSM]);

  const calendarRef = useRef(null);

  const [date, setDate] = useState(new Date());

  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      const newDate = calendarApi.getDate();
      setDate(newDate);
      setMonth(getMonth(newDate) + 1);
      setYear(getYear(newDate));
      console.log(newDate);
    }
  };

  const handleViewChange = (newView) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      dispatch(updateCalendarView(newView));
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      const newDate = calendarApi.getDate();
      setDate(newDate);
      setMonth(getMonth(newDate) + 1);
      setYear(getYear(newDate));
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      const newDate = calendarApi.getDate();
      setDate(newDate);
      setMonth(getMonth(newDate) + 1);
      setYear(getYear(newDate));
    }
  };

  const handleEventUpdate = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEventSelect = (info) => {
    setSelectedEvent(info.event);
    handleModal();
  };

  const handleRangeSelect = (info) => {
    setSelectedRange(info);
    handleModal();
  };

  if (loading) {
    return (
      <>
        <Loader />
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={600} sx={{ borderRadius: 2 }} />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
  return (
    <Box sx={{ position: 'relative' }}>
      <CalendarStyled>
        <Toolbar
          date={date}
          view={calendarView}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onChangeView={handleViewChange}
          activeFilter={activeFilter}
          onChangeFilter={setActiveFilter}
        />

        <FullCalendar
          locale={esLocale}
          weekends
          editable
          droppable
          selectable
          events={events}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={date}
          initialView={calendarView}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          select={handleRangeSelect}
          eventDrop={handleEventUpdate}
          eventClick={handleEventSelect}
          eventResize={handleEventUpdate}
          height={matchDownSM ? 'auto' : 720}
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
          eventDidMount={(info) => {
            if (info.view.type === 'listWeek' || info.view.type === 'listDay' || info.view.type === 'listMonth') {
              let dotEl = info.el.querySelector('.fc-list-event-dot');
              if (dotEl) {
                dotEl.style.backgroundColor = info.event.extendedProps.status === 'active' ? "green" : "blue";
              }
            }
          }}
        />
      </CalendarStyled>
      <BookingDetailModal open={isModalOpen} event={selectedEvent} onCancel={handleModal} onChange={fetchBookings} />
      {/* </Dialog> */}
      {/* <Tooltip title="Add New Event">
        <SpeedDial
          ariaLabel="add-event-fab"
          sx={{ display: 'inline-flex', position: 'sticky', bottom: 24, left: '100%', transform: 'translate(-50%, -50% )' }}
          icon={<Add />}
          onClick={handleModal}
        />
      </Tooltip> */}
    </Box>
  );
};

export default Calendar;
