import { Form, Input, InputNumber } from 'antd';
import styles from './form.less';
const FormItem = Form.Item;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value,
      }),
      age: Form.createFormField({
        ...props.age,
        value: props.age.value,
      })
    };
  },

  onValuesChange(_, values) {
    //console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <div>
    <Form className={styles['basicInfo-inline-form']}>
      <FormItem label="姓名">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '姓名为必填项' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="年龄">
        {getFieldDecorator('age', {
          rules: [{ required: true, message: '年龄为必填项' }],
        })(<InputNumber />)}
      </FormItem>
      <FormItem label="症状">
        {getFieldDecorator('description', {
          rules: [{ required: true, message: '症状为必填项' }],
        })(<Input />)}
      </FormItem>
    </Form>
    </div>
  );
});

export default CustomizedForm;
