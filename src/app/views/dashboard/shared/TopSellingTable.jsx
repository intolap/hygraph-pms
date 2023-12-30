import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Tooltip
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Projects</Title>
        {/* <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select> */}
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Project Name
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Start Date
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Status
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Avatar src={product.imgUrl} />
                    <Paragraph sx={{ m: 0, ml: 4 }}>{product.name}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.startDate}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.status ? (
                    product.status < 20 ? (
                      <Small bgcolor={bgSecondary}>off track</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>on track</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>on hold</Small>
                  )}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <Tooltip title="View Tasks" placement="top">
                    <IconButton>
                      <Icon color="primary">keyboard_arrow_right</Icon>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

const productList = [
  {
    imgUrl: '/assets/images/products/headphone-2.jpg',
    name: 'earphone',
    startDate: "18 january, 2019",
    status: 15,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'earphone',
    startDate: "18 january, 2019",
    status: 30,
  },
  {
    imgUrl: '/assets/images/products/iphone-2.jpg',
    name: 'iPhone x',
    startDate: "18 january, 2019",
    status: 35,
  },
  {
    imgUrl: '/assets/images/products/iphone-1.jpg',
    name: 'iPhone x',
    startDate: "18 january, 2019",
    status: 0,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'Head phone',
    startDate: "18 january, 2019",
    status: 5,
  },
];

export default TopSellingTable;
