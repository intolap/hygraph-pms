import { Box, Card, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import TaskSingle from "./TaskSingle";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const TaskDetail = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Dashboard", path: "/dashboard" }, { name: "Task Detail" }]} />
      </Box>

      <SimpleCard title="Task Detail">
        <TaskSingle />
      </SimpleCard>
    </Container>
  );
};

export default TaskDetail;
