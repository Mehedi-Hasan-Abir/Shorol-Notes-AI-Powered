import CalendarView from '../CalendarView';

export default function CalendarViewExample() {
  const events = [
    {
      id: '1',
      title: 'প্রোজেক্ট মিটিং',
      startsAt: new Date(2025, 10, 5, 10, 0),
      endsAt: new Date(2025, 10, 5, 11, 0),
      provider: 'google' as const,
    },
    {
      id: '2',
      title: 'টিম রিভিউ',
      startsAt: new Date(2025, 10, 6, 14, 0),
      endsAt: new Date(2025, 10, 6, 15, 30),
      provider: 'outlook' as const,
    },
  ];

  return (
    <CalendarView
      events={events}
      onEventClick={(id) => console.log('Event clicked:', id)}
    />
  );
}
