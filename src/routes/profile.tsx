import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Settings,
  Mail,
  Calendar,
  Trophy,
  Star,
  TrendingUp,
  Coins,
  Target,
  Award,
  Crown,
  Activity,
} from 'lucide-react'

// Mock user data
const userData = {
  name: 'John Trader',
  email: 'john.trader@example.com',
  memberSince: 'January 2024',
  plan: 'Pro',
  avatar: 'JT',
}

// Mock characters
const characters = [
  {
    name: 'IronSlayer99',
    level: 126,
    type: 'Main',
    totalTrades: 456,
    active: true,
  },
  {
    name: 'PureFlip',
    level: 89,
    type: 'Pure',
    totalTrades: 234,
    active: false,
  },
  {
    name: 'SkillOnly',
    level: 3,
    type: 'Skiller',
    totalTrades: 89,
    active: false,
  },
]

// Mock trading stats
const tradingStats = [
  {
    icon: Trophy,
    label: 'Highest Profit Trade',
    value: '12.5M GP',
    subtitle: 'Dragon Claws',
    color: 'text-yellow-500',
  },
  {
    icon: Coins,
    label: 'Total Profit',
    value: '487M GP',
    subtitle: 'All time',
    color: 'text-green-500',
  },
  {
    icon: Activity,
    label: 'Total Trades',
    value: '779',
    subtitle: 'Completed',
    color: 'text-blue-500',
  },
  {
    icon: Target,
    label: 'Win Rate',
    value: '87.3%',
    subtitle: 'Profitable trades',
    color: 'text-purple-500',
  },
  {
    icon: TrendingUp,
    label: 'Average Margin',
    value: '18.4%',
    subtitle: 'Per trade',
    color: 'text-cyan-500',
  },
  {
    icon: Star,
    label: 'Best Streak',
    value: '23 wins',
    subtitle: 'In a row',
    color: 'text-orange-500',
  },
]

// Mock recent activity
const recentTrades = [
  {
    item: 'Abyssal Whip',
    buyPrice: '2.8M',
    sellPrice: '3.2M',
    profit: '+400K',
    profitPercent: '+14.3%',
    date: '2 hours ago',
    profitable: true,
  },
  {
    item: 'Dragon Boots',
    buyPrice: '350K',
    sellPrice: '425K',
    profit: '+75K',
    profitPercent: '+21.4%',
    date: '5 hours ago',
    profitable: true,
  },
  {
    item: 'Bandos Chestplate',
    buyPrice: '18.5M',
    sellPrice: '17.9M',
    profit: '-600K',
    profitPercent: '-3.2%',
    date: '1 day ago',
    profitable: false,
  },
  {
    item: 'Elysian Spirit Shield',
    buyPrice: '785M',
    sellPrice: '812M',
    profit: '+27M',
    profitPercent: '+3.4%',
    date: '2 days ago',
    profitable: true,
  },
]

function RouteComponent(): React.ReactNode {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {userData.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h1 className="text-3xl">{userData.name}</h1>
                      <Badge className="w-fit mx-auto md:mx-0">
                        {userData.plan} Member
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          Member since {userData.memberSince}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Button size="sm">Edit Profile</Button>
                    <Button size="sm" variant="outline">
                      Manage Subscription
                    </Button>
                    <Button size="sm" variant="outline">
                      Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Stats */}
          <div>
            <h2 className="text-2xl mb-4">Trading Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tradingStats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-primary/50 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`h-12 w-12 rounded-lg bg-${stat.color.split('-')[1]}-100 flex items-center justify-center`}
                      >
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-2xl">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">
                        {stat.subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Characters & Activity Tabs */}
          <Tabs defaultValue="characters" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="characters">Characters</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            {/* Characters Tab */}
            <TabsContent value="characters" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character, index) => (
                  <Card
                    key={index}
                    className={`border-2 ${character.active ? 'border-primary' : ''}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {character.name}
                            {character.active && (
                              <Badge variant="default" className="text-xs">
                                Active
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>
                            {character.type} Account
                          </CardDescription>
                        </div>
                        {index === 0 && (
                          <Crown className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Combat Level
                          </span>
                          <span>{character.level}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Total Trades
                          </span>
                          <span>{character.totalTrades}</span>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={character.active ? 'outline' : 'default'}
                          className="flex-1"
                        >
                          {character.active ? 'View Stats' : 'Set Active'}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Character Card */}
                <Card className="border-2 border-dashed hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center p-6">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <span className="text-2xl">+</span>
                    </div>
                    <h3 className="mb-2">Add Character</h3>
                    <p className="text-sm text-muted-foreground">
                      Track trades for multiple characters
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Recent Activity Tab */}
            <TabsContent value="activity" className="mt-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Recent Trades</CardTitle>
                  <CardDescription>
                    Your latest trading activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTrades.map((trade, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between py-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-10 w-10 rounded-lg ${trade.profitable ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center shrink-0`}
                              >
                                <TrendingUp
                                  className={`h-5 w-5 ${trade.profitable ? 'text-green-600' : 'text-red-600 rotate-180'}`}
                                />
                              </div>
                              <div className="min-w-0">
                                <p>{trade.item}</p>
                                <p className="text-sm text-muted-foreground">
                                  {trade.date}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p
                              className={
                                trade.profitable
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }
                            >
                              {trade.profit}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {trade.profitPercent}
                            </p>
                          </div>
                        </div>
                        {index < recentTrades.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <Button variant="outline" className="w-full">
                    View All Trades
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Achievements Section */}
          <div>
            <h2 className="text-2xl mb-4">Achievements</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: 'First Flip',
                  description: 'Complete your first trade',
                  unlocked: true,
                },
                {
                  name: 'Profit Master',
                  description: 'Earn 100M GP total profit',
                  unlocked: true,
                },
                {
                  name: 'Consistency King',
                  description: '20 profitable trades in a row',
                  unlocked: true,
                },
                {
                  name: 'Billionaire',
                  description: 'Earn 1B GP total profit',
                  unlocked: false,
                },
              ].map((achievement, index) => (
                <Card
                  key={index}
                  className={`border-2 ${achievement.unlocked ? 'border-primary/30' : 'opacity-60'}`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`h-16 w-16 rounded-full mx-auto mb-3 flex items-center justify-center ${achievement.unlocked ? 'bg-primary/10' : 'bg-muted'}`}
                    >
                      <Award
                        className={`h-8 w-8 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`}
                      />
                    </div>
                    <h3 className="text-sm mb-1">{achievement.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
