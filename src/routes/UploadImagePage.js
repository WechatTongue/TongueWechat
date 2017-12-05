import React from 'react';
import { connect } from 'dva';
import UploadImage from '../components/UploadImage';

function UploadImagePage() {
  return (
    <UploadImage/>
  );
}

UploadImagePage.propTypes = {
};

export default connect()(UploadImagePage);
