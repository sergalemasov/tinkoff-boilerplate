import React from "react";
import {CardsList} from "@features/cards/components/CardsList/CardsList";
import {Button, Typography} from "antd";
import {CardModal} from "@features/cards/components/CardModal/CardModal";
import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";

import styles from './Cards.module.css';

export const Cards = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        console.log('click')
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };
    return <div>
        <div className={styles.header}>
            <Typography.Title>Карточки</Typography.Title>
            <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<PlusOutlined />}
                onClick={showModal}
            />
        </div>

        <div>
            <CardsList />
        </div>

        <CardModal closeModal={closeModal} isOpenModal={isModalVisible} />
    </div>
}