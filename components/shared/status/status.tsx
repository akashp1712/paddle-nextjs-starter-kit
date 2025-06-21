import { Check, CircleMinus, Clock4, Pause, SquarePen } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  status: string;
}

interface StatusInfo {
  [key: string]: { color: string; icon: ReactNode; text: string };
}
// Ensure that any new colors are added to `safelist` in tailwind.config.js
const StatusInfo: StatusInfo = {
  active: { color: '#16a34a', icon: <Check size={16} />, text: 'Active' },
  paid: { color: '#16a34a', icon: <Check size={16} />, text: 'Paid' },
  completed: { color: '#16a34a', icon: <Check size={16} />, text: 'Completed' },
  trialing: { color: '#6b7280', icon: <Clock4 size={16} />, text: 'Trialing' },
  draft: { color: '#6b7280', icon: <SquarePen size={16} />, text: 'Draft' },
  ready: { color: '#6b7280', icon: <SquarePen size={16} />, text: 'Ready' },
  canceled: { color: '#6b7280', icon: <CircleMinus size={16} />, text: 'Canceled' },
  inactive: { color: '#dc2626', icon: <CircleMinus size={16} />, text: 'Inactive' },
  past_due: { color: '#dc2626', icon: <Clock4 size={16} />, text: 'Past due' },
  paused: { color: '#ea580c', icon: <Pause size={16} />, text: 'Paused' },
  billed: { color: '#ea580c', icon: <Clock4 size={16} />, text: 'Unpaid invoice' },
};

export function Status({ status }: Props) {
  const { color, icon, text } = StatusInfo[status] ?? { text: status };
  return (
    <div
      className={`self-end flex items-center gap-2 border rounded-xxs border-border py-1 px-2 w-fit @4xs:text-nowrap text-wrap`}
      style={{ color }}
    >
      {icon}
      {text}
    </div>
  );
}