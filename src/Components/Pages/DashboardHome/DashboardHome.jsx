import { Helmet } from "react-helmet-async";
import useDashboardStats from "../../Hooks/useDashboardStats";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DashboardHome = () => {
    const [statistic, refetch, isPending, isError] = useDashboardStats();

    // Colors For Charts
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    // Settings For Pie Charts.
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    // Settings For Bar Charts.
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };



    return (
        <section className="max-h-screen min-h-screen overflow-y-auto px-6 pt-20 pb-10 bg-[#FAFAFA] dark:bg-base-300">
            <Helmet>
                <title>GS Seller Center | Dashboard</title>
            </Helmet>
            <p className='my-6 font-bold text-lg dark:text-white'>Dashboard Overview</p>
            <div className=''>
                {isPending || isError ?
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
                        <div className="skeleton dark:bg-gray-950 h-40"></div>
                        <div className="skeleton dark:bg-gray-950 h-40"></div>
                        <div className="skeleton dark:bg-gray-950 h-40"></div>
                    </div>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
                        <div className='rounded-lg text-white text-center bg-teal-500 px-4 py-8'>
                            <svg className='m-auto text-3xl' stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 5l-8-4-8 4 8 4 8-4zM8 2.328l5.345 2.672-5.345 2.672-5.345-2.672 5.345-2.672zM14.398 7.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199zM14.398 10.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199z"></path>
                            </svg>
                            <p className='text-l mt-2 mb-1'>Today Order</p>
                            <h4 className='text-2xl font-bold'>${statistic?.todayRevenue.toFixed(2)}</h4>
                        </div>
                        <div className='rounded-lg text-white text-center bg-blue-500 px-4 py-8'>
                            <svg className='m-auto text-3xl' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <p className='text-l mt-2 mb-1'>This Month</p>
                            <h4 className='text-2xl font-bold'>${statistic?.thisMonthRevenue.toFixed(2)}</h4>
                        </div>
                        <div className='rounded-lg text-white text-center bg-green-600 px-4 py-8'>
                            <svg className='m-auto text-3xl' stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path>
                            </svg>
                            <p className='text-l mt-2 mb-1'>Total Order</p>
                            <h4 className='text-2xl font-bold'>${statistic?.allTimeRevenue.toFixed(2)}</h4>
                        </div>
                    </div>
                }
            </div>
            <div className=''>
                {isPending || isError ?
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                        <div className="skeleton bg-gray-950 h-20"></div>
                        <div className="skeleton bg-gray-950 h-20"></div>
                        <div className="skeleton bg-gray-950 h-20"></div>
                        <div className="skeleton bg-gray-950 h-20"></div>
                    </div>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                        <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
                            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    <span>Total Order</span>
                                </p>
                                <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">{statistic?.totalOrders}</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
                            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    <span>Order Pending</span>
                                    {/* <span className="text-red-400 text-sm font-semibold">(20854.60)</span> */}
                                </p>
                                <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">{statistic?.pendingOrders}</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
                            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    <span>Order Processing</span>
                                </p>
                                <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">{statistic?.processingOrders}</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
                            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500">
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    <span>Order Delivered</span>
                                </p>
                                <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">{statistic?.deliveredOrders}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isPending || isError ?
                    <div className=''>
                        <div className="skeleton bg-gray-950 h-[400px]"></div>
                    </div>
                    :
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer>
                            <BarChart
                                data={statistic?.statusCounts}
                                margin={{
                                    top: 20,
                                    right: 10,
                                    left: -25,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 2" />
                                <XAxis dataKey="status" />
                                <YAxis />
                                <Bar dataKey="count" fill="red" shape={<TriangleBar />} label={{ position: 'top' }}>
                                    {statistic?.statusCounts?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                    ))}
                                </Bar>
                                <Tooltip labelStyle={{ color: "green" }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                }
                {isPending || isError ?
                    <div className=''>
                        <div className="skeleton bg-gray-950 h-[400px]"></div>
                    </div>
                    :
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={statistic?.methodRevenue}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="totalAmount"
                                >
                                    {statistic?.methodRevenue?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                }
            </div>
        </section>
    );
};

export default DashboardHome;