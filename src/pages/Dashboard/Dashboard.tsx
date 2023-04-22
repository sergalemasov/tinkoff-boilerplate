import {lazy, Suspense} from 'react';
import {useSelector} from "react-redux";
import {getOperations} from "@features/operations/selectors";
import {useMemo} from "react";
import dayjs from "dayjs";
import {LastOperationsWidget} from "../../ui/LastOperationWidget/LastOperationsWidget";

import styles from './Dashboard.module.css';
import {Spin} from "antd";

const CategorySpentWidget = lazy(() => import('../../ui/CategorySpentWidget/CategorySpentWidget'));

export const Dashboard = () => {
    const operations = useSelector(getOperations);
    const last3Operations = useMemo(() => {
        const tmp = [...operations];
        tmp.sort((a,b) => dayjs(b.date).unix() - dayjs(a.date).unix());
        console.log(tmp);
        return tmp.slice(0, 3);
    }, [operations]);

    console.log('last3Operations', last3Operations)
    return <div className={styles.dashboard}>
        <LastOperationsWidget items={last3Operations} />
        <Suspense fallback={<Spin />}>
            <CategorySpentWidget items={operations} />
        </Suspense>
    </div>
}