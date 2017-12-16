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
    let photoArray =[];
    photos.forEach((photo)=>{
      photoArray.push(photo.url)
    });
    this.setState({
      fields:{
        ...this.state.fields,
        photos:photoArray
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
    let { diseaseId } = this.props.disease;
    let { openId } = this.props.basicInfo.basicInfo;
    dispatch({
      type:'chat/addChat',
      payload:{
        diseaseId:diseaseId,
        description:description,
        openId:openId,
        photos:photos,
        photoTime:`${date} ${time}`
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

function mapStateToProps({ basicInfo,disease }) {
  return { basicInfo,disease };
}

export default connect(mapStateToProps)(AddChatPage);
