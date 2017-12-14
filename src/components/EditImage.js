import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import styles from './upload.less';

class EditImage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleRemove = (file) =>{
    const { onRemove } =this.props;
    onRemove(file);
  };

  //还是试试在这里写吧
  handleSuccess = (response) =>{
    let {id,url,categoryId} =response;
    let photo={
      id:id,
      url:url,
      categoryId:categoryId
    };
    let { onUploadSuccess } = this.props;
    onUploadSuccess({photo});
  };

  render() {
    const { patientId,fileList } = this.props;
    let newFileList=[];
    fileList.forEach((file)=>{
      newFileList.push({
        id:file.id,
        uid:file.id,
        name:file.id,
        url:`http://www.ufengtech.xyz${file.url.substring(5)}`,
        status:'done',
        categoryId:file.categoryId
      })
    });
    const {previewVisible, previewImage } = this.state;
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
        uid:patientId,
        categoryId:1
      }
    };

    return (
      <div className="clearfix">
        <Upload
          {...fProps}
          listType="picture-card"
          fileList={newFileList}
          onPreview={this.handlePreview}
          onSuccess={this.handleSuccess}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100px', maxWidth: '100px'}} className={styles["square-picture"]} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}

export default EditImage;


