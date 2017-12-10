import React from 'react';
import { connect } from 'dva';
import ChatForm from '../components/ChatForm';

class AddWorkOrderPage extends React.Component{

  constructor(props){
    super(props);
    const { basicInfo } =this.props.basicInfo;
    console.log(this.props.basicInfo);
    this.state={
      fields: {
        patientId:basicInfo.patientId,
        photos:[]
      },
    }
  }

  onUploadSuccess = ({photo}) =>{
    console.log("onUploadSuccess",photo);
    let { photos } =this.state.fields;
    photos.push({
      ...photo
    });
    this.setState({
      fields:{
        ...this.state.fields,
        photos:photos
      }
    })
  };

  onRemovePhoto = (photo) =>{
    // console.log("onRemovePhoto",photo);
    // let { photos } =this.state.fields;
    // console.log(photos);
    // let deleteIndex =0;
    // photos.forEach((p,index)=>{
    //   if(p.url===photo.url){
    //     deleteIndex=index
    //   }
    // });
    // photos.slice(deleteIndex,1);
    // console.log(photos);
    // this.setState({
    //   fields:{
    //     ...this.state.fields,
    //     photos:photos
    //   }
    // })
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
    console.log("submit",this.state);
    let {dispatch} = this.props;
    let {description,photos,date,time} = this.state.fields;
    dispatch({
      type:'workOrder/addWorkOrder',
      payload:{
        chats:[{
          description:description,
          patientId:this.props.basicInfo.basicInfo.patientId,
          sequenceId:1,
          photos:photos,
          time:`${date}T${time}`,
          type:"inquiry"
        }],
        patientId:this.props.basicInfo.basicInfo.patientId,
        description:description,
        time:`${date}T${time}`
      }
    })
  };

  render(){

    const uploadImageProps = {
      onUploadSuccess:this.onUploadSuccess.bind(this),
      onRemovePhoto:this.onRemovePhoto.bind(this),
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

export default connect(mapStateToProps)(AddWorkOrderPage);
