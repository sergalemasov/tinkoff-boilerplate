import React, {useCallback, useEffect, useState} from 'react';

import {
    Link,
    Outlet,
    useNavigate,
} from "react-router-dom";
import {
    CreditCardOutlined, DashboardOutlined,
    TransactionOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu, Spin, theme} from 'antd';
import {fetchOperaions} from "@features/operations/actions";
import {fetchCards} from "@features/cards/actions";
import {useDispatch} from "react-redux";
import {Dispatch} from "@core/store/store";

const {Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number] & {
    href?: string;
};

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    href?: string,
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        href,
    } as MenuItem;
}

const items: MenuItem[] = [
    // todo импортировать роуты и строить динамически
    getItem('Дашборд', '1', <DashboardOutlined/>, undefined, '/'),
    getItem('Карточки', '2', <CreditCardOutlined/>, undefined, '/cards'),
    getItem('Операции', '3', <TransactionOutlined/>, undefined, '/operations'),

];

export const LayoutView = () => {
    const dispatch = useDispatch<Dispatch>();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        Promise.all([
            dispatch(fetchOperaions()),
            dispatch(fetchCards())
        ]).finally(() => setLoading(false));
    }, [dispatch]);

    const onMenuClick = useCallback((data: any) => {
        const nextHref = items.find(i => i.key === data.key)?.href || '/';
        return navigate(nextHref);
    }, [navigate])

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value: any) => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onMenuClick}/>
            </Sider>
            <Layout className="site-layout">
                <Content style={{margin: '16px 16px'}}>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                        {loading ? <Spin size={'large'} /> :  <Outlet/>}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}><Link target={'_blank'} to={'https://t.me/antonrez'}>@antonrez</Link></Footer>
            </Layout>
        </Layout>
    );
};
