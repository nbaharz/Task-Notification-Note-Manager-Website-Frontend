export interface Note {
  // id:string;
  title: string;
  content: string;
  pinned?: boolean; // Opsiyonel: Ana sayfada gösterilsin mi
  color?: string;
}