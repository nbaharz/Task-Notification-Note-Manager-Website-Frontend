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
  iscompleted: boolean;
  description?: string;
  priority?: string;
  date: string;
  userId?: string;
  referenceType?: string;
}

export type Priority = 'High' | 'Medium' | 'Low';


export type TrackedProduct = {
  id: string;
  productTitle: string; // Was 'title'
  url: string; // Was 'productUrl'
  currentPrice: number | string; // Was 'recentPrice'
  priceSaving: string;
  productRating: string;
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


export interface Reminder {
  id: string;
  userId: string;
  message: string;
  date: string; // ISO string format
  referenceType?: string;
  referenceId?: string;
  isReminded: boolean;
  createdAt: string;
}


