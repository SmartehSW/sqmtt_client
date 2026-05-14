/*
MYHELLOIOT
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
import { Form, Input, Button, Row, Col, Layout, Tabs } from "antd";
import { useAppDispatch } from "../app/hooks";
import { connect, loadConnectionCredentials } from "../app/sliceConnection";
import {
    ConnectCredentials,
    ConnectInfo,
    ConnectedStatus,
    saveStoreConnectConnected,
    saveStoreConnectCredentials,
} from "./ConnectionInfo";
import { ConnectInfoForm } from "./ConnectInfoForm";
import ModalError from "../ModalError";
import AppHeader from "../AppHeader";
import "./ContentConnect.css";
import SVGIcon from "../format/SVGIcon";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useI18n, LanguageSelect } from "../i18n/LocaleProvider";

type ModalErrorInfo = {
    title: string;
    errorMessage: string;
    visible: boolean;
};

const ConnectRemote: React.FC<{
    connectInfo: ConnectInfo;
    connectCredentials: ConnectCredentials;
}> = ({ connectInfo, connectCredentials }) => {
    const [form] = Form.useForm<ConnectInfoForm>();
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
                    const connectCredentialsNew: ConnectCredentials = {
                        username: connectInfoForm.username,
                        password: connectInfoForm.password,
                    };

                    try {
                        saveStoreConnectCredentials(connectCredentialsNew);
                        saveStoreConnectConnected(ConnectedStatus.CONNECTED);
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
                    <AppHeader title={t.connectForm.headerDashboardConnection}>
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
                                        key: "2",
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
                                                            disabled
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
                                                        <Input
                                                            autoComplete="off"
                                                            disabled
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col
                                                    xs={0}
                                                    sm={0}
                                                    md={12}
                                                    lg={12}
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
export default ConnectRemote;
