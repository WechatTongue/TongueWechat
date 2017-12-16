import React from 'react';
import { connect } from 'dva';
import EditChatForm from '../components/EditChatForm';

class EditChatPage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      fields: {
        photos:[]
      },
    }
  }

  //在这里 dispatch 改 chat 里的数据
  onUploadSuccess = ({photo}) =>{
      const { dispatch } = this.props;
      const oldPhotos = this.props.chat.photos;
      let photos = [];
      oldPhotos.forEach((p)=>{
        photos.push(p)
      });
      photos.push(photo);
      console.log("onUploadSuccess",photos);
      dispatch({
        type:'chat/updatePhotos',
        payload:{
          photos:photos
        }
      })
  };

  onRemovePhoto = (file) =>{
    const {id} = file;
    const { dispatch } = this.props;
    const oldPhotos = this.props.chat.photos;
    let photos = [];
    oldPhotos.forEach((p)=>{
      if(p.id!==id)
        photos.push(p)
    });
    dispatch({
      type:'chat/updatePhotos',
      payload:{
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
    let { description,date,time} = this.state.fields;
    let { chatId, workOrderId,photos,sequenceId } = this.props.chat;
    let { patientId } = this.props.basicInfo.basicInfo;
    dispatch({
      type:'chat/updateChat',
      payload:{
        chatId:chatId,
        workOrderId:workOrderId,
        description:description,
        patientId:patientId,
        sequenceId:sequenceId,
        photos:photos,
        time:`${date} ${time}`,
        type:"inquiry"
      }
    })
  };

  render(){

    const { photos } =this.props.chat;
    const { patientId } = this.props.basicInfo.basicInfo;

    const uploadImageProps = {
      fileList:photos,
      patientId:patientId,
      onUploadSuccess:this.onUploadSuccess.bind(this),
      onRemove:this.onRemovePhoto.bind(this)
    };

    const formProps = {
      uploadImageProps:uploadImageProps,
      onDateOk:this.onDateOk.bind(this),
      onTimeOk:this.onTimeOk.bind(this),
      onDescriptionChange:this.onDescriptionChange.bind(this),
      onSubmit:this.onSubmit.bind(this)
    };

    return (
      <EditChatForm {...formProps} />
    );
  }
}

function mapStateToProps({ chat, basicInfo }) {
  return { chat, basicInfo };
}

export default connect(mapStateToProps)(EditChatPage);
