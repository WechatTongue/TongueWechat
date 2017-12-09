import { Form, Input, Radio } from 'antd';
import styles from './form.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onFieldsChange(changedFields);
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
      }),
      sex: Form.createFormField({
        ...props.sex,
        value: props.sex.value,
      }),
      history: Form.createFormField({
        ...props.age,
        value: props.history.value,
      }),
    };
  },

})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <div>
    <Form className={styles['basicInfo-inline-form']} >
      <FormItem label="姓名">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '姓名为必填项' }],
        })(<Input />)}
      </FormItem>
      <FormItem label="性别">
        {getFieldDecorator('sex', {
          rules: [{ required: true, message: '性别为必填项' }],
        })(<RadioGroup>
          <RadioButton value="male">男</RadioButton>
          <RadioButton value="female">女</RadioButton>
        </RadioGroup>)}
      </FormItem>
      <FormItem label="年龄">
        {getFieldDecorator('age', {
          rules: [{ required: true, message: '年龄为必填项' }],
        })(<Input type="number" />)}
      </FormItem>
      <FormItem label="病史">
        {getFieldDecorator('history', {
          rules: [{ required: false }],
        })(<Input />)}
      </FormItem>
    </Form>
    </div>
  );
});

export default CustomizedForm;
