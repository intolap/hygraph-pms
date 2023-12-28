import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
// import PaginationTable from "./PaginationTable";
import ProjectsTable from "./ProjectsTable";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const Projects = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Dashboard", path: "/dashboard" }, { name: "Projects" }]} />
            </Box>

            <SimpleCard title="Projects">
                <ProjectsTable />
            </SimpleCard>
        </Container>
    );
};

export default Projects;
