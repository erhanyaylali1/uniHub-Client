import React, { useState } from 'react';
import { Upload, message, Button, Input, Form, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from '../utils/apiCall'

const AddHomeworkToCourse = () => {

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = (deadLine, homeworkName) => {

        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('files', file);
        });
        formData.append('deadLine', deadLine);
        formData.append('homeworkName', homeworkName);

        setUploading(true);
        
        axios('courses1/1/addHomework',{
            method: 'post',
            processData: false,
            data: formData
        }).then((res) => {
            message.success(res.data);
            setFileList([]);
        }).catch((err) => {
            console.log(err)
        }).finally(()=> {
            setUploading(false)
        })
    }

    const props = {
        onRemove: (file) => {
            const files = fileList.filter((el) => el !== file);
            setFileList(files);
        },
        beforeUpload: (file) => {
          setFileList([...fileList, file])
          return false;
        },
        fileList,
    };

    const handleSubmit = (values) => {
        const { homeworkName } = values;
        const deadLine = values.deadLine.format("DD.MM.YYYY");
        handleUpload(deadLine, homeworkName);
    }

    const download = () => {
        axios.get('/uploads/homeworks/30.10.2021-transkript.pdf')
    }

    return (
        <div style={{ padding: 50 }}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Homework Name" name="homeworkName" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Deadline" name="deadLine">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Select File" name="file">  
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={uploading}
                        style={{ marginLeft: '28.4%'}}
                        
                    >
                        {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                </Form.Item>
            </Form>
            <Button 
                type="primary"
                onClick={download}
            >
                Download the Homework
            </Button>
        </div>
    )
}

export default AddHomeworkToCourse
