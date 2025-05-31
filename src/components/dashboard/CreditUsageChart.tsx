import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface CreditUsageChartProps {
  data: {
    date: string;
    amount: number;
  }[];
}

export default function CreditUsageChart({ data }: CreditUsageChartProps) {
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="creditGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E1E1E',
              borderColor: '#374151',
              borderRadius: '0.5rem',
              color: '#F9FAFB'
            }}
            labelStyle={{ color: '#F3F4F6', fontWeight: 'bold', marginBottom: '0.5rem' }}
            itemStyle={{ color: '#93C5FD' }}
            formatter={(value: number) => [`${value} credits`, 'Usage']}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#creditGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}