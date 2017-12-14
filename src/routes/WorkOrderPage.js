//单个WorkOrder
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Timeline, Icon, Button} from 'antd';
import { formatTime } from '../utils/format';

class WorkOrderPage extends React.Component{

  renderPhotos(photos){
    if(photos&&photos.length&&photos.length>0){
      console.log("renderPhoto",photos);
      let photoWall =[];
      photos.forEach((photo)=>{
        photoWall.push(
          <img src = {`http://www.ufengtech.xyz${photo.url.substring(5)}`} style={{ width:'100px', height:'100px', marginRight: '10px',marginTop:'5px'}} key={photo.id} />
        )
      });
      console.log("photoWall",photoWall);
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

  renderInquiry(data,basicInfo){
    let { workOrderId } =this.props.workOrder;
    return (
      <Timeline.Item dot={<Icon type="user" style={{fontSize: '16px'}}/>} color="blue"  key={data.sequenceId}>
        <div>
          <span color="blue">{data.time}</span><br/>
          {data.description}<br/>
          {
            this.renderPhotos(data.photos)
          }
        </div>
        {((data)=>{
          if(data.editable){
            return (
              <Link to={`/workOrder/${workOrderId}/chats/${data.chatId}?openId=${basicInfo.openId}`}>
                <span>编辑</span>
              </Link>
            )
          }
        })(data)}
      </Timeline.Item>
    )
  }

  renderDiagnostic(data){
    return (
      <Timeline.Item dot={<Icon type="medicine-box" style={{fontSize: '16px'}}/>} color="green" key={data.sequenceId}>
        {data.description}
      </Timeline.Item>
    )
  }

  renderChats(sequences,basicInfo){
    let chats =[];
    const that = this;
    sequences.forEach(function(data) {
      if(data.type==="inquiry"){
        chats.push(that.renderInquiry(data,basicInfo))
      }else{
        chats.push(that.renderDiagnostic(data))
      }
    });
    return chats;
  }

  render(){
    const { workOrderId, description, chats, time} =this.props.workOrder;
    const { basicInfo } = this.props.basicInfo;

    return (
      <div style={{padding:'20px'}}>
        {this.renderWorkOrderHeader({description,time})}
        <Timeline>
          {this.renderChats(chats,basicInfo)}
        </Timeline>
        <Link to={`/workOrder/${workOrderId}/addChat?openId=${basicInfo.openId}`}>
          <Button>添加描述</Button>
        </Link>
    </div>
    );
  }
}

function mapStateToProps({workOrder,basicInfo}) {
  return {workOrder,basicInfo};
}

export default connect(mapStateToProps)(WorkOrderPage);
