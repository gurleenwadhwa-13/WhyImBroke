import { getUser } from "@/actions/users/fetch-user";
import getDashboardSummary from "@/actions/dashboard/get-dashboard-summary";
import { TileWidgets } from "@/components/Dashboard/tile-widgets";
// import AccountLineChart from "@/components/AccountGraphs/account-line-chart"
import { RecentTransactionsSummary } from "@/components/Dashboard/recent-transactions";
// import { MonthlySpendingPieChart } from "@/components/Dashboard/monthly-spending-piechart"
import { toast } from "sonner";
import { MonthlySpendingPieChart } from "@/components/Dashboard/monthly-spending-piechart";

export default async function DashboardPage() {
  const { success } = await getUser();
  if (!success) {
    toast.error("Failed to fetch user");
  }

  const { data } = await getDashboardSummary();
  // const { data } = await getMonthlySpendingData();

  return (
    <>
      <div>
        {/* Dashboard Overview */}
        <div className="border-b border-border p-3">
          <div className="flex flex-row items-center justify-between">
            <div className="w-[50%]">
              <h1 className="text-3xl font-bold text-foreground">Overview</h1>
              <p className="text-muted-foreground mt-1">
                {" "}
                Accounts Metrics and monthly spending data
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-auto flex-col gap-4 p-1 pt-1">
          <div className="flex flex-col gap-3 justify-between md:flex-row lg:flex-row flex-wrap">
            {/* Tile 1: Networth Metric - showing a 30 day change if we upped or downed */}
            <TileWidgets
              description="Net Worth"
              trend="up"
              displayAmount={data?.metrics.networth}
            />

            {/* Tile 2,3: Monthly Income and Expenses */}
            <TileWidgets
              description="Montly Income"
              trend="up"
              displayAmount={data?.metrics.monthly_income}
            />
            <TileWidgets
              description="Montly Expense"
              trend="down"
              displayAmount={data?.metrics.monthly_expense}
            />
            {/* Budget Progress*/}
          </div>
        </div>
        <div className="flex flex-auto flex-row gap-3 flex-wrap p-1 md:flex-nowrap">
          {/* Show Categorywise monthly spending breakdown - Housing, Transportation, Entertainment, Food, Utilities, Shopping */}
          <div className="flex-1 min-w-[200px] md:min-w-[250px] lg:min-w-[325px]">
            {/* <SpendingByCategoryDonut transactions={mockTransactions} /> */}
            <MonthlySpendingPieChart
              categoryData={data?.metrics.categorySpendingData}
            />
          </div>
          {/* Recent Transaction - Last 7 days */}
          <div className="flex-1 min-w-[200px] md:min-w-[250px] lg:min-w-[325px]">
            <RecentTransactionsSummary
              transactions={data?.metrics.lastweekTransactionsData || []}
            />
          </div>
        </div>
      </div>
    </>
  );
}
