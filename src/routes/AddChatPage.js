import React from 'react';
import { connect } from 'dva';
import ChatForm from '../components/ChatForm';

class AddChatPage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      fields: {
        photos:[]
      },
    }
  }

  onUploadSuccess = ({photos}) =>{
    console.log("onUploadSuccess",photos);
    this.setState({
      fields:{
        ...this.state.fields,
        photos:photos
      }
    })
  };

  onDateOk = (value) =>{
    let time = value.format('YYYY-MM-DD');
    this.setState({
      fields: {
        ...this.state.fields,
        date:time
      }
    });
  };

  onTimeOk = (value) =>{
    let time = value.format('HH:mm:ss');
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
    let { dispatch } = this.props;
    let { description,photos,date,time} = this.state.fields;
    let { workOrderId } = this.props.workOrder;
    let { patientId } = this.props.basicInfo.basicInfo;
    dispatch({
      type:'chat/addChat',
      payload:{
          workOrderId:workOrderId,
          description:description,
          patientId:patientId,
          photos:photos,
          time:`${date}T${time}`,
          type:"inquiry"
        }
    })
  };

  render(){

    const uploadImageProps = {
      onUploadSuccess:this.onUploadSuccess.bind(this),
      basicInfo:this.props.basicInfo.basicInfo
    };

    const formProps = {
      uploadImageProps:uploadImageProps,
      onDateOk:this.onDateOk.bind(this),
      onTimeOk:this.onTimeOk.bind(this),
      onDescriptionChange:this.onDescriptionChange.bind(this),
      onSubmit:this.onSubmit.bind(this)
    };

    return (
      <ChatForm {...formProps} />
    );
  }
}

function mapStateToProps({ basicInfo,workOrder }) {
  return { basicInfo,workOrder };
}

export default connect(mapStateToProps)(AddChatPage);
