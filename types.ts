
export interface Tool {
  id: number;
  name: string;
  description: string;
  link: string;
  category: string;
  tags: string[];
  logoUrl: string;
  popularityScore?: number;
}
