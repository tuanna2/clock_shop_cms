import React, { useState } from 'react';
import { Form, Button, Input, Modal, Radio, Select } from 'antd';

import { ShopData } from '../data';

export interface FormValueType extends Partial<ShopData> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<ShopData>;
}
const FormItem = Form.Item;
const { TextArea } = Input;
// const { Option } = Select;
// const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    name: props.values.name,
    address: props.values.address,
    key: props.values.key,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="Tên cửa hàng"
          rules={[{ required: true, message: 'Tên không được để trống!' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
        >
          <TextArea rows={4} placeholder="Địa chỉ" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>Huỷ bỏ</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Lưu lại
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          key: formVals.key,
          name: formVals.name,
          address: formVals.address,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
