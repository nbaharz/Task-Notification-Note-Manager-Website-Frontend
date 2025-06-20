export interface Note {
  id: string;
  title: string;
  content: string;
  pinned?: boolean; // Opsiyonel: Ana sayfada gösterilsin mi
  color?: string;
}

export interface Task {
  id?: string;
  title: string;
  completed: boolean;
  description?: string;
  priority?: string;
  date: string;
  userId?: string;
  referenceType?: string;
}

export type Priority = 'high' | 'medium' | 'low';


export type TrackedProduct = {
  id: string;
  title: string;
  productUrl: string;
  recentPrice: string;
  isDiscounted: boolean;
  lastFetchTime: string;
  notifyOnDiscount: boolean;
};

export interface Event {
  id: string;
  userId: string;
  title: string;
  description: string;
  eventDate: string; // ISO string olarak tutulur (DateTime -> string)
  referenceType: string; // veya enum olarak ReferenceType.Event
}



