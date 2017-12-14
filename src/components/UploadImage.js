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
    console.log("cancel",file);
    this.setState({ previewVisible: false });

  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({fileList}) =>{
    console.log("handleChange",fileList);
    this.setState({ fileList });
    let photos=[];
    fileList.forEach((file)=>{
      if(file.status==="done"){
          let {id,url,category} =file.response;
          photos.push({
            id:id,
            url:url.substring(5),
            category:category
          })
      }
    });
    let { onUploadSuccess } = this.props;
    onUploadSuccess({photos});
  };



  handleSuccess = (file) =>{
    console.log("");
    let { id, url, category } = file;
    let { fileList } = this.state;
    let newFileList =[];
    newFileList.push(fileList);
    newFileList.push({
      uid:id,
      url:url.substring(5),
      name:url.substring(5),
      status:'done'
    });
    console.log("newFileList",newFileList);
    this.setState({
      fileList:newFileList
    });
    let { onUploadSuccess } = this.props;
    onUploadSuccess({
      photo:{
        id:id,
        url:url.substring(5),
        category:category
      }
    })
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


