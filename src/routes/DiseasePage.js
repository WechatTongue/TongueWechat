
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Timeline, Icon, Button} from 'antd';
import { formatTime } from '../utils/format';

class DiseasePage extends React.Component{

  renderPhotos(photos){
    if(photos&&photos.length&&photos.length>0){
      let photoWall =[];
      photos.forEach((photo)=>{
        photoWall.push(
          <img src = {photo.photoUrl} style={{ width:'100px', height:'100px', marginRight: '10px',marginTop:'5px'}} key={photo.id} />
        )
      });
      return photoWall;
    }
  }

  renderWorkOrderHeader({description,time}){
    return(
      <div style={{paddingBottom:20}}>
        <h2>{formatTime(time)}</h2>
        <p style={{padding:10,backgroundColor:"#eee"}}>{description}</p>
      </div>
    )
  }

  renderInquiry(data,openId){
    let { createTimeStr,description,diseaseId,id,photoTimeStr,photos} = data;
    return (
      <Timeline.Item dot={<Icon type="user" style={{fontSize: '16px'}}/>} color="blue"  key={id}>
        <div>
          <span color="blue">{createTimeStr}</span><br/>
          {description}<br/>
          {
            this.renderPhotos(photos,photoTimeStr)
          }
        </div>
        {((data)=>{
          if(data.editable){
            return (
              <Link to={`/workOrder/${diseaseId}/chats/${id}?openId=${openId}`}>
                <span>编辑</span>
              </Link>
            )
          }
        })(data)}
      </Timeline.Item>
    )
  }

  renderDiagnostic(data){
    let {createTimeStr,description,id} =data;
    return (
      <Timeline.Item dot={<Icon type="medicine-box" style={{fontSize: '16px'}}/>} color="green" key={id}>
        <span color="blue">{createTimeStr}</span><br/>
        {description}
      </Timeline.Item>
    )
  }

  renderChats(sequences,openId){
    let chats =[];
    const that = this;
    sequences.forEach(function(data) {
      if(data.type===1){
        chats.push(that.renderInquiry(data,openId))
      }else{
        chats.push(that.renderDiagnostic(data))
      }
    });
    return chats;
  }

  render(){
    const { diseaseId,chats } =this.props.disease;
    const { openId } = this.props.basicInfo.basicInfo;

    console.log(this.props.disease);

    return (
      <div style={{padding:'20px'}}>
        <Timeline>
          {this.renderChats(chats,openId)}
        </Timeline>
        <Link to={`/disease/${diseaseId}/addChat?openId=${openId}`}>
          <Button>添加描述</Button>
        </Link>
    </div>
    );
  }
}


function mapStateToProps({disease,basicInfo}) {
  return {disease,basicInfo};
}

export default connect(mapStateToProps)(DiseasePage);
