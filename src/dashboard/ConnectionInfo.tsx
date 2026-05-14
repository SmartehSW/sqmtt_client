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

import React from "react";
import SVGIcon from "../format/SVGIcon";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import {
    faCircleCheck,
    faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Typography, Button, Divider, Popover } from "antd";
import { useMQTTContext } from "../mqtt/MQTTHooks";
import { useAppDispatch } from "../app/hooks";
import { disconnect } from "../app/sliceConnection";

import "./ConnectionInfo.css";
import {
    ConnectedStatus,
    saveStoreConnectConnected,
} from "../connection/ConnectionInfo";
import type { MQTTStatus } from "../mqtt/MQTTContext";
import { useI18n } from "../i18n/LocaleProvider";

const { Text } = Typography;

type ConnectionInfoProps = {
    disconnectDisabled?: boolean;
};

const ConnectionInfo: React.FC<ConnectionInfoProps> = ({
    disconnectDisabled = false,
}) => {
    const [{ options, status }] = useMQTTContext();
    const dispatch = useAppDispatch();
    const { t } = useI18n();

    const {
        protocol,
        hostname,
        port,
        path,
        protocolId,
        protocolVersion,
        username,
        clientId,
    } = options;

    const { label, icon } =
        status === "Connected"
            ? {
                  label: options.hostname ?? "",
                  icon: (
                      <SVGIcon
                          icon={faCircleCheck}
                          style={{ color: "#52c41a" }}
                      />
                  ),
              }
            : {
                  label: t.mqttStatus[status as MQTTStatus] ?? status,
                  icon: (
                      <SVGIcon
                          icon={faCircleXmark}
                          style={{
                              color: "red",
                          }}
                      />
                  ),
              };

    let protocolVersionLabel;
    if (protocolVersion === 3) {
        protocolVersionLabel = "3.1";
    } else if (protocolVersion === 4) {
        protocolVersionLabel = "3.1.1";
    } else if (protocolVersion === 5) {
        protocolVersionLabel = "5.0";
    } else {
        protocolVersionLabel = "5.0";
    }

    const popover = (
        <>
            <div style={{ width: 280 }}>
                <Row wrap={false}>
                    <Col flex="120px">
                        <Text>{t.connectionInfo.userName}</Text>
                    </Col>
                    <Col flex="auto">
                        <Text type="secondary" strong>
                            {username}
                        </Text>
                    </Col>
                </Row>
                <Row wrap={false}>
                    <Col flex="120px">
                        <Text>{t.connectionInfo.protocol}</Text>
                    </Col>
                    <Col flex="auto">
                        <Text type="secondary" strong>
                            {protocol}
                        </Text>
                    </Col>
                </Row>
                <Row wrap={false}>
                    <Col flex="120px">
                        <Text>{t.connectionInfo.hostName}</Text>
                    </Col>
                    <Col flex="auto">
                        <Text type="secondary" strong>
                            {hostname}
                        </Text>
                    </Col>
                </Row>
                <Row wrap={false}>
                    <Col flex="120px">
                        <Text>{t.connectionInfo.port}</Text>
                    </Col>
                    <Col flex="auto">
                        <Text type="secondary" strong>
                            {port}
                        </Text>
                    </Col>
                </Row>
                <Row wrap={false}>
                    <Col flex="120px">
                        <Text>{t.connectionInfo.path}</Text>
                    </Col>
                    <Col flex="auto">
                        <Text type="secondary" strong>
                            {path}
                        </Text>
                    </Col>
                </Row>
                <Row wrap={false}>
                    <Col flex="120px">
                        <Text>{t.connectionInfo.mqttProtocol}</Text>
                    </Col>
                    <Col flex="auto">
                        <Text type="secondary" strong>
                            {protocolId} {protocolVersionLabel}
                        </Text>
                    </Col>
                </Row>
                <Row wrap={false}>
                    <Col flex="120px">
                        <Text>{t.connectionInfo.clientId}</Text>
                    </Col>
                    <Col flex="auto">
                        <Text type="secondary" strong>
                            {clientId}
                        </Text>
                    </Col>
                </Row>
            </div>
            {!disconnectDisabled && (
                <>
                    <Divider />
                    <Button
                        type="primary"
                        icon={<SVGIcon icon={faPowerOff} />}
                        onClick={() => {
                            saveStoreConnectConnected(
                                ConnectedStatus.DISCONNECTED,
                            );
                            dispatch(disconnect());
                        }}
                    >
                        {t.connectionInfo.disconnect}
                    </Button>
                </>
            )}
        </>
    );

    return (
        <Popover placement="bottomRight" content={popover} trigger="click">
            <Button type="text">
                <span style={{ color: "darkgray" }}>{label}</span>
                <span className="connectioninfo-buttonicon">{icon}</span>
            </Button>
        </Popover>
    );
};

export default ConnectionInfo;
