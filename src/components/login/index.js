import React, { Component } from "react";
import logo from "./img/logo.png";
import { Form, Icon, Input, Button, message } from "antd";
import './index.less';
import axios from 'axios';

const { Item } = Form;


class Login extends Component {
    validator = (rule, value, callback) => {
        const type = rule.field === 'username' ? '用户名' : '密码';
        if (!value) {
            callback(`输入${type}`);
        } else if (value.length < 5) {
            callback(`${type}长度至少为5位`);
        } else if (value.length > 12) {
            callback(`${type}长度最长为12位`);
        } else if (!/\w+/g.test(value)) {
            callback(`${type}只能由英文字母、数字、下划线组成`);
        } else {
            callback();
        }
    }

    /* validator = (type) => {
        return (rule, value, callback) => {
            type = type === 'username'? '用户名' : '密码';
            if (!value) {
                callback(`输入${type}`);
            } else if (value.length < 5) {
                callback(`${type}长度至少为5位`);
            } else if (value.length > 12) {
                callback(`${type}长度最长为12位`);
            } else if (!/\w+/.test(value)) {
                callback(`${type}只能由英文字母、数字、下划线组成`);
            } else {
                callback();
            }
        }
    } */

    handleSubmit = (event) => {
        event.preventDefault();
        const { validateFields, resetFields } = this.props.form;
        validateFields((errors, values) => {
            if (!errors) {
                axios.post('http://localhost:5000/api/login', values).then((res) => {
                    if (!res.data.status) {
                        this.props.history.push('/');
                    } else {
                        message.error(res.data.msg);
                        resetFields(['password']);
                    }
                }).catch(() => {
                    message.error('网络波动，请稍后访问');
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-header">
                    <h1>
                        <img src={logo} alt="logo" title="logo" />
                    </h1>
                    <span>React:后台管理系统</span>
                </div>
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <h2>用户登录</h2>
                    <Item>
                        {
                            getFieldDecorator('username', {
                                rules: [
                                    /* {
                                        required: true,
                                        message: '输入用户名'
                                    },
                                    {
                                        min: 5,
                                        message: '用户名长度至少5位'
                                    },
                                    {
                                        max: 12,
                                        message: '用户名长度不能超过12位'
                                    },
                                    {
                                        pattern: /\w+/,
                                        message: '用户名只能使用英文字母、数字、下划线'
                                    } */
                                    {
                                        //validator: this.validator('username')
                                        validator: this.validator
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            className="login-icon"
                                        />
                                    }
                                    placeholder="用户名"
                                />
                            )

                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.validator
                                        //validator: this.validator('password')
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            className="login-icon"
                                        />
                                    }
                                    type="password"
                                    placeholder="密码"
                                />
                            )

                        }
                    </Item>
                    <Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button login-btn"
                            block
                        >
                            登录
                        </Button>
                    </Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'login' })(Login);