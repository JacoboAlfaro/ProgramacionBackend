import React from 'react'
import { Button, Form, Input, Card} from 'antd';
import { Auth } from "../../api"
import { useNavigate} from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';


const authController = new Auth();

export const RecoveryPassword = () => {

    const navigate = useNavigate();

    const redirigirLogin = () => {
        navigate('/');
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        try{
            authController.sendEmail(values.user)

        }catch(error){
            console.log(error);
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#E0E0E0'}}>
        <Card  style={{ width: 600, display: 'flex', justifyContent: 'center'}}>
        <ArrowLeftOutlined onClick={redirigirLogin}/>
        <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
                {
                type: 'email',
                required: true,
                message: 'Please input your Email!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Send Email
            </Button>
            </Form.Item>
        </Form>
        </Card>
    </div>
    )
}
