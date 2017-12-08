import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';

class WorkOrderListPage extends React.Component {

  onclick(e){
    console.log(e.target);
  }

  renderWorkOrder(workOrderList){
    let cards=[];
    workOrderList.forEach((workOrder,index)=>{
      cards.push(
        <Card title={workOrder.time}  style={{ width: 300, margin:20 }} key={index} onClick={this.onClick}>
          <p>{workOrder.description}</p>
        </Card>
      )
    });
    return cards;
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

function mapStateToProps({workOrderList}) {
  return {workOrderList};
}

export default connect(mapStateToProps)(WorkOrderListPage);
