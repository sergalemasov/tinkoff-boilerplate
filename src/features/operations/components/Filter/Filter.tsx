import {OperationCategory} from "@features/operations/types";
import React, {FC, useCallback, useMemo} from "react";
import {Button, DatePicker, Form, Select, Space} from "antd";
import dayjs, {Dayjs} from "dayjs";
import {getCategoriesForSelect} from "@features/operations/utils";
import {CloseOutlined} from "@ant-design/icons";
const { RangePicker } = DatePicker;


export type FilterData = {
    from?: number,
    to?: number,

    category?: OperationCategory,
}

type Props = {
    onChange: (data: FilterData) => void
}

const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
}[] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];

export const Filter:FC<Props> = ({onChange}) => {
    const [form] = Form.useForm();
    const onValid = () => {
        const formData = form.getFieldsValue();
        const data:FilterData = {
            category: formData.category,
            from: formData?.dates?.[0]?.unix(),
            to: formData?.dates?.[1]?.unix(),
        }
        console.log('xxx', formData, data);
        onChange(data);
    };
    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };

    const clearForm = useCallback(() => {
        form.resetFields();
        onChange({})
    }, [form, onChange])

    const categories = useMemo(() => getCategoriesForSelect(), []);

    return <Form form={form} layout="vertical" onFieldsChange={onValid} onFinish={onValid} autoComplete="off">
        <Space>
            <Form.Item
                name="category"
                label="Категория платежа"
            >
                <Select options={categories} placeholder="Еда"/>
            </Form.Item>
            <Form.Item
                name="dates"
                label="Даты операций"
            >
                <RangePicker
                    presets={rangePresets}
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={onRangeChange}
                />
            </Form.Item>
            <Form.Item label={' '}>
                <Button
                    type="default"
                    icon={<CloseOutlined />}
                    onClick={clearForm}
                />
            </Form.Item>
        </Space>
    </Form>
}