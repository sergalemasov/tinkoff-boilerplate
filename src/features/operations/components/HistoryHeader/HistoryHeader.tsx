import React, { FC, useState } from "react";
import { Typography, Button } from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { HistoryModal } from "../HistoryModal/HistoryModal";

import styles from './HistoryHeader.module.css';

interface Props {}

export const HistoryHeader: FC<Props> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <header className={styles.header}>
        <Typography.Title level={3}>История операций</Typography.Title>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={showModal}
        />
      </header>

      <HistoryModal closeModal={closeModal} isOpenModal={isModalVisible} />
    </>
  );
};
