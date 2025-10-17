// "use client"

// import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Switch } from "@/components/ui/switch"
// import Link from "next/link"

// export type TAccountCardViewProps = {
//   name: string
//   type: string
//   balance: string
//   currency: string
//   isDefault: boolean
//   loading: boolean
//   onDefaultToggle: (event: any) => void
//   href: string
// }

// export default function AccountCardView({
//   name,
//   type,
//   balance,
//   currency,
//   isDefault,
//   loading,
//   onDefaultToggle,
//   href,
// }: TAccountCardViewProps) {
//   return (
//     <Card className="hover:shadow-md group relative">
//       <Link href={href}>
//         <CardHeader>
//           <CardTitle className="text-sm font-sans capitalize">{name}</CardTitle>
//           <Switch
//             checked={isDefault}
//             onClick={onDefaultToggle}
//             disabled={loading}
//           />
//           <CardDescription>{isDefault ? "Default Account" : ""}</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className='text-2xl'>
//             ${balance}{currency}
//           </div>
//         </CardContent>
//         <CardFooter>
//           <CardDescription>{type}</CardDescription>
//         </CardFooter>
//       </Link>
//     </Card>
//   )
// }

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface AccountCardViewProps {
  name: string;
  type: string;
  balance: string;
  currency: string;
  isDefault: boolean;
  loading: boolean;
  onDefaultToggle: (event: React.FormEvent) => void;
  href: string;
}

export default function AccountCardView({
  name,
  type,
  balance,
  currency,
  isDefault,
  loading,
  onDefaultToggle,
  href,
}: AccountCardViewProps) {
  const getAccountIcon = () => {
    if (type === "CREDIT") return "💳";
    if (type === "SAVINGS") return "🏦";
    return "💰";
  };

  const getGradientClass = () => {
    if (type === "CREDIT") return "from-purple-500/10 via-card to-card";
    if (type === "SAVINGS") return "from-cyan-500/10 via-card to-card";
    return "from-primary/10 via-card to-card";
  };

  return (
    <Link href={href}>
      <Card
        className={`relative overflow-hidden p-6 bg-gradient-to-br ${getGradientClass()} border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group cursor-pointer`}
      >
        {/* Decorative gradient orb */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{getAccountIcon()}</div>
              {isDefault && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/20 text-primary border-primary/30"
                >
                  Default
                </Badge>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary/10"
                  disabled={loading}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    onDefaultToggle(e);
                  }}
                  disabled={loading}
                >
                  <Star
                    className={`h-4 w-4 mr-2 ${isDefault ? "fill-current text-primary" : ""}`}
                  />
                  {isDefault ? "Default Account" : "Set as Default"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2 mb-6">
            <h3 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                {type}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Current Balance</p>
            <p className="text-4xl font-bold text-foreground tracking-tight">
              $
              {parseFloat(balance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              {currency}
            </p>
          </div>

          {/* Mini trend indicator */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Last updated</span>
              <span className="text-success font-medium">● Active</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
