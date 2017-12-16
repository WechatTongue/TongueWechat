import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import BasicInfoForm from'../components/BasicInfoForm';

class EditBasicInfoPage extends React.Component{

  constructor(props){
    super(props);
  }

  handleFormChange(changedFields){
    const { name,age,sex,mobile,history,job } = changedFields;
    const { basicInfo } = this.props.basicInfo;
    const { dispatch } = this.props;
    dispatch({
      type:'basicInfo/updateFromLocal',
      payload:{
        name:name?name.value:basicInfo.name,
        age:age?age.value:basicInfo.age,
        mobile:mobile?mobile.value:basicInfo.mobile,
        history:history?history.value:basicInfo.history,
        sex:sex?sex.value:basicInfo.sex,
        job:job?job.value:basicInfo.job
      }
    })
  }

  submitBasicInfo(){
    const { openId,name,sex,age,history,mobile,job } = this.props.basicInfo.basicInfo;
    const { dispatch } = this.props;
    dispatch({
      type:'basicInfo/saveBasicInfo',
      payload:{
        openId:openId,
        name:name,
        sex:sex,
        age:age,
        history:history,
        mobile:mobile,
        job:job
      }
    })
  }

  render(){

    const { name,sex,age,history,mobile,job } = this.props.basicInfo.basicInfo;
    const basicInfoSet={
        name:{
          value:name
        },
        sex:{
          value:sex
        },
        age:{
          value:age
        },
        history:{
          value:history
        },
        mobile:{
          value:mobile
        },
      job:{
          value:job
      }
    };

    const props={
      ...basicInfoSet,
      onFieldsChange:this.handleFormChange.bind(this),
    };

    return (
      <div style={{padding:20}}>
        <BasicInfoForm {...props}/>
        <Button type="primary" onClick={this.submitBasicInfo.bind(this)}>提交</Button>
      </div>
    );
  }
}

function mapStateToProps({basicInfo}) {
  return {basicInfo};
}

export default connect(mapStateToProps)(EditBasicInfoPage);

