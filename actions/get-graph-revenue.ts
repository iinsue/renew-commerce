import db from "@/lib/prismadb";

type Props = {
  name: string;
  total: number;
};

export const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += Number(item.product.price);
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: Props[] = [
    { name: "1월", total: 0 },
    { name: "2월", total: 0 },
    { name: "3월", total: 0 },
    { name: "4월", total: 0 },
    { name: "5월", total: 0 },
    { name: "6월", total: 0 },
    { name: "7월", total: 0 },
    { name: "8월", total: 0 },
    { name: "9월", total: 0 },
    { name: "10월", total: 0 },
    { name: "11월", total: 0 },
    { name: "12월", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
