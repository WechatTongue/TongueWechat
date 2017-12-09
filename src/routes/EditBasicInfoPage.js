import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import BasicInfoForm from'../components/BasicInfoForm';

class EditBasicInfoPage extends React.Component{

  constructor(props){
    super(props);
    const { name,sex,age,history } = this.props.basicInfo.basicInfo;
    this.state={
      basicInfo: {
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
        }
      },
    }
  }

  handleFormChange(changedFields){
    console.log("handleFormChange",changedFields);
    this.setState({
      basicInfo: { ...this.state.basicInfo, ...changedFields },
    });
  }

  submitBasicInfo(values){
    const { dispatch } = this.props;
    const { name,sex,age,history } = this.state.basicInfo;
    dispatch({
      type:'basicInfo/saveBasicInfo',
      payload:{
        name:name.value,
        sex:sex.value,
        age:age.value,
        history:history.value
      }
    })
  }

  render(){
    const basicInfo = this.state.basicInfo;
    const props={
      ...basicInfo,
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

