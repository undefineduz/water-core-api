export interface IPagination {
    skip?: number;
    limit?: number;
    sort?: { [key: string]: any }
    search?: { [key: string]: any };
}