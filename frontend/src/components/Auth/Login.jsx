import React from 'react'
import { Button, Form, Input, Divider, Card, Flex } from 'antd';
import { Auth } from "../../api"
import { useNavigate } from 'react-router-dom';

const authController = new Auth();

export const Login = () => {

    const navigate = useNavigate();

    const redirigirLogin = () => {
        navigate('/register');
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        try{
            authController.login(values.user)
        }catch(error){
            console.log(error);
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return(

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#E0E0E0'}}>
        <Card  style={{ width: 600, display: 'flex', justifyContent: 'center'}}>
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
                    label="Password"
                    name={["user", "password"]}
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Login
                </Button>
                </Form.Item>
                <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
                >
                    <Divider>O</Divider>
                    <Flex gap="small">
                        <Button type="primary" onClick={redirigirLogin}>Register</Button>
                        <a type="link" href='/send-email'>Passowrd recovery</a>
                    </Flex>
                </Form.Item>
            </Form>
        </Card>
    </div>
    )
}