import {Card, Typography} from "antd";
import {OperationAPI} from "@features/operations/types";
import {FC, useMemo} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {getCategoriesForSelect} from "@features/operations/utils";

type Props = {
    items: OperationAPI[];
}


ChartJS.register(ArcElement, Tooltip, Legend);

const backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];
const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ];


 const CategorySpentWidget: FC<Props> = ({items }) => {
    const data = useMemo(() => {
        const total = items.reduce((r: number, i: OperationAPI) => r + i.value, 0);
        const categoryItems = getCategoriesForSelect().map((category) => {
            const categoryTotal = (items.filter(i => i.category === category.value))
                .reduce((r: number, i: OperationAPI) => r + i.value, 0);
            return {
                category,
                total: categoryTotal,
            }
        }).filter(i => i.total > 0);

        console.log(categoryItems, total);
        return {
            labels: categoryItems.map(c => c.category.label),
            datasets: [
                {
                    label: '% трат в категории',
                    data: categoryItems.map(item => Math.round(100 / total * item.total)),
                    backgroundColor: categoryItems.map((_, index) => backgroundColors[index]),
                    borderColor: categoryItems.map((_, index) => borderColors[index]),
                    borderWidth: 1,
                },
            ],
        };
    }, [items]);

    console.log('xxx', data);
    return <Card>
        <Typography.Title level={3}>Траты по категориям</Typography.Title>
        <Pie data={data} />
    </Card>
}

export default CategorySpentWidget;