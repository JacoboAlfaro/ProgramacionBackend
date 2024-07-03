import React from 'react'
import { Button, Form, Input, Card} from 'antd';
import { Auth } from "../../api"
import { useParams, useNavigate} from 'react-router-dom';

import { ArrowLeftOutlined } from '@ant-design/icons';


const authController = new Auth();

export const ResetPassword = () => {

    const { token } = useParams();
    console.log('token: ',token);

    const navigate = useNavigate();

    const redirigirLogin = () => {
        navigate('/');
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        try{
            authController.resetPassword(values.user, token)

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
                label="New Password"
                name={["user", "newPassword"]}
                rules={[
                    {
                    required: true,
                    message: 'Please input your new password!',
                    },
                ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Reset Password
            </Button>
            </Form.Item>
        </Form>
        </Card>
    </div>
    )
}
