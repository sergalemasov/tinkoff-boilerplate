import {OperationWithCard} from "@features/operations/types";
import {FC, useMemo} from "react";
import {Typography} from "antd";
import {getCurrencyValue} from "@features/operations/utils";

type Props = {
    operations: OperationWithCard[];
}
export const HistoryFooter: FC<Props> = ({operations}) => {
    const total = useMemo(() => operations.reduce((r: number, i) => r + i.value, 0), [operations]);
    return <Typography.Title level={3}>Итого: {getCurrencyValue(total)}</Typography.Title>
}