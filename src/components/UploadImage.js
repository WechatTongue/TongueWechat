import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import styles from './upload.less';

class UploadImage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = (file) =>{
    this.setState({ previewVisible: false });
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleSuccess(fileResponse){
    let {result,object,msg} = fileResponse;
    let photos = [];
    if(result===1){
      photos.push({
        uid:object,
        name:object,
        url:object,
        status:'done',
      })
    }else{
      alert(msg);
    }
    let { fileList } = this.state;
    fileList.forEach((file)=>{
      let { uid,url,name } = file;
      photos.push({
        uid:uid,
        name:name,
        url:url,
        status:'done',
      })
    });
    this.setState({
      fileList:photos
    });

    const { onUploadSuccess } = this.props;
    onUploadSuccess({photos});
  }


  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className={styles["ant-upload-text"]}>添加图片</div>
      </div>
    );

    let fProps = {
      action: `http://www.ufengtech.xyz/Tongue/file/upload`,
    };

    return (
      <div className="clearfix">
        <Upload
          {...fProps}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onSuccess={this.handleSuccess.bind(this)}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <div style={{  width: 200,
            height: 0,
            paddingBottom: 200,
            overflow: 'hidden'}} >
            <img alt="example" style={{ width:200, minHeight: 200, position:'relative'}} src={previewImage}/>
          </div>
        </Modal>
      </div>
    );
  }


}



export default UploadImage;


