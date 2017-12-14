import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import BasicInfoForm from'../components/BasicInfoForm';

class EditBasicInfoPage extends React.Component{

  constructor(props){
    super(props);
  }

  handleFormChange(changedFields){
    console.log(changedFields);
    const {name,age,sex,mobile,history} = changedFields;
    const { basicInfo } = this.props.basicInfo;
    const { dispatch } = this.props;
    dispatch({
      type:'basicInfo/updateFromLocal',
      payload:{
        name:name?name.value:basicInfo.name,
        age:age?age.value:basicInfo.age,
        mobile:mobile?mobile.value:basicInfo.mobile,
        history:history?history.value:basicInfo.history,
        sex:sex?sex.value:basicInfo.sex
      }
    })
  }

  submitBasicInfo(){
    const { dispatch } = this.props;
    dispatch({
      type:'basicInfo/saveBasicInfo',
      payload:{
        ...this.props.basicInfo.basicInfo
      }
    })
  }

  render(){

    const { name,sex,age,history,mobile } = this.props.basicInfo.basicInfo;
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
          value:mobile,
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

