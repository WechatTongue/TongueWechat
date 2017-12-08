import React from 'react';
import { connect } from 'dva';
import styles from './BasicInfoPage.css';
import BasicInfoForm from'../components/BasicInfoForm';

function BasicInfoPage() {
  return (
    <div className={styles.normal}>
      Route Component: BasicInfoPage
    </div>
  );
}

function mapStateToProps({basicInfo}) {
  return {basicInfo};
}

export default connect(mapStateToProps)(BasicInfoPage);
