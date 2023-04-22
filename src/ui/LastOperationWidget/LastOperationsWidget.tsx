import {Card, List, Typography} from "antd";
import {OperationAPI} from "@features/operations/types";
import {FC} from "react";
import {getCurrencyValue} from "@features/operations/utils";

type Props = {
    items: OperationAPI[];
}
export const LastOperationsWidget: FC<Props> = ({items}) => {
    return <Card>
        <Typography.Title level={3}>Последние 3 операции</Typography.Title>
        <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        title={`${getCurrencyValue(item.value)} ${item.name}`}
                        description={item.date}
                    />
                </List.Item>
            )}
        />
    </Card>
}