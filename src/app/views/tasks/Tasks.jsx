import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import TaskList from "./TaskList";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const Tasks = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Dashboard", path: "/dashboard" }, { name: "Tasks" }]} />
            </Box>

            <SimpleCard title="Tasks">
                <TaskList />
            </SimpleCard>
        </Container>
    );
};

export default Tasks;
