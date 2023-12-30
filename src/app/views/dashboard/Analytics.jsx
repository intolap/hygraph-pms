import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import Campaigns from '../shared/Campaigns';
import Activity from './parts/Activity';
import Performance from './parts/Performance';
import RowCards from '../tasks/TaskCards';
import StatCards from './parts/StatCards';
import StatCards2 from '../shared/StatCards2';
import TopSellingTable from './parts/TopSellingTable';
import UpgradeCard from '../shared/UpgradeCard';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const Analytics = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards />
            <TopSellingTable />
            {/* <StatCards2 /> */}

            {/* <H4>Projects Status</H4>
            <RowCards /> */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Activity</Title>
              <SubTitle>Last 30 days</SubTitle>
              <br /><br />
              <SubTitle>(Includes projects worked on and idle time)</SubTitle>

              <Activity
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Performance</Title>
              <SubTitle>Last 30 days</SubTitle>

              <Performance
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            {/* <UpgradeCard /> */}
            {/* <Campaigns /> */}
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment >
  );
};

export default Analytics;
