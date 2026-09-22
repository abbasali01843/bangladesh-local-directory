export type Category = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
};

export type District = {
  slug: string;
  name: string;
};

export type Service = {
  slug: string;
  name: string;
  categorySlug: string;
  districtSlug: string;
  phone: string;
  address: string;
  description: string;
  verified?: boolean;
};

export type Notice = {
  id: number;
  title: string;
  date: string;
  body: string;
};