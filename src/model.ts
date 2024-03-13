
interface Product {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
}

interface ApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Product[];
    support: {
        url: string;
        text: string;
    };
}

interface ApiFilterResponse {
    data: Product;
}

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export type { ApiResponse, Product, PaginationProps, ApiFilterResponse };
