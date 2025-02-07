"use client";

import React, { useState, useEffect } from "react";

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

import { Alternative, Status } from "@/services/types";
import { Edit } from "@mui/icons-material";

import { getAlternatives, getCategories } from "@/lib/server-actions";
import CategoryStatusUpdater from "../statusUpdate/categoryStatus";
import ProductStatus from "../status/productStatus";

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

interface AlternativeTableClientProps {
  alternatives: Alternative[];
  totalAlternatives: number;
  initialPage: number;
  initialRowsPerPage: number;
}

const AlternativeTable: React.FC<AlternativeTableClientProps> = ({
  alternatives,
  totalAlternatives,
  initialPage,
  initialRowsPerPage,
}) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [openModal, setOpenModal] = useState(false);
  const [activeAlternative, setActiveAlternative] =
    useState<Alternative | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [alternativeData, setAlternativeData] =
    useState<Alternative[]>(alternatives);

  const [filteredTotalAlternative, setFilteredTotalAlternative] =
    useState(totalAlternatives);

  useEffect(() => {
    const fetchFilteredAlternative = async () => {
      const {
        alternatives: filteredAlternative,
        totalAlternatives: filteredTotal,
      } = await getAlternatives(page, rowsPerPage, statusFilter || undefined);

      setAlternativeData(filteredAlternative as Alternative[]);
      setFilteredTotalAlternative(filteredTotal);
    };

    fetchFilteredAlternative();
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

  const handleOpenModal = (category: Alternative) => {
    setActiveAlternative(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setActiveAlternative(null);
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
                    color: "#FFFFFF",
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
              {alternativeData?.map((data, index) => (
                <TableRow
                  key={data.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F5F5F5", // Alternate row colors
                    "&:hover": {
                      backgroundColor: "#E0F7FA",
                    },
                  }}
                >
                  <TableCell>{data?.name}</TableCell>
                  <ProductStatus status={data?.status ?? ""} />
                  <TableCell>
                    <Edit
                      color="warning"
                      className="mx-2 cursor-pointer"
                      onClick={() => handleOpenModal(data)}
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
          count={filteredTotalAlternative}
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
                <CategoryStatusUpdater
                  categoryId={activeAlternative?.id ?? ""}
                  status={activeAlternative?.status ?? Status.PENDING}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AlternativeTable;
