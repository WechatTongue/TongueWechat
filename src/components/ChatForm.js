import React from 'react';
import { DatePicker, Input, Card, Button, TimePicker } from 'antd';
import UploadImage from '../components/UploadImage';
const { TextArea } = Input;

class ChatForm extends React.Component{

  render(){

    const { uploadImageProps, onDateOk, onTimeOk, onDescriptionChange, onSubmit } = this.props;

    return (
      <div>
        <Card title="图片">
          <UploadImage {...uploadImageProps} />
        </Card>
        <Card title="拍摄时间">
          <DatePicker
            format="YYYY-MM-DD"
            placeholder="选择日期"
            onChange={onDateOk}
            style={{marginBottom:10}}
          />
          <br/>
          <TimePicker
            format="HH:mm"
            placeholder="选择时间"
            onChange={onTimeOk}
          />
        </Card>
        <Card title="症状描述">
          <TextArea autosize="true" onChange={onDescriptionChange}/>
        </Card>
        <Card>
          <Button onClick={onSubmit}>提交</Button>
        </Card>
      </div>
    );
  }
}

export default ChatForm;
