import {OperationCategory} from "@features/operations/types";
import React, {FC, useMemo} from "react";
import {Button, DatePicker, Form, Select, Space} from "antd";
import dayjs, {Dayjs} from "dayjs";
import {getCategoriesForSelect} from "@features/operations/utils";
import TransButton from "antd/es/_util/transButton";
import {CloseOutlined} from "@ant-design/icons";
const { RangePicker } = DatePicker;


type FilterData = {
    from: number,
    to: number,

    category: OperationCategory,
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
        console.log('xxx', formData);
    };

    const onSubmit = () => {
        form.submit();
    };

    const onChangeDatePicker = (date: Dayjs) => {
        if (date) {
            console.log('Date: ', date);
        } else {
            console.log('Clear');
        }
    };
    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };

    const categories = useMemo(() => getCategoriesForSelect(), []);

    return <Form form={form} layout="vertical" onChange={onValid} onFinish={onValid} autoComplete="off">
        <Space>
            <Form.Item
                name="category"
                label="Категория платежа"
            >
                <Select options={categories} placeholder="Еда"/>
            </Form.Item>
            <Form.Item
                name="category"
                label="Даты операций"
            >
                <RangePicker
                    presets={rangePresets}
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={onRangeChange}
                />
            </Form.Item>
            <Button
                type="default"
                icon={<CloseOutlined />}
                onClick={console.log}
            />
        </Space>
    </Form>
}