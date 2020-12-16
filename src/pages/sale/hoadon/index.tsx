import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import { ShopData } from './data';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: ShopData) => {
  const hide = message.loading('Đang xử lý');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Thêm hành công');
    return true;
  } catch (error) {
    hide();
    message.error('Thêm thất bại, vui lòng thử lại sau!');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Đang xử lý');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.address,
      key: fields.key,
    });
    hide();

    message.success('Lưu lại thành công');
    return true;
  } catch (error) {
    hide();
    message.error('Cập nhật thất bại, vui lòng thử lại sau!');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: ShopData[]) => {
  const hide = message.loading('Đang xử lý');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Xoá thành công');
    return true;
  } catch (error) {
    hide();
    message.error('Xoá thất bại, vui lòng thử lại sau!');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<ShopData>();
  const columns: ProColumns<ShopData>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      tip: 'Tên cửa hàng',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      valueType: 'textarea',
    },
    {
      title: 'Quản lý',
      dataIndex: 'owner',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: 'Chưa khai trương', status: 'Default' },
        1: { text: 'Đang hoạt động', status: 'Success' },
        2: { text: 'Đã đóng cửa', status: 'Error' },
      },
    },
    {
      title: 'Ngày khai trương',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Sửa
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove([record]);
              actionRef.current?.reload();
            }}
          >
            Xoá
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<ShopData>
        headerTitle="Danh sách"
        actionRef={actionRef}
        rowKey="key" // change to id
        search= {false}
        toolBarRender={() => [
          <Button type="primary" key ="create da" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Thêm cửa hàng
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={false}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<ShopData, ShopData>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<ShopData>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
