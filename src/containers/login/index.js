import React, { Component } from "react";
import logo from "./img/logo.png";
import { Form, Icon, Input, Button, message } from "antd";
import './index.less';
import { setUserAsync } from '../../redux/action-creators/user';
import { connect } from 'react-redux';
import { setUserItem } from '../../utils/storage/user-storage';
import loginCheck from '../with-login-check';

const { Item } = Form;

@loginCheck
@connect(null, { setUserAsync })
@Form.create({ name: 'login' })
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

    handleSubmit = (event) => {
        event.preventDefault();
        const { validateFields, resetFields } = this.props.form;
        validateFields((errors, values) => {
            if (!errors) {
                const { username, password } = values;
                this.props.setUserAsync(username, password)
                    .then((res) => {
                        setUserItem('user', res);
                        console.log(this.props.history);
                        this.props.history.push('/');
                    })
                    .catch((errMsg) => {
                        message.error(errMsg);
                        resetFields(['password']);
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
                                    {
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

export default Login;