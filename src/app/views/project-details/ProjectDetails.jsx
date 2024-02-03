import { useState, useEffect } from 'react';
import { Box, styled, Typography, Tabs, Tab } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PropTypes from 'prop-types';
import TaskCards from './TaskCards';
import { CLIENT_URL } from 'config/dev';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProjectDetails = () => {
    const [value, setValue] = useState(0);
    const [currentProject, setCurrentProject] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        projectErrorMessage,
        projectSuccessMessage,
        projectList
    } = useSelector((state) => state.Projects);
    const { projectid } = useParams();

    useEffect(() => {
        if (projectid) {
            const currentProjectObj = projectList.find(project => project.id === projectid);
            setCurrentProject(currentProjectObj);
        }
    }, [projectList, projectid])

    // console.log(currentProject)

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Dashboard", path: "/dashboard" }, { name: "Project Details" }]} />
            </Box>

            <SimpleCard title={`Project Details: ${currentProject && currentProject.title ? currentProject.title : null}`}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Overview" {...a11yProps(0)} />
                            <Tab label="Tasks" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        {currentProject && currentProject.content.html ?
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} dangerouslySetInnerHTML={{ __html: currentProject.content.html }}></Box>
                            : null}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box width="100%" overflow="auto">
                            <TaskCards />
                        </Box>
                    </CustomTabPanel>
                </Box>
            </SimpleCard>
        </Container>
    );
};

export default ProjectDetails;
