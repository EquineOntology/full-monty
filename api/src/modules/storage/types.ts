export type GetOptions = {
  filter?: FilterOption;
  limit?: number;
  returnFields?: string | string[];
  sort?: SortOption[];
};

type SortOption = {
  column: string;
  order: "asc" | "desc";
};

type AllowedFilters =
  | number
  | boolean
  | string
  | number[]
  | string[]
  | { operator: string; value: number | string }
  | { between: [number, number] };
type FilterOption = Record<string, AllowedFilters>;
