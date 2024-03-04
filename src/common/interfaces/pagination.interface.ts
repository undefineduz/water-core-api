export interface IPagination {
    skip?: number;
    limit?: number;
    sort?: { field: string, by: "ASC" | "DESC" }[];
    search?: { field: string, value: string }[];
}