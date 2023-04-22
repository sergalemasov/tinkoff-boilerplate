import React, {FC} from "react";
import {useSelector} from "react-redux";
import {List} from "antd";
import {HistoryHeader} from "../HistoryHeader/HistoryHeader";
import {HistoryListItem} from "../HistoryListItem/HistoryListItem";
import {getOperationsWithCards} from "../../selectors";

import styles from './History.module.css';
import {HistoryFooter} from "@features/operations/components/HistoryFooter/HistoryFooter";
import {Filter} from "@features/operations/components/Filter/Filter";

interface Props {
}

export const History: FC<Props> = () => {
    const data = useSelector(getOperationsWithCards);
    console.log('operations with data', data);


    return (
        <section>
            <HistoryHeader/>

            <Filter onChange={console.log}/>

            <div className={styles.list}>
                <List
                    size="small"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <HistoryListItem
                            operation={item}
                        />
                    )}
                />
            </div>

            <HistoryFooter operations={data}/>
        </section>
    );
};
