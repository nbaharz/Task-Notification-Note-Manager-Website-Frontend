export interface Note {
  id: string;
  title: string;
  content: string;
  pinned?: boolean; // Opsiyonel: Ana sayfada gösterilsin mi
  color?: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  date: string;
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



