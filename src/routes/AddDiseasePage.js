import React from 'react';
import { connect } from 'dva';
import ChatForm from '../components/ChatForm';

class AddDiseasePage extends React.Component{

  constructor(props){
    super(props);
    const { basicInfo } =this.props.basicInfo;
    this.state={
      fields: {
        openId:basicInfo.openId,
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
    let {dispatch} = this.props;
    let {description,photos,date,time} = this.state.fields;
    dispatch({
      type:'disease/add',
      payload:{
        openId:this.props.basicInfo.basicInfo.openId,
        description:description,
        photoTime:`${date} ${time}`,
        photos:photos
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

function mapStateToProps({ basicInfo }) {
  return { basicInfo };
}

export default connect(mapStateToProps)(AddDiseasePage);
