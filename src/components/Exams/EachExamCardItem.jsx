import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { CustomButton } from "../common/CustomButton";
import MarksEntryDrawer from "./MarksEntryDrawer";

// MUI icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment"; // for Marks Entry

const subjectBgColors = [
  "#e0f2fe",
  "#d1fae5",
  "#fef9c3",
  "#fee2e2",
  "#ede9fe",
  "#f3e8ff",
];

const EachExamCardItem = ({ eachExam }) => {
  const [openMarkEntryDrawer, setOpenMarkEntryDrawer] = useState(false);

  return (
    <>
      <Box>
        <Card
          sx={{
            width: 400,
            height: 410,
            borderRadius: 3,
            boxShadow: "0 10px 20px -5px rgba(50, 115, 220, 0.3)",
            p: 2,
            m: 2,
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 20px 30px -10px rgba(50, 115, 220, 0.5)",
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              p: 1,
            }}
          >
            {/* Title */}
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 1, color: "primary.main" }}
            >
              {eachExam.title}
            </Typography>

            {/* Class and subjects */}
            <Stack direction="row" spacing={1} mb={2}>
              <Chip
                label={eachExam.class}
                color="primary"
                variant="filled"
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={`${eachExam.subjects.length} subjects`}
                size="small"
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  fontWeight: 600,
                }}
              />
            </Stack>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 1, fontWeight: "600" }}
            >
              • Subjects
            </Typography>

            {/* Scrollable Subject List */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                maxHeight: 220,
                p: 1,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "primary.light",
                bgcolor: "primary.lighter",
                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: 10,
                  backgroundColor: "primary.main",
                },
                "&::-webkit-scrollbar-track": {
                  borderRadius: 10,
                  backgroundColor: "primary.light",
                },
              }}
            >
              {eachExam.subjects.map((subject, index) => {
                const bgColor = subjectBgColors[index % subjectBgColors.length];
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      borderRadius: 2,
                      bgcolor: bgColor,
                      mb: 1,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        filter: "brightness(0.9)",
                        cursor: "default",
                      },
                    }}
                  >
                    <Typography fontWeight={600} color="text.primary">
                      {subject.name}
                    </Typography>
                    <Chip
                      label={`${subject.marks} marks`}
                      size="small"
                      sx={{
                        bgcolor: "rgba(0,0,0,0.05)",
                        color: "text.primary",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Action buttons */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              mt="auto"
            >
              <CustomButton
                onClick={() => setOpenMarkEntryDrawer(true)}
                variant="contained"
                size="small"
                startIcon={<AssignmentIcon />}
              >
                Marks Entry
              </CustomButton>
              <CustomButton
                sx={{ width: 90 }}
                variant="outlined"
                size="small"
                startIcon={<EditIcon />}
              >
                Edit
              </CustomButton>
              <CustomButton
                sx={{ width: 90 }}
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                customColor="red"
              >
                Delete
              </CustomButton>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Drawer */}
      {openMarkEntryDrawer && (
        <MarksEntryDrawer
          open={openMarkEntryDrawer}
          onClose={() => setOpenMarkEntryDrawer(false)}
          exam={eachExam}
          existingMarks={[]} // You can pass existing marks here if any
          onSave={(marks) => {
            console.log("✅ Saved Marks for", eachExam.title, marks);
            setOpenMarkEntryDrawer(false);
          }}
        />
      )}
    </>
  );
};

export default EachExamCardItem;
