/*
SmartehMqtt
Copyright (C) 2021-2024 Adrián Romero
GNU GPL v3
*/

import React, { useState, ReactNode } from "react";
import { Buffer } from "buffer";
import mqtt from "mqtt";
import type { QoS } from "mqtt-packet";
import {
    MqttClient,
    IClientSubscribeOptions,
    IClientPublishOptions,
    IPublishPacket,
} from "mqtt";
import match from "mqtt-match";

import type {
    MQTTStatus,
    MQTTConnectInfo,
    MQTTContextValue,
    MQTTMessage,
    SubscribeHandler,
} from "./MQTTContext";
import { MQTTContext } from "./MQTTContext";

const MQTTProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<{
        status: MQTTStatus;
        error?: Error;
        client?: MqttClient;
        _subscriptions: SubscribeHandler[];
    }>({
        status: "Disconnected",
        _subscriptions: [],
    });

    const pubsubTopic = (topic: string): string => {
        const clientoptions = state.client?.options;
        return topic
            .replace("$[clientId]", clientoptions?.clientId ?? "$[clientId]")
            .replace("$[username]", clientoptions?.username ?? "$[username]");
    };

    const disconnect = () => {
        state.client?.end();
        state.client?.removeAllListeners();
        setState(s => ({
            status: "Disconnected",
            _subscriptions: s._subscriptions,
        }));
    };

    const connect = ({ url, options }: MQTTConnectInfo) => {
        disconnect();

        try {
            const client: MqttClient = mqtt.connect(url, {
                ...options,
                rejectUnauthorized: false,
            });

            client.on("connect", () =>
                setState(s => ({
                    status: "Connected",
                    client: s.client,
                    _subscriptions: s._subscriptions,
                })),
            );

            client.on("error", () =>
                setState(s => ({
                    status: "Error",
                    client: s.client,
                    _subscriptions: s._subscriptions,
                })),
            );

            client.on("reconnect", () =>
                setState(s => ({
                    status: "Reconnecting",
                    client: s.client,
                    _subscriptions: s._subscriptions,
                })),
            );

            client.on("close", () =>
                setState(s => ({
                    status: "Closed",
                    client: s.client,
                    _subscriptions: s._subscriptions,
                })),
            );

            client.on("offline", () =>
                setState(s => ({
                    status: "Offline",
                    client: s.client,
                    _subscriptions: s._subscriptions,
                })),
            );

            client.on("disconnect", () =>
                setState(s => ({
                    status: "Disconnecting",
                    client: s.client,
                    _subscriptions: s._subscriptions,
                })),
            );

            client.on(
                "message",
                (topic: string, message: Buffer, packet: IPublishPacket) => {
                    const raw = message.toString("utf8");

                    let value: string | undefined;
                    let options:
                        | { qos?: QoS; retainValue?: boolean }
                        | undefined;

                    try {
                        const parsed = JSON.parse(raw);
                        if (parsed && typeof parsed === "object") {
                            value =
                                parsed.value !== undefined &&
                                parsed.value !== null
                                    ? String(parsed.value)
                                    : undefined;

                            if (parsed.options) {
                                options = {
                                    qos: parsed.options.qos,
                                    retainValue: parsed.options.retain,
                                };
                            }
                        }
                    } catch {
                        value = raw;
                    }

                    state._subscriptions.forEach(subs => {
                        if (match(subs.topic, topic)) {
                            const legacyMessage =
                                value !== undefined
                                    ? Buffer.from(value, "utf8")
                                    : message;

                            subs.listener({
                                topic,
                                message: legacyMessage,
                                value,
                                options,
                                time: Date.now(),
                                qos: packet.qos,
                                retain: packet.retain,
                                dup: packet.dup,
                            });
                        }
                    });
                },
            );

            setState(s => {
                s._subscriptions.length = 0;
                return {
                    status: "Connecting",
                    client,
                    _subscriptions: s._subscriptions,
                };
            });
        } catch (error) {
            setState(s => ({
                status: "Error",
                error:
                    error instanceof Error
                        ? error
                        : new Error("Unknown MQTT connection error."),
                client: s.client,
                _subscriptions: s._subscriptions,
            }));
        }
    };

    const subscribe = (
        subtopic: string,
        listener: (mqttmessage: MQTTMessage) => void,
        options?: IClientSubscribeOptions,
    ): SubscribeHandler | null => {
        const topic = pubsubTopic(subtopic);
        if (state.client && topic !== "") {
            const handler = { topic, listener };
            state._subscriptions.push(handler);
            if (
                !state._subscriptions.some(
                    s => s !== handler && s.topic === topic,
                )
            ) {
                state.client.subscribe(topic, options || { qos: 0 });
            }
            return handler;
        }
        return null;
    };

    const unsubscribe = (handler: SubscribeHandler | null) => {
        if (state.client && handler) {
            const inx = state._subscriptions.findIndex(s => s === handler);
            if (inx < 0) throw new Error("Not subscribed");

            state._subscriptions.splice(inx, 1);
            if (!state._subscriptions.some(s => s.topic === handler.topic)) {
                state.client.unsubscribe(handler.topic);
            }
        }
    };

    const publish = (
        pubtopic: string,
        message: Buffer | string,
        options?: IClientPublishOptions,
    ) => {
        const topic = pubsubTopic(pubtopic);
        if (!state.client?.connected || !topic) {
            throw new Error("Not connected");
        }

        const value =
            typeof message === "string" ? message : message.toString("utf8");

        const payload = {
            value,
            options: {
                qos: options?.qos,
                retainValue: options?.retain ? "true" : "false",
            },
        };
        
        state.client.publish(topic, JSON.stringify(payload), {
            qos: options?.qos ?? 0,
            retain: options?.retain ?? false,
        });
    };

    const clientoptions = state.client?.options;

    const contextValue: MQTTContextValue = [
        {
            status: state.status,
            error: state.error,
            ready: !!state.client,
            connected: state.client?.connected || false,
            options: {
                protocol: clientoptions?.protocol,
                hostname: clientoptions?.hostname,
                port: clientoptions?.port,
                path: clientoptions?.path,
                protocolId: clientoptions?.protocolId,
                protocolVersion: clientoptions?.protocolVersion,
                username: clientoptions?.username,
                clientId: clientoptions?.clientId,
            },
        },
        {
            brokerconnect: connect,
            brokerdisconnect: disconnect,
            subscribe,
            unsubscribe,
            publish,
        },
    ];

    return (
        <MQTTContext.Provider value={contextValue}>
            {children}
        </MQTTContext.Provider>
    );
};

export default MQTTProvider;
