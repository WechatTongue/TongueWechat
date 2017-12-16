import React from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import { Link } from 'dva/router';
import { formatTime } from '../utils/format';

class DiseaseListPage extends React.Component {

  renderDisease(diseaseList){

    const { basicInfo } =this.props.basicInfo;
    if(diseaseList.length>0){
      let cards=[];
      diseaseList.forEach((disease,index)=>{
        cards.push(
          <Link to={`/disease/${disease.id}?openId=${basicInfo.openId}`} key={index}>
            <Card title={disease.createTimeStr}  style={{ width: 300, margin:20 }}>
              <p>{disease.description}</p>
            </Card>
          </Link>
        )
      });
      return cards;
    }else{
      return (
        <div style={{padding:20}}>
          <div style={{marginBottom:20}}>没有问诊记录</div>
          <Link to={`/addDisease?openId=${basicInfo.openId}`}>
            <Button type="primary">新建问诊</Button>
          </Link>
        </div>
      )
    }


  }

  render(){
    const { list } = this.props.diseaseList;
    return (
      <div>
        {this.renderDisease(list)}
      </div>
    );
  }

}

function mapStateToProps({diseaseList,basicInfo}) {
  return {diseaseList,basicInfo};
}

export default connect(mapStateToProps)(DiseaseListPage);
