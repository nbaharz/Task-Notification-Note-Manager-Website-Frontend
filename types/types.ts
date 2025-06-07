export interface Note {
  id: string; // Benzersiz ID (örneğin UUID)
  title: string;
  content: string;
  pinned?: boolean; // Opsiyonel: Ana sayfada gösterilsin mi
  createdAt: string; // ISO tarih string (örneğin: 2025-06-07T12:34:56.000Z)
  updatedAt?: string; // Opsiyonel: Son düzenleme zamanı
}