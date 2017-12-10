import React from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import { Link } from 'dva/router';
import { formatTime } from '../utils/format';

class WorkOrderListPage extends React.Component {

  renderWorkOrder(workOrderList){
    const { basicInfo } =this.props.basicInfo;
    if(workOrderList.length>0){
      let cards=[];
      workOrderList.forEach((workOrder,index)=>{
        cards.push(
          <Link to={`/workOrder/${workOrder.workOrderId}?openId=${basicInfo.openId}`} key={index}>
            <Card title={formatTime(workOrder.time)}  style={{ width: 300, margin:20 }}>
              <p>{workOrder.description}</p>
            </Card>
          </Link>
        )
      });
      return cards;
    }else{
      return (
        <div style={{padding:20}}>
          <div style={{marginBottom:20}}>没有问诊记录</div>
          <Link to={`/addWorkOrder?openId=${basicInfo.openId}`}>
            <Button type="primary">新建问诊</Button>
          </Link>
        </div>
      )
    }


  }

  render(){
    const { workOrderList } = this.props.workOrderList;
    return (
      <div>
        {this.renderWorkOrder(workOrderList)}
      </div>
    );
  }

}

function mapStateToProps({workOrderList,basicInfo}) {
  return {workOrderList,basicInfo};
}

export default connect(mapStateToProps)(WorkOrderListPage);
