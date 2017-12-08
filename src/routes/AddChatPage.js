// import React from 'react';
// import { connect } from 'dva';
// import { DatePicker, Input, Card, Button } from 'antd';
// import UploadImage from '../components/UploadImage';
// import BasicInfoForm from '../components/BasicInfoForm';
// import Button from "antd/es/button/button.d";
//
// class AddChatPage extends React.Component{
//
//   constructor(props){
//     super(props);
//     this.state={
//       fields: {
//         description:"",
//         photos:[
//           {
//             id:"",
//             url:""
//           }
//         ],
//         time:""
//       },
//     }
//   }
//
//   handleFormChange = (changedFields) => {
//     this.setState({
//       fields: { ...this.state.fields, ...changedFields },
//     });
//   };
//
//   onOk(value) {
//     let time = value.format('YYYY-MM-DD HH:mm:ss');
//     this.setState({
//       fields: {
//         ...this.state.fields,
//         time:{
//           value:time
//         }
//       }
//     });
//     console.log(this.state)
//   }
//
//   onSubmit(){
//
//   }
//
//
//   render(){
//
//     const uploadImageProps = {
//     };
//     return (
//       <div>
//         <Card title="舌苔图片">
//           <UploadImage {...uploadImageProps} />
//         </Card>
//         <Card title="拍摄时间">
//           <DatePicker
//             showTime
//             format="YYYY-MM-DD HH:mm"
//             placeholder="选择日期和时间"
//             onOk={this.onOk}
//           />
//         </Card>
//         <Card title="症状描述">
//           <Input/>
//         </Card>
//         <Card>
//           <Button onClick={this.onSubmit}>提交</Button>
//         </Card>
//       </div>
//     );
//   }
// }
//
// function mapStateToProps({ basicInfo }) {
//   return { basicInfo };
// }
//
// export default connect(mapStateToProps)(AddWorkOrderPage);
