/*
SmartehMqtt
Copyright (C) 2021-2024 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Button,
    Row,
    Col,
    Layout,
    Tabs,
    Checkbox,
    Select,
    Switch,
} from "antd";
import type { QoS } from "mqtt-packet";
import { useAppDispatch } from "../app/hooks";
import {
    connect,
    loadConnectionCredentials,
    loadConnectionInfo,
} from "../app/sliceConnection";
import {
    ConnectCredentials,
    ConnectInfo,
    ConnectedStatus,
    saveStoreConnectConnected,
    saveStoreConnectCredentials,
    saveStoreConnectInfo,
} from "./ConnectionInfo";
import { ConnectInfoForm } from "./ConnectInfoForm";
import ModalError from "../ModalError";
import AppHeader from "../AppHeader";
import UploadRaw from "./UploadRaw";
import "./ContentConnect.css";
import SVGIcon from "../format/SVGIcon";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useI18n, LanguageSelect } from "../i18n/LocaleProvider";

type ModalErrorInfo = {
    title: string;
    errorMessage: string;
    visible: boolean;
};

const ConnectStored: React.FC<{
    connectInfo: ConnectInfo;
    connectCredentials: ConnectCredentials;
}> = ({ connectInfo, connectCredentials }) => {
    const [form] = Form.useForm<ConnectInfoForm>();
    const will = Form.useWatch("will", form);
    const dispatch = useAppDispatch();
    const { t } = useI18n();
    const HIDDEN: ModalErrorInfo = {
        visible: false,
        title: "",
        errorMessage: "",
    };
    const [errorinf, showError] = useState<ModalErrorInfo>(HIDDEN);

    useEffect(() => {
        const connectInfoForm: ConnectInfoForm = {
            ...connectInfo,
            ...connectCredentials,
        };
        form.setFieldsValue(connectInfoForm);
        window.scrollTo(0, 0);
    }, [form, connectInfo, connectCredentials]);

    useEffect(() => {
        form.validateFields(["willtopic", "willqos", "willretain"]);
    }, [form, will]);

    const handleFail = (): void => {
        showError({
            visible: true,
            title: t.connectForm.connectionValuesErrorTitle,
            errorMessage: t.connectForm.connectionValuesErrorMsg,
        });
    };
    return (
        <>
            <ModalError {...errorinf} onOk={() => showError(HIDDEN)} />
            <Form
                form={form}
                name="connection"
                onFinish={connectInfoForm => {
                    const connectInfoNew: ConnectInfo = {
                        clientId: connectInfoForm.clientId,
                        url: connectInfoForm.url,
                        keepalive: connectInfoForm.keepalive,
                        protocolVersion: 5,
                        clean: connectInfoForm.clean,
                        connectTimeout: connectInfoForm.connectTimeout,
                        reconnectPeriod: connectInfoForm.reconnectPeriod,
                        will: connectInfoForm.will,
                        willtopic: connectInfoForm.willtopic,
                        willqos: connectInfoForm.willqos,
                        willretain: connectInfoForm.willretain,
                        willpayload: connectInfoForm.willpayload,
                        dashboard: connectInfoForm.dashboard,
                        dashboardcss: connectInfoForm.dashboardcss,
                    };
                    const connectCredentialsNew: ConnectCredentials = {
                        username: connectInfoForm.username,
                        password: connectInfoForm.password,
                    };

                    try {
                        saveStoreConnectInfo(connectInfoNew);
                        saveStoreConnectCredentials(connectCredentialsNew);
                        saveStoreConnectConnected(ConnectedStatus.CONNECTED);
                        dispatch(
                            loadConnectionInfo({ connectInfo: connectInfoNew }),
                        );
                        dispatch(
                            loadConnectionCredentials({
                                connectCredentials: connectCredentialsNew,
                            }),
                        );
                        dispatch(connect());
                    } catch {
                        showError({
                            visible: true,
                            title: t.connectForm.connectionStorageErrorTitle,
                            errorMessage:
                                t.connectForm.connectionStorageErrorMsg,
                        });
                    }
                }}
                onFinishFailed={handleFail}
                className="myhConnectionForm"
            >
                <Layout className="myhLayout">
                    <AppHeader title={t.connectForm.headerSmartehMqtt}>
                        <LanguageSelect />
                        <Button
                            icon={<SVGIcon icon={faPowerOff} />}
                            type="primary"
                            htmlType="submit"
                        >
                            {t.connectForm.connect}
                        </Button>
                    </AppHeader>
                    <Layout.Content className="myhLayoutContent">
                        <div className="myhLayoutContent-panel">
                            <Tabs
                                defaultActiveKey="1"
                                items={[
                                    {
                                        label: t.connectForm.mqttTab,
                                        key: "3",
                                        forceRender: true,
                                        children: (
                                            <Row
                                                className="ant-form-item"
                                                gutter={[
                                                    8,
                                                    {
                                                        xs: 2,
                                                        sm: 2,
                                                        md: 8,
                                                        lg: 8,
                                                    },
                                                ]}
                                            >
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={24}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="url"
                                                        className="ant-form-item-required"
                                                        title={t.connectForm.url}
                                                    >
                                                        {t.connectForm.url}
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={18}
                                                    lg={12}
                                                >
                                                    <Form.Item
                                                        name="url"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    t.connectForm
                                                                        .valUrlRequired,
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            autoComplete="off"
                                                            defaultValue={
                                                                "wss://cloud.smarteh.com:9002"
                                                            }
                                                            disabled={true}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={24}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="username"
                                                        title={t.connectForm.user}
                                                    >
                                                        {t.connectForm.user}
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item name="username">
                                                        <Input autoComplete="off" />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={24}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="password"
                                                        title={t.connectForm.password}
                                                    >
                                                        {t.connectForm.password}
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item name="password">
                                                        <Input.Password />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={24}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="clientId"
                                                        title={t.connectForm.clientId}
                                                    >
                                                        {t.connectForm.clientId}
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item name="clientId">
                                                        <Input autoComplete="off" />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="keepalive"
                                                        className="ant-form-item-required"
                                                        title={t.connectForm.keepAlive}
                                                    >
                                                        {t.connectForm.keepAlive}
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item
                                                        name="keepalive"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    t.connectForm
                                                                        .valKeepAlive,
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber autoComplete="off" />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="protocolVersion"
                                                        className="ant-form-item-required"
                                                        title={t.connectForm.protocolVersion}
                                                    >
                                                        {t.connectForm.protocolVersion}
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item
                                                        name="protocolVersion"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    t.connectForm
                                                                        .valProtocolVersion,
                                                            },
                                                        ]}
                                                    >
                                                        <Select<number>
                                                            style={{
                                                                width: 120,
                                                            }}
                                                            disabled={true}
                                                            defaultValue={5}
                                                            options={[
                                                                {
                                                                    value: 3,
                                                                    label: "MQIsdp 3.1",
                                                                },
                                                                {
                                                                    value: 4,
                                                                    label: "MQTT 3.1.1",
                                                                },
                                                                {
                                                                    value: 5,
                                                                    label: "MQTT 5.0",
                                                                },
                                                            ]}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="clean"
                                                        className="ant-form-item-required"
                                                        title={t.connectForm.cleanSession}
                                                    >
                                                        {t.connectForm.cleanSession}
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item
                                                        name="clean"
                                                        valuePropName="checked"
                                                    >
                                                        <Switch />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="connectTimeout"
                                                        className="ant-form-item-required"
                                                        title={t.connectForm.connectionTimeout}
                                                    >
                                                        {t.connectForm.connectionTimeout}
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item
                                                        name="connectTimeout"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    t.connectForm
                                                                        .valConnectTimeout,
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber autoComplete="off" />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    className="ant-form-item-label"
                                                >
                                                    <label
                                                        htmlFor="reconnectPeriod"
                                                        className="ant-form-item-required"
                                                        title={t.connectForm.reconnectPeriod}
                                                    >
                                                        {t.connectForm.reconnectPeriod}
                                                    </label>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    sm={18}
                                                    md={6}
                                                    lg={4}
                                                >
                                                    <Form.Item
                                                        name="reconnectPeriod"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    t.connectForm
                                                                        .valReconnect,
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber autoComplete="off" />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Col
                                                    xs={24}
                                                    sm={6}
                                                    md={6}
                                                    lg={8}
                                                ></Col>
                                                <Col
                                                    xs={24}
                                                    sm={18}
                                                    md={18}
                                                    lg={12}
                                                >
                                                    <Form.Item
                                                        name="will"
                                                        valuePropName="checked"
                                                    >
                                                        <Checkbox>
                                                            {t.connectForm.lastWill}
                                                        </Checkbox>
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />

                                                <Form.Item noStyle shouldUpdate>
                                                    {({ getFieldValue }) => {
                                                        const disabled =
                                                            !getFieldValue(
                                                                "will",
                                                            );

                                                        return (
                                                            <>
                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />
                                                                <Col
                                                                    xs={24}
                                                                    sm={6}
                                                                    md={6}
                                                                    lg={4}
                                                                    className="ant-form-item-label"
                                                                >
                                                                    <label
                                                                        htmlFor="willtopic"
                                                                        className="ant-form-item-required"
                                                                        title={t.connectForm.topic}
                                                                    >
                                                                        {t.connectForm.topic}
                                                                    </label>
                                                                </Col>
                                                                <Col
                                                                    xs={24}
                                                                    sm={18}
                                                                    md={18}
                                                                    lg={12}
                                                                >
                                                                    <Form.Item
                                                                        name="willtopic"
                                                                        rules={[
                                                                            {
                                                                                required:
                                                                                    !disabled,
                                                                                message:
                                                                                    t
                                                                                        .connectForm
                                                                                        .valWillTopic,
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            autoComplete="off"
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />

                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />
                                                                <Col
                                                                    xs={24}
                                                                    sm={6}
                                                                    md={6}
                                                                    lg={4}
                                                                    className="ant-form-item-label"
                                                                >
                                                                    <label
                                                                        htmlFor="willpayload"
                                                                        title={t.connectForm.payload}
                                                                    >
                                                                        {t.connectForm.payload}
                                                                    </label>
                                                                </Col>
                                                                <Col
                                                                    xs={24}
                                                                    sm={18}
                                                                    md={18}
                                                                    lg={12}
                                                                >
                                                                    <Form.Item name="willpayload">
                                                                        <Input
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            autoComplete="off"
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />

                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />
                                                                <Col
                                                                    xs={12}
                                                                    sm={6}
                                                                    md={6}
                                                                    lg={4}
                                                                    className="ant-form-item-label"
                                                                >
                                                                    <label
                                                                        htmlFor="willqos"
                                                                        className="ant-form-item-required"
                                                                        title={t.connectForm.qos}
                                                                    >
                                                                        {t.connectForm.qos}
                                                                    </label>
                                                                </Col>
                                                                <Col
                                                                    xs={12}
                                                                    sm={18}
                                                                    md={6}
                                                                    lg={4}
                                                                >
                                                                    <Form.Item
                                                                        name="willqos"
                                                                        rules={[
                                                                            {
                                                                                required:
                                                                                    !disabled,
                                                                                message:
                                                                                    t
                                                                                        .connectForm
                                                                                        .valWillQos,
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Select<QoS>
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            style={{
                                                                                width: 120,
                                                                            }}
                                                                            options={[
                                                                                {
                                                                                    value: 0,
                                                                                    label: "0",
                                                                                },
                                                                                {
                                                                                    value: 1,
                                                                                    label: "1",
                                                                                },
                                                                                {
                                                                                    value: 2,
                                                                                    label: "2",
                                                                                },
                                                                            ]}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    xs={12}
                                                                    sm={6}
                                                                    md={6}
                                                                    lg={4}
                                                                    className="ant-form-item-label"
                                                                >
                                                                    <label
                                                                        htmlFor="willretail"
                                                                        className="ant-form-item-required"
                                                                        title={t.connectForm.retain}
                                                                    >
                                                                        {t.connectForm.retain}
                                                                    </label>
                                                                </Col>
                                                                <Col
                                                                    xs={12}
                                                                    sm={18}
                                                                    md={6}
                                                                    lg={4}
                                                                >
                                                                    <Form.Item
                                                                        name="willretain"
                                                                        valuePropName="checked"
                                                                        rules={[
                                                                            {
                                                                                required:
                                                                                    !disabled,
                                                                                message:
                                                                                    t
                                                                                        .connectForm
                                                                                        .valWillRetain,
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Switch
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    xs={0}
                                                                    sm={0}
                                                                    md={0}
                                                                    lg={4}
                                                                />
                                                            </>
                                                        );
                                                    }}
                                                </Form.Item>
                                            </Row>
                                        ),
                                    },
                                    {
                                        label: t.connectForm.dashboardTab,
                                        key: "4",
                                        forceRender: true,
                                        children: (
                                            <Row
                                                gutter={[
                                                    8,
                                                    {
                                                        xs: 2,
                                                        sm: 2,
                                                        md: 8,
                                                        lg: 8,
                                                    },
                                                ]}
                                            >
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={16}
                                                >
                                                    <Form.Item
                                                        name="dashboard"
                                                        rules={[
                                                            {
                                                                validator: (
                                                                    _,
                                                                    value,
                                                                ) =>
                                                                    value?.data?.trim()
                                                                        ? Promise.resolve()
                                                                        : Promise.reject(
                                                                              new Error(
                                                                                  t
                                                                                      .connectForm
                                                                                      .valDashboardUpload,
                                                                              ),
                                                                          ),
                                                            },
                                                        ]}
                                                    >
                                                        <UploadRaw
                                                            accept=".jsx"
                                                            className="myhConnectionForm-dashboard"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                            </Row>
                                        ),
                                    },
                                    {
                                        label: t.connectForm.stylesTab,
                                        key: "5",
                                        forceRender: true,
                                        children: (
                                            <Row
                                                gutter={[
                                                    8,
                                                    {
                                                        xs: 2,
                                                        sm: 2,
                                                        md: 8,
                                                        lg: 8,
                                                    },
                                                ]}
                                            >
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={16}
                                                >
                                                    <Form.Item name="dashboardcss">
                                                        <UploadRaw
                                                            accept=".css"
                                                            className="myhConnectionForm-dashboardcss"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={0}
                                                    lg={4}
                                                />
                                            </Row>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </Layout.Content>
                </Layout>
            </Form>
        </>
    );
};
export default ConnectStored;
