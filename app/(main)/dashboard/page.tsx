import React from "react"
import CreateAccountDrawer from "@/components/accountComponents/createAccountDrawer"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Plus } from "lucide-react"

export function DashboardPage () {
  return (
    <div className='px-5'>
      {/* Budget Progress */}

      {/* Dashboard Overview */}

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="flex m-4 px-5 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Plus className="h-10 w-10 mx-auto mb-2" />
              <p className="text-m font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>
    </div>
  )
}

export default DashboardPage