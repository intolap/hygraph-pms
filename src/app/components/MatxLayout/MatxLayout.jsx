import { MatxSuspense } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { MatxLayouts } from './index';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectsById, getProjectsByMemberId
} from "../../../store/actions/projectAction";

const MatxLayout = (props) => {
  const { settings } = useSettings();
  const Layout = MatxLayouts[settings.activeLayout];

  const dispatch = useDispatch();
  const { error, successMessage, authenticate, token, myInfo } = useSelector((state) => state.Authors)

  useEffect(() => {
    dispatch(getProjectsByMemberId({ memberId: myInfo.id }))

  }, [myInfo && myInfo.userId && myInfo.userId.length > 0])

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
};

export default MatxLayout;