import { Card, CardContent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    YAxis,
} from 'recharts';
import { URL } from '../../../constants/URL';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import {
    countEarnings,
    countTransactionsAmount,
} from '../../../helpers/statsCalculations';
import { getAccessToken } from '../../../helpers/tokensHelpers';
import { getAllProducts } from '../../../services/productApiService';
import { getUsersList } from '../../../services/userApiService';
import { Bootstrap } from '../../../store';
import { IProduct } from '../../../store/interfaces';
import { TotalStats } from './TotalStats';

const CustomTooltip = ({
    active,
    payload,
}: {
    payload?: any;
    active?: boolean;
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">
                    {payload[0]?.payload?.name} |{' '}
                    {payload[0]?.payload?.['Transactions']}
                </p>
            </div>
        );
    }

    return null;
};

const RADIAN = Math.PI / 180;

const COLORS = ['#26d7ff', '#fa1933', '#28fa19', '#d9d900'];

export const Stats = observer(() => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [usersAmount, setUsersAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const categoryStats = useMemo(() => {
        if (!products) {
            return [];
        }

        return Bootstrap.navItems.map((category) => ({
            name: category,
            ['Transactions']: countTransactionsAmount(
                products.filter(
                    (product) =>
                        product.category.toLowerCase() ===
                        category.toLowerCase()
                )
            ),
        }));
    }, [products]);

    const productsStats = useMemo(() => {
        if (!products) {
            return [];
        }

        return products
            .filter((product) => !!product.transactionsAmount)
            .map((product) => ({
                label: product.title,
                name: product.title,
                ['Transactions']: product.transactionsAmount,
            }));
    }, [products]);

    const renderCustomizedLabel = useCallback(
        ({ cx, cy, midAngle, innerRadius, percent }) => {
            const radius = innerRadius + 50;
            const x = cx + radius * Math.cos(-midAngle * RADIAN) - 10;
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={'start'}
                    dominantBaseline="central"
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        },
        [categoryStats]
    );

    const fetchInfo = async () => {
        try {
            setIsLoading(true);

            const token = getAccessToken();
            const [{ data: fetchProducts }, { data: fetchUsers }] =
                await Promise.all([
                    getAllProducts(null, token),
                    getUsersList(null, token),
                ]);

            setProducts(fetchProducts.products);
            setUsersAmount(fetchUsers.users.length);
        } catch (error) {
            toast.error(requestErrorMessage(error));

            navigate(URL.HOME);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className="stats">
            <h2 className="stats__title">Statistics</h2>
            <TotalStats
                totalEarns={countEarnings(products)}
                totalProducts={products.length}
                totalTransactions={countTransactionsAmount(products)}
                usersAmount={usersAmount}
            />
            <div className="stats__chart-container">
                <Card className="stats__chart-products">
                    <CardContent>
                        <h3 className="stats__chart__title">
                            Products transactions
                        </h3>
                        <div className="stats__chart">
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={productsStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="Transactions"
                                        fill="#8884d8"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <h3 className="stats__chart__title">
                            Transactions amount per Category
                        </h3>
                        <div className="stats__chart">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart data={categoryStats}>
                                    <Pie
                                        data={categoryStats}
                                        dataKey="Transactions"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#82ca9d"
                                        label={renderCustomizedLabel}
                                        fillRule="evenodd"
                                        labelLine={false}
                                        legendType="circle"
                                    >
                                        {categoryStats.map((entry, index) => (
                                            <Cell
                                                fill={COLORS[index]}
                                                key={index}
                                            />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Helmet>
                <title>VVMig | Statistics</title>
            </Helmet>
        </div>
    );
});
