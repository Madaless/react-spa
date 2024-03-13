import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Button, TextField, Box, Typography } from '@mui/material';
import { Product } from '../model';
import { useGetProductsQuery } from './api';
import { useAppSelector } from '../configuration/hooks';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ProductsTable = () => {
    const page = useAppSelector(state => state.table.page);
    const id = useAppSelector(state => state.table.filterById);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { data: productsResponse, error } = useGetProductsQuery({ page, id })
    const navigate = useNavigate();

    useEffect(() => {
        const URLlistener = (): void => {
            let request = '';
            if (page || id) {
                request += '?';
            }
            if (page)
                request += `page=${page}`;
            if (id)
                request += `&id=${id}`
            navigate(request)
        }
        URLlistener();

    }, [page, id])

    const handleRowClick = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const renderTableRow = (product: Product) => (
        <TableRow
            key={product.id}
            onClick={() => handleRowClick(product)}
            style={{ backgroundColor: product.color }}
        >
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.year}</TableCell>
        </TableRow>
    );

    const renderTableRows = () => {
        if (!productsResponse?.data) {
            return null;
        }
        if (Array.isArray(productsResponse.data)) {
            return productsResponse.data.map(renderTableRow);
        }
        return renderTableRow(productsResponse.data);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(error && 'status' in error) ? <TableRow>
                        <TableCell colSpan={3} align="center">
                            <Typography variant="body1" color="error">{error.status} {JSON.stringify(error.data)}
                            </Typography>
                        </TableCell>
                    </TableRow> : renderTableRows()}
                </TableBody>
            </Table>

            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={style}>
                    <div>
                        {selectedProduct && (
                            <div>
                                <h2>{selectedProduct.name}</h2>
                                <p>ID: {selectedProduct.id}</p>
                                <p>Year: {selectedProduct.year}</p>
                                <p>Color: {selectedProduct.color}</p>
                            </div>
                        )}
                        <Button onClick={handleModalClose}>Close</Button>
                    </div>
                </Box>
            </Modal>
        </TableContainer>
    )
}

export default ProductsTable