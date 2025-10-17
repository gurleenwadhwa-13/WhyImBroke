import { Transaction } from '@prisma/client'
import { format } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import { Clock, RefreshCcw } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const RECURRING_INTERVALS_OBJ = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    BIWEEKLY: "Biweekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
    NONE: "None"
}

export const renderRecurringBadge = (tx: Transaction) => {
    if (!tx.isRecurring) return (
    <Badge variant="outline">
      <Clock className='w-10 h-3' />
      One-Time
    </Badge>
  );

  if (!tx.recurringInterval || !tx.nextRecurringDate) return (
    <Badge variant="outline">
      <Clock className='w-10 h-3' />
      Incomplete Info
    </Badge>
  );

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="default" className='hover:bg-gray-700'>
          <RefreshCcw />
          {RECURRING_INTERVALS_OBJ[tx.recurringInterval]}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{format(tx.nextRecurringDate, "PPP")}</p>
      </TooltipContent>
    </Tooltip>
  );
};
