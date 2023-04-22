import React, {FC, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, Form, Input, message, Select, DatePicker} from "antd";
import {OperationCategory, OperationWithCard} from "../../types";
import {updateOperation, addOperation} from "../../actions";
import {Dispatch} from "@core/store/store";
import {getCards} from "../../../cards/selectors";
import {OperationSaveData} from "@core/api/api";
import dayjs, {Dayjs} from "dayjs";
import {DAY_FORMAT} from "@features/operations/consts";
import {getCategoriesForSelect} from "@features/operations/utils";

interface Props {
    isOpenModal: boolean;
    closeModal: () => any;
    operation?: OperationWithCard
}

interface OperationFormData {
    name: string;
    value: string;
    cardId: string;

    category: string;
    date: Dayjs;
}

export const HistoryModal: FC<Props> = ({
                                            isOpenModal,
                                            closeModal,
                                            operation
                                        }) => {
    const dispatch = useDispatch<Dispatch>();
    const cards = useSelector(getCards);
    const [form] = Form.useForm();

    const id = operation?.id;

    const onCancel = () => {
        form.resetFields();
        closeModal();
    };

    const onValid = () => {
        const formData = form.getFieldsValue() as OperationFormData;
        const data: OperationSaveData = {
            name: formData.name,
            value: parseFloat(formData.value),
            cardId: formData.cardId,
            category: formData.category as OperationCategory,
            date: formData.date.format(DAY_FORMAT),
        };

        console.log('data', data);

        if (operation?.id) {
            dispatch(updateOperation(operation.id, data)).then(() => {
                message.success("Операция обновлена!");
                onCancel();
            });
        } else {
            dispatch(addOperation(data)).then(() => {
                message.success("Операция сохранена!");
                onCancel();
            });
        }
    };

    const onSubmit = () => {
        form.submit();
    };

    const categories = useMemo(() => getCategoriesForSelect(), []);


    return (
        <Modal
            title={id ? `Редактирование операции` : `Новая операция`}
            visible={isOpenModal}
            onOk={onSubmit}
            onCancel={onCancel}
            okText="Сохранить"
            cancelText="Отменить"
            closable
        >
            <Form form={form} layout="vertical" onFinish={onValid} autoComplete="off">
                <Form.Item
                    name="name"
                    label="Название платежа"
                    initialValue={operation?.name || ''}
                    rules={[{required: true}]}
                >
                    <Input placeholder="Продукты"/>
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Категория платежа"
                    initialValue={operation?.category || ''}
                    rules={[{required: true}]}
                >
                    <Select options={categories} placeholder="Еда"/>
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Дата платежа"
                    initialValue={operation?.date ? dayjs(operation?.date, DAY_FORMAT): dayjs()}
                    rules={[{required: true}]}
                >
                    <DatePicker format={DAY_FORMAT}/>
                </Form.Item>
                <Form.Item
                    name="cardId"
                    label="Карта"
                    initialValue={operation?.cardId || null}
                    rules={[{required: true}]}
                >
                    <Select placeholder="Выберите карту"
                            options={cards.map((c) => ({value: c.id, label: c.number}))}
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    name="value"
                    label="Сумма ₽"
                    initialValue={operation?.value || 0}
                    rules={[{required: true}]}
                >
                    <Input placeholder="Сумма в рублях"/>
                </Form.Item>
            </Form>
        </Modal>
    );
};
