import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import styles from './upload.less';

class UploadImage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) =>{
    this.setState({ fileList });
    this.handleSuccess({ fileList }); //
  };

  handleSuccess = ({fileList}) =>{
    const photos = fileList.map( ({uid,url}) =>{
      return { id:uid, url:url }
    });
    let {onUploadSuccess} = this.props;
    onUploadSuccess({
      photos:photos
    })
  };

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className={styles["ant-upload-text"]}>添加图片</div>
      </div>
    );

    let fProps = {
      name: 'photo',
      action: `http://www.ufengtech.xyz:8081/upload`,
      mode: 'no-cors',
      data: {
        uid:"",
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


