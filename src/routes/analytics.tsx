import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  TrendingUp,
  Coins,
  Activity,
  BarChart3,
  ChevronDown,
  Search,
} from 'lucide-react'

export const Route = createFileRoute('/analytics')({
  component: RouteComponent,
})

// Mock data generators
const generateProfit = (timeSpan: string) => {
  const data = []
  let periods: string[] = []
  let count = 0

  switch (timeSpan) {
    case '7d':
      count = 7
      periods = Array.from({ length: count }, (_, i) => `Day ${i + 1}`)
      break
    case '30d':
      count = 30
      periods = Array.from({ length: count }, (_, i) => `Day ${i + 1}`)
      break
    case '3m':
      count = 3
      periods = Array.from({ length: count }, (_, i) => `Month ${i + 1}`)
      break
    case '6m':
      count = 6
      periods = Array.from({ length: count }, (_, i) => `Month ${i + 1}`)
      break
    case 'ytd': {
      // Year to date - from January to current month (assuming current month is around 8-10)
      const currentMonth = new Date().getMonth() + 1
      count = currentMonth
      periods = Array.from({ length: count }, (_, i) => {
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
        return monthNames[i]
      })
      break
    }
    case 'year':
      count = 12
      periods = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      break
    case 'all':
      // All time - show by year, let's say 5 years
      count = 5
      const currentYear = new Date().getFullYear()
      periods = Array.from(
        { length: count },
        (_, i) => `${currentYear - (count - 1 - i)}`,
      )
      break
    default:
      count = 30
      periods = Array.from({ length: count }, (_, i) => `Day ${i + 1}`)
  }

  for (let i = 0; i < count; i++) {
    data.push({
      period: periods[i],
      profit: Math.floor(Math.random() * 50000000) + 10000000,
    })
  }
  return data
}

const generateProfitByItem = (membersOnly: boolean) => {
  const items = membersOnly
    ? [
        'Abyssal Whip',
        'Dragon Boots',
        'Bandos Chestplate',
        'Armadyl Godsword',
        'Elysian Spirit Shield',
        'Scythe of Vitur',
        'Twisted Bow',
        'Ancestral Robe Top',
      ]
    : [
        'Rune Scimitar',
        'Dragon Longsword',
        'Abyssal Whip',
        'Dragon Boots',
        'Bandos Chestplate',
        'Armadyl Godsword',
        'Elysian Spirit Shield',
        'Scythe of Vitur',
      ]
  return items.map((item) => ({
    item,
    profit: Math.floor(Math.random() * 100000000) + 5000000,
  }))
}

const generateTotalGPOverTime = (timeSpan: string) => {
  const data = []
  let count = 0
  let periods: string[] = []

  switch (timeSpan) {
    case '7d':
      count = 7
      periods = Array.from({ length: count }, (_, i) => `Day ${i + 1}`)
      break
    case '30d':
      count = 30
      periods = Array.from({ length: count }, (_, i) => `Day ${i + 1}`)
      break
    case '3m':
      count = 3
      periods = Array.from({ length: count }, (_, i) => `Month ${i + 1}`)
      break
    case '6m':
      count = 6
      periods = Array.from({ length: count }, (_, i) => `Month ${i + 1}`)
      break
    case 'ytd': {
      const currentMonth = new Date().getMonth() + 1
      count = currentMonth
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      periods = Array.from({ length: count }, (_, i) => monthNames[i])
      break
    }
    case 'year':
      count = 12
      periods = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      break
    case 'all':
      count = 5
      const currentYear = new Date().getFullYear()
      periods = Array.from(
        { length: count },
        (_, i) => `${currentYear - (count - 1 - i)}`,
      )
      break
    default:
      count = 30
      periods = Array.from({ length: count }, (_, i) => `Day ${i + 1}`)
  }

  let totalGP = 50000000
  for (let i = 0; i < count; i++) {
    totalGP += Math.floor(Math.random() * 5000000) - 1000000
    data.push({
      day: periods[i],
      totalGP: Math.max(0, totalGP),
    })
  }
  return data
}

// Mock characters
const availableCharacters = [
  'IronSlayer99',
  'PureFlip',
  'SkillOnly',
  'MerchantPro',
  'FlipMaster',
]

// Mock items (combining members and non-members)
const availableItems = [
  'Abyssal Whip',
  'Dragon Boots',
  'Bandos Chestplate',
  'Armadyl Godsword',
  'Elysian Spirit Shield',
  'Scythe of Vitur',
  'Twisted Bow',
  'Ancestral Robe Top',
  'Rune Scimitar',
  'Dragon Longsword',
  'Dragon Claws',
  'Bandos Tassets',
  'Bandos Boots',
  'Armadyl Helmet',
  'Armadyl Chestplate',
  'Armadyl Chainskirt',
  'Pegasian Boots',
  'Primordial Boots',
  'Eternal Boots',
  'Dragonfire Shield',
  'Abyssal Dagger',
  'Toxic Blowpipe',
  'Trident of the Seas',
  'Barrows Gloves',
  'Fire Cape',
]

function RouteComponent() {
  const [gameMode, setGameMode] = useState<string>('both')
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([
    ...availableCharacters,
  ])
  const [membersItems, setMembersItems] = useState<boolean>(false)
  const [timeSpan, setTimeSpan] = useState<string>('30d')
  const [chartType, setChartType] = useState<string>('profit')
  const [selectedItems, setSelectedItems] = useState<string[]>([
    ...availableItems,
  ])
  const [charactersSearch, setCharactersSearch] = useState<string>('')
  const [charactersOpen, setCharactersOpen] = useState<boolean>(false)
  const [itemsSearch, setItemsSearch] = useState<string>('')
  const [itemsOpen, setItemsOpen] = useState<boolean>(false)

  const toggleCharacter = (character: string) => {
    setSelectedCharacters((prev) =>
      prev.includes(character)
        ? prev.filter((c) => c !== character)
        : [...prev, character],
    )
  }

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    )
  }

  const selectAllCharacters = () => {
    setSelectedCharacters([...availableCharacters])
  }

  const deselectAllCharacters = () => {
    setSelectedCharacters([])
  }

  const selectAllItems = () => {
    setSelectedItems([...availableItems])
  }

  const deselectAllItems = () => {
    setSelectedItems([])
  }

  const filteredCharacters = availableCharacters.filter((character) =>
    character.toLowerCase().includes(charactersSearch.toLowerCase()),
  )

  const filteredItems = availableItems.filter((item) =>
    item.toLowerCase().includes(itemsSearch.toLowerCase()),
  )

  const selectAllFilteredCharacters = () => {
    const newSelection = [
      ...new Set([...selectedCharacters, ...filteredCharacters]),
    ]
    setSelectedCharacters(newSelection)
  }

  const selectAllFilteredItems = () => {
    const newSelection = [...new Set([...selectedItems, ...filteredItems])]
    setSelectedItems(newSelection)
  }

  // Generate data based on filters
  const profitData = generateProfit(timeSpan)
  const profitByItemData = generateProfitByItem(membersItems)
  const totalGPOverTimeData = generateTotalGPOverTime(timeSpan)

  // Calculate stats
  const totalProfit = profitData.reduce((sum, item) => sum + item.profit, 0)
  const averageProfit = Math.floor(totalProfit / profitData.length)
  const totalTrades = Math.floor(Math.random() * 1000) + 500
  const winRate = Math.floor(Math.random() * 20) + 75

  const formatGP = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M GP`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K GP`
    }
    return `${value} GP`
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Track your trading performance and profits
              </p>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                {/* Game Mode */}
                <div className="space-y-2">
                  <Label htmlFor="game-mode">Game Mode</Label>
                  <Select value={gameMode} onValueChange={setGameMode}>
                    <SelectTrigger id="game-mode">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rs3">RS3</SelectItem>
                      <SelectItem value="osrs">OSRS</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Characters */}
                <div className="space-y-2">
                  <Label>Characters</Label>
                  <Popover
                    open={charactersOpen}
                    onOpenChange={setCharactersOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span>
                          {selectedCharacters.length === 0
                            ? 'Select characters'
                            : selectedCharacters.length === 1
                              ? selectedCharacters[0]
                              : `${selectedCharacters.length} selected`}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">
                          Select Characters
                        </Label>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search characters..."
                            value={charactersSearch}
                            onChange={(e) =>
                              setCharactersSearch(e.target.value)
                            }
                            className="pl-8"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={
                              charactersSearch
                                ? selectAllFilteredCharacters
                                : selectAllCharacters
                            }
                          >
                            Select All
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={deselectAllCharacters}
                          >
                            Deselect All
                          </Button>
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {filteredCharacters.length === 0 ? (
                            <div className="text-sm text-muted-foreground text-center py-4">
                              No characters found
                            </div>
                          ) : (
                            filteredCharacters.map((character) => (
                              <div
                                key={character}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={character}
                                  checked={selectedCharacters.includes(
                                    character,
                                  )}
                                  onCheckedChange={() =>
                                    toggleCharacter(character)
                                  }
                                />
                                <Label
                                  htmlFor={character}
                                  className="text-sm font-normal cursor-pointer flex-1"
                                >
                                  {character}
                                </Label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <Label>Items</Label>
                  <Popover open={itemsOpen} onOpenChange={setItemsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span>
                          {selectedItems.length === 0
                            ? 'All items'
                            : selectedItems.length === 1
                              ? selectedItems[0]
                              : `${selectedItems.length} selected`}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">
                          Select Items
                        </Label>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search items..."
                            value={itemsSearch}
                            onChange={(e) => setItemsSearch(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={
                              itemsSearch
                                ? selectAllFilteredItems
                                : selectAllItems
                            }
                          >
                            Select All
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={deselectAllItems}
                          >
                            Deselect All
                          </Button>
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {filteredItems.length === 0 ? (
                            <div className="text-sm text-muted-foreground text-center py-4">
                              No items found
                            </div>
                          ) : (
                            filteredItems.map((item) => (
                              <div
                                key={item}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`item-${item}`}
                                  checked={selectedItems.includes(item)}
                                  onCheckedChange={() => toggleItem(item)}
                                />
                                <Label
                                  htmlFor={`item-${item}`}
                                  className="text-sm font-normal cursor-pointer flex-1"
                                >
                                  {item}
                                </Label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Members Items */}
                <div className="space-y-2">
                  <Label>Options</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="members-items"
                      checked={membersItems}
                      onCheckedChange={(checked) =>
                        setMembersItems(checked === true)
                      }
                    />
                    <Label
                      htmlFor="members-items"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Members Items Only
                    </Label>
                  </div>
                </div>

                {/* Time Span */}
                <div className="space-y-2">
                  <Label htmlFor="time-span">Time Span</Label>
                  <Select value={timeSpan} onValueChange={setTimeSpan}>
                    <SelectTrigger id="time-span">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All time</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="ytd">Year to date</SelectItem>
                      <SelectItem value="6m">6 months</SelectItem>
                      <SelectItem value="3m">3 months</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Chart Type */}
                <div className="space-y-2">
                  <Label htmlFor="chart-type">Chart Type</Label>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger id="chart-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profit">Profit</SelectItem>
                      <SelectItem value="profit-by-item">
                        Profit by Item
                      </SelectItem>
                      <SelectItem value="total-gp">
                        Total GP Over Time
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Profit
                </CardTitle>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatGP(totalProfit)}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+12.5%</span>
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Profit
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatGP(averageProfit)}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+8.2%</span>
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Trades
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTrades}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-blue-500" />
                  <span className="text-blue-500">+23</span>
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{winRate}%</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+2.1%</span>
                  from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chart Section */}
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View your trading performance across different metrics
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="mt-6">
                {chartType === 'profit' && (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={profitData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="period"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => formatGP(value)}
                        />
                        <Tooltip
                          formatter={(value: number | undefined) =>
                            value !== undefined ? formatGP(value) : ''
                          }
                          contentStyle={{
                            backgroundColor: 'hsl(var(--popover))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="profit"
                          fill="hsl(var(--chart-1))"
                          name="Profit"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {chartType === 'profit-by-item' && (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={profitByItemData}
                        layout="vertical"
                        margin={{ left: 20, right: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => formatGP(value)}
                        />
                        <YAxis
                          type="category"
                          dataKey="item"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          width={150}
                        />
                        <Tooltip
                          formatter={(value: number | undefined) =>
                            value !== undefined ? formatGP(value) : ''
                          }
                          contentStyle={{
                            backgroundColor: 'hsl(var(--popover))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="profit"
                          fill="hsl(var(--chart-2))"
                          name="Profit"
                          radius={[0, 8, 8, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {chartType === 'total-gp' && (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={totalGPOverTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="day"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => formatGP(value)}
                        />
                        <Tooltip
                          formatter={(value: number | undefined) =>
                            value !== undefined ? formatGP(value) : ''
                          }
                          contentStyle={{
                            backgroundColor: 'hsl(var(--popover))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="totalGP"
                          stroke="hsl(var(--chart-3))"
                          strokeWidth={2}
                          name="Total GP"
                          dot={{ fill: 'hsl(var(--chart-3))', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
