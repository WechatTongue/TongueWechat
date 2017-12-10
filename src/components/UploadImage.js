import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import styles from './upload.less';

class UploadImage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
        uid:2,
        name: 'xxx.png',
        url:'http://www.ufengtech.xyz/tongue/4443d2f9-a2dc-42aa-b347-62e688d72595_1b54ffeb952a5b091ca4404d470c7ed5.jpg',
        status:'done'
    }],
  };

  handleCancel = (file) =>{
    console.log("cancel",file);
    this.setState({ previewVisible: false });
    // let { onCancelUpload } = this.props;
    // onCancelUpload(file);
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) =>{
    console.log("handleChange",fileList);
    this.setState({ fileList });
  };

  handleSuccess = (file) =>{
    let { id, url, category } = file;
    let { fileList } =this.state;
    let {onUploadSuccess} = this.props;
    onUploadSuccess({
      photo:{
        id:id,
        url:url.substring(5),
        category:category
      }
    })
  };

  handleRemove = (file) =>{
    console.log("remove",file);
    let { onRemovePhoto } =this.props;
    onRemovePhoto(file);
  };

  render() {
    const {basicInfo} = this.props;
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className={styles["ant-upload-text"]}>添加图片</div>
      </div>
    );

    let fProps = {
      name: 'file',
      action: `http://www.ufengtech.xyz:8081/upload`,
      data: {
        uid:basicInfo.patientId,
        categoryId:1
      }
    };

    return (
      <div className="clearfix">
        <Upload
          {...fProps}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onSuccess={this.handleSuccess}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100px', maxWidth: '100px'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}



export default UploadImage;


