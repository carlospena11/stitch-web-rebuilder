interface FlightStatusProps {
  status: string;
}

const STATUS_MAP: Record<string, { label: string; className: string; dot: string }> = {
  on_time: { label: 'ON TIME', className: 'status-on-time', dot: 'bg-green-500' },
  scheduled: { label: 'SCHEDULED', className: 'status-on-time', dot: 'bg-green-500' },
  boarding: { label: 'BOARDING', className: 'status-boarding', dot: 'bg-yellow-400' },
  delayed: { label: 'DELAYED', className: 'status-delayed', dot: 'bg-red-500' },
  landed: { label: 'LANDED', className: 'status-landed', dot: 'bg-gray-400' },
  departed: { label: 'DEPARTED', className: 'status-landed', dot: 'bg-gray-400' },
  cancelled: { label: 'CANCELLED', className: 'status-delayed', dot: 'bg-red-500' },
};

const FlightStatus = ({ status }: FlightStatusProps) => {
  const info = STATUS_MAP[status] || STATUS_MAP.scheduled;

  return (
    <div className={`flex items-center gap-2 font-mono-fids font-semibold text-sm ${info.className}`}>
      <span className={`w-2.5 h-2.5 rounded-full ${info.dot} ${status === 'boarding' ? 'live-pulse' : ''}`} />
      {info.label}
    </div>
  );
};

export default FlightStatus;
