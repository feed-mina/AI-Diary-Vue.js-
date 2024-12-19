<template>
  <div>
    <h1>FullCalendar 예제</h1>
    <FullCalendar
      defaultView="dayGridMonth"
      :events="events"
    />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      events: [
        { title: '회의', date: '2024-12-20' },
        { title: '발표', date: '2024-12-22' },
      ],
    };
  },
};
</script>
