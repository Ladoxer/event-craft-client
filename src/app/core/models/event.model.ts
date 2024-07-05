export interface Event {
  id?: string;
  title: string;
  description: string;
  date: Date;
  organizer: string;
  attendees?: string[];
}