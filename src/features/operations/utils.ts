import {OperationAPI, OperationCategory} from "@features/operations/types";

export const getOperationTitle = (op: OperationAPI) => {
    return `${op.name} [${OperationCategory[op.category]}]`
}

export const getCurrencyValue = (value: number) => {
    return value.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0
    });
}

export const getCategoriesForSelect = () => {
    return [
        {value: OperationCategory.food, label: 'Еда'},
        {value: OperationCategory.avto, label: 'Авто'},
        {value: OperationCategory.house, label: 'ЖКХ'},
        {value: OperationCategory.transfers, label: 'Переводы'},
        {value: OperationCategory.other, label: 'Остальное'},
    ]
}