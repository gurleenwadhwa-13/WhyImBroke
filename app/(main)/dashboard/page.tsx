import { getUser } from "@/actions/users/getUser"
import getDashboardSummary from "@/actions/dashboard/get-dashboard-summary"
import { TileWidgets } from "@/components/Dashboard/tile-widgets"
import { RecentTransactionsSummary } from "@/components/Dashboard/recent-transactions"
import { MonthlySpendingPieChart } from "@/components/Dashboard/monthly-spending-piechart"
import { toast } from "sonner"

export default async function DashboardPage() {
  const { success } = await getUser()
  if (!success) {
    toast.error("Failed to fetch user")
  }

  const { data } = await getDashboardSummary();

  return (
    <>
      {/* Dashboard Overview */}
      <div>
      <div className="flex flex-auto flex-col gap-4 p-1 pt-1">
        <div className="flex flex-col gap-3 justify-between md:flex-row lg:flex-row flex-wrap">
            {/* Tile 1: Networth Metric - showing a 30 day change if we upped or downed */}
            <TileWidgets description="Net Worth" trend="up" displayAmount={data?.metrics.networth} />

            {/* Tile 2,3: Monthly Income and Expenses */}
            <TileWidgets description="Montly Income" trend="up" displayAmount={data?.metrics.monthly_income} />
            <TileWidgets description="Montly Expense" trend="down" displayAmount={data?.metrics.monthly_expense} />
            {/* Budget Progress*/}
        </div>
      </div>
      <div className="flex flex-auto flex-row gap-3 flex-wrap p-1 md:flex-nowrap">
          {/* Show Categorywise monthly spending breakdown - Housing, Transportation, Entertainment, Food, Utilities, Shopping */}
          <div className="flex-1 min-w-[300px]">
            <MonthlySpendingPieChart />
          </div>
          {/* Recent Transaction - Last 7 days */}
          <div className="flex-1 min-w-[300px]">
            <RecentTransactionsSummary transactions={data?.metrics.lastweekTransactionsData || []}/>
          </div>
      </div>
      </div>
    </>
  )
}