"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Modal,
  Box,
  Tabs,
  Tab,
  Typography,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FeaturedIcon from "@mui/icons-material/FeaturedVideo";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Product, Status } from "@/app/services/types";
import { Edit } from "@mui/icons-material";
import ProductStatusUpdater from "../statusUpdate/productStatus";
import ProductStatus from "../status/productStatus";
import ProductFlagsEditor from "../statusUpdate/productTopFeaturesUpdate";
import { getProducts } from "@/lib/server-actions";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
};

interface ProductTableClientProps {
  products: Product[];
  totalProducts: number;
  initialPage: number;
  initialRowsPerPage: number;
}

const ProductTable: React.FC<ProductTableClientProps> = ({
  products,
  totalProducts,
  initialPage,
  initialRowsPerPage,
}) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [openModal, setOpenModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [productsData, setProductsData] = useState<Product[]>(products);
  const [filteredTotalProducts, setFilteredTotalProducts] =
    useState(totalProducts);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const { products: filteredProducts, totalProducts: filteredTotal } =
        await getProducts(page, rowsPerPage, statusFilter || undefined);

      setProductsData(filteredProducts as Product[]);
      setFilteredTotalProducts(filteredTotal);
    };

    fetchFilteredProducts();
  }, [page, rowsPerPage, statusFilter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (product: Product) => {
    setActiveProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setActiveProduct(null);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: 2,
          mb: 3,
          p: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel
            sx={{
              color: "#4CAF50",
              fontWeight: "bold",
            }}
          >
            Status
          </InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status)}
            label="Status"
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4CAF50",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#45a049",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4CAF50",
              },
              "& .MuiSelect-icon": {
                color: "#4CAF50",
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "ThreeDDarkShadow",
                }}
              >
                <TableCell
                  sx={{
                    color: "#FFFFFF", // White text
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Logo
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Top
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Featured
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Verified
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsData?.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F5F5F5", // Alternate row colors
                    "&:hover": {
                      backgroundColor: "#E0F7FA",
                    },
                  }}
                >
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>
                    <Image
                      src={product?.logo}
                      alt={`${product.name} Logo`}
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{product?.price}</TableCell>
                  <TableCell>{product?.description}</TableCell>
                  <TableCell>
                    <Tooltip title={product.top ? "Top: Yes" : "Top: No"}>
                      <IconButton
                        sx={{
                          color: product.top ? "#FFD700" : "#A0A0A0",
                          "&:hover": {
                            backgroundColor: product.top
                              ? "#FFD70022"
                              : "#A0A0A022",
                          },
                        }}
                      >
                        <StarIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        product.featured ? "Featured: Yes" : "Featured: No"
                      }
                    >
                      <IconButton
                        sx={{
                          color: product.featured ? "#4CAF50" : "#A0A0A0",
                          "&:hover": {
                            backgroundColor: product.featured
                              ? "#4CAF5022"
                              : "#A0A0A022",
                          },
                        }}
                      >
                        <FeaturedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        product.verified ? "Verified: Yes" : "Verified: No"
                      }
                    >
                      <IconButton
                        sx={{
                          color: product.verified ? "#2196F3" : "#A0A0A0",
                          "&:hover": {
                            backgroundColor: product.verified
                              ? "#2196F322"
                              : "#A0A0A022",
                          },
                        }}
                      >
                        <VerifiedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <ProductStatus status={product?.status ?? ""} />
                  </TableCell>
                  <TableCell>
                    <Edit
                      color="warning"
                      className="mx-2 cursor-pointer"
                      onClick={() => handleOpenModal(product)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTotalProducts}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: "#F5F5F5",
            borderTop: "1px solid #E0E0E0",
          }}
        />
      </Paper>

      {/* Modal Section */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            ...modalStyle,
            backgroundColor: "#28292D",
            borderRadius: "8px",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#1E1F23",
              borderBottom: "1px solid #393A3F",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              sx={{
                flexGrow: 1,
                "& .MuiTabs-indicator": {
                  backgroundColor: "#4CAF50",
                },
              }}
            >
              <Tab
                label="Status"
                sx={{
                  color: tabValue === 0 ? "#FFFFFF" : "#6B6C70",
                  backgroundColor: tabValue === 0 ? "#393A3F" : "transparent",
                  "&:hover": {
                    backgroundColor: "#4A4B50",
                  },
                  textTransform: "none",
                  fontWeight: "bold",
                  flex: 1,
                }}
              />
              <Tab
                label="Feature & Verify"
                sx={{
                  color: tabValue === 1 ? "#FFFFFF" : "#6B6C70",
                  backgroundColor: tabValue === 1 ? "#393A3F" : "transparent",
                  "&:hover": {
                    backgroundColor: "#4A4B50",
                  },
                  textTransform: "none",
                  fontWeight: "bold",
                  flex: 1,
                }}
              />
              <Tab
                label="Subscription"
                sx={{
                  color: tabValue === 2 ? "#FFFFFF" : "#6B6C70",
                  backgroundColor: tabValue === 2 ? "#393A3F" : "transparent",
                  "&:hover": {
                    backgroundColor: "#4A4B50",
                  },
                  textTransform: "none",
                  fontWeight: "bold",
                  flex: 1,
                }}
              />
            </Tabs>

            <Tooltip title="Close" placement="left">
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#4A4B50",
                  },
                  marginRight: "10px",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ p: 3, backgroundColor: "#28292D" }}>
            {tabValue === 0 && (
              <Box>
                <Typography variant="body1" mb={2} sx={{ color: "#FFFFFF" }}>
                  Item Status
                </Typography>
                <ProductStatusUpdater
                  productId={activeProduct?.id ?? ""}
                  status={activeProduct?.status ?? Status.PENDING}
                />
              </Box>
            )}
            {tabValue === 1 && (
              <Box>
                <ProductFlagsEditor
                  productId={activeProduct?.id ?? ""}
                  initialVerified={Boolean(activeProduct?.verified) ?? false}
                  initialTop={Boolean(activeProduct?.top) ?? false}
                  initialFeatured={Boolean(activeProduct?.featured) ?? false}
                />
              </Box>
            )}
            {tabValue === 2 && (
              <Box>
                <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                  Upcoming
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProductTable;
