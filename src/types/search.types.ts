export enum SearchInputType {
  TEXT = 'text',
  VOICE = 'voice',
  IMAGE = 'image',
}

export interface ShirtData {
  colorsShirt: string[];
  PriceShirt: number;
}

export interface SearchResponse {
  shirtsArr: ShirtData[];
}

export interface SearchRequest {
  prompt: string;
  type?: SearchInputType;
} 