import React from 'react';
import { connect } from 'dva';
import { DatePicker, Input, Card, Button } from 'antd';
import UploadImage from '../components/UploadImage';
const { TextArea } = Input;

class AddWorkOrderPage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      fields: {
        patientId:12
      },
    }
  }

  onUploadSuccess = ({photos}) =>{
    console.log("photos",photos);
    this.setState({
      fields:{
        ...this.state.fields,
        photos:photos
      }
    })
  };

  onOk = (value) =>{
    let time = value.format('YYYY-MM-DDTHH:mm:ss');
    this.setState({
      fields: {
        ...this.state.fields,
        time:time
      }
    });
  };

  onDescriptionChange = (e) =>{
    this.setState({
      fields: {
        ...this.state.fields,
        description:e.target.value
      }
    });
  };

  onSubmit = () =>{
    console.log(this.state);
    let {dispatch} = this.props;
    dispatch({
      type:'workOrder/addWorkOrder',
      payload:{
        ...this.state.fields
      }
    })
  };

  render(){

    const uploadImageProps = {
      onUploadSuccess:this.onUploadSuccess.bind(this)
    };
    return (
      <div>
        <Card title="舌苔图片">
          <UploadImage {...uploadImageProps} />
        </Card>
        <Card title="拍摄时间">
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="选择日期和时间"
            onOk={this.onOk}
          />
        </Card>
        <Card title="症状描述">
          <TextArea autosize="true" onChange={this.onDescriptionChange}/>
        </Card>
        <Card>
          <Button onClick={this.onSubmit}>提交</Button>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ basicInfo }) {
  return { basicInfo };
}

export default connect(mapStateToProps)(AddWorkOrderPage);
