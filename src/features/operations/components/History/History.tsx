import React, {FC, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {List} from "antd";
import {HistoryHeader} from "../HistoryHeader/HistoryHeader";
import {HistoryListItem} from "../HistoryListItem/HistoryListItem";
import {getOperationsWithCards} from "../../selectors";

import styles from './History.module.css';
import {HistoryFooter} from "@features/operations/components/HistoryFooter/HistoryFooter";
import {Filter, FilterData} from "@features/operations/components/Filter/Filter";
import dayjs from "dayjs";
import {DAY_FORMAT} from "@features/operations/consts";

interface Props {
}

export const History: FC<Props> = () => {
    const operations = useSelector(getOperationsWithCards);
    const [filter, setFilter] = useState<FilterData>({});

    const data = useMemo(() => {
        let data = operations;
        if (filter.category) {
            data = data.filter(i => i.category === filter.category);
        }
        if (filter.from) {
            data = data.filter((item) => {
                if (filter.from) {
                    return dayjs(item.date, DAY_FORMAT).unix() >= filter.from;
                }
                return true;
            })
        }

        if (filter.to) {
            data = data.filter((item) => {
                if (filter.to) {
                    return dayjs(item.date, DAY_FORMAT).unix() <= filter.to;
                }
                return true;
            })
        }
        return data;
    }, [operations, filter]);

    return (
        <section>
            <HistoryHeader/>

            <Filter onChange={setFilter}/>

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
