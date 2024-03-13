import { Button } from '@mui/material';
import { PaginationProps } from '../model';

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {

    return (
        <div>
            <Button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                Previous
            </Button>
            <span>{`Page ${page} of ${totalPages}`}</span>
            <Button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </Button>
        </div>
    );
};

export default Pagination;
