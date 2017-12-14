import React from 'react';
import { connect } from 'dva';
import{ Link } from 'dva/router';
import { Button } from 'antd';
import styles from './Info.less';

class BasicInfoPage extends React.Component {

  render(){
    const {basicInfo} = this.props.basicInfo;
    return (
      <div className={styles['assignment-info']}>
        <div id="introduction" className={styles.info}>
          <div className={styles.title}>基本信息</div>
          <div className={styles.content}>
            <span>姓名：</span>
            <span>{basicInfo.name}</span>
          </div>
          <div className={styles.content}>
            <span>年龄：</span>
            <span>{basicInfo.age}</span>
          </div>
          <div className={styles.content}>
            <span>性别：</span>
            <span>{basicInfo.sex=="male"?"男":"女"}</span>
          </div>
          <div className={styles.content}>
            <span>手机号：</span>
            <span>{basicInfo.mobile}</span>
          </div>
          <div className={styles.content}>
            <span>病史：</span>
            <span>{basicInfo.history}</span>
          </div>
          <div className={styles.content}>
            <Link to={`/editBasicInfo?openId=${basicInfo.openId}`}>
              <Button>编辑</Button>
            </Link>
          </div>
        </div>

      </div>
    );
  }

}

function mapStateToProps({basicInfo}) {
  return {basicInfo};
}

export default connect(mapStateToProps)(BasicInfoPage);
