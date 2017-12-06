import React from 'react';
import { connect } from 'dva';
import UploadImage from '../components/UploadImage';

function UploadImagePage() {

  return (
    <div>
      <div><h2>基本信息</h2></div>
      <UploadImage />
    </div>
  );
}

UploadImagePage.propTypes = {
};

export default connect()(UploadImagePage);
