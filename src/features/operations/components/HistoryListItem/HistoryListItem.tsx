import React, {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {Typography, List, Dropdown, Menu, Button, Modal} from "antd";
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined";
import {HistoryModal} from "../HistoryModal/HistoryModal";
import {deleteOperation} from "../../actions";
import {Dispatch} from "@core/store/store";

import styles from './HistoryListItem.module.css';
import {OperationWithCard} from "@features/operations/types";
import {getCurrencyValue} from "@features/operations/utils";

interface Props {
    operation: OperationWithCard
}

export const HistoryListItem: FC<Props> = ({operation}) => {
    const dispatch = useDispatch<Dispatch>();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const showEditModal = () => {
        setIsEditModalVisible(true);
    };

    const closeEditModal = () => {
        setIsEditModalVisible(false);
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: "Удалить операцию?",
            icon: <ExclamationCircleOutlined/>,
            content: "Отменить удаление будет невозможно",
            cancelText: "Отменить",
            okText: "Удалить",
            onOk() {
                return dispatch(deleteOperation(operation.id));
            },
            onCancel() {
            }
        });
    };

    return (
        <>
            <List.Item>
                <List.Item.Meta
                    avatar={
                        <div className={styles.avatar}
                             style={{backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`}}></div>
                    }
                    title={operation.name}
                    description={operation.card?.number || 'карта закрыта'}
                />
                <div className={styles.data}>
                    <Typography.Text type={"secondary"}>
                        {operation.category}
                    </Typography.Text>
                </div>
                <div className={styles.data}>
                    <Typography.Text type={"secondary"}>
                        {operation.date}
                    </Typography.Text>
                </div>
                <div className={styles.extra}>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key="1" onClick={showEditModal}>
                                    Изменить
                                </Menu.Item>
                                <Menu.Item key="2" danger onClick={showDeleteConfirm}>
                                    Удалить
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button size="small" shape="circle" icon={<EllipsisOutlined/>}/>
                    </Dropdown>
                    <Typography.Text type={"secondary"}>
                        {getCurrencyValue(operation.value)}
                    </Typography.Text>
                </div>
            </List.Item>

            <HistoryModal
                key={JSON.stringify(operation)}
                operation={operation}
                closeModal={closeEditModal}
                isOpenModal={isEditModalVisible}
            />
        </>
    );
};
