interface SplitFlapTextProps {
  text: string;
  className?: string;
}

const SplitFlapText = ({ text, className = '' }: SplitFlapTextProps) => {
  return (
    <div className={`flex gap-[2px] ${className}`}>
      {text.split('').map((char, i) => (
        <span key={i} className="split-flap-char text-sm flip-animation" style={{ animationDelay: `${i * 50}ms` }}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default SplitFlapText;
