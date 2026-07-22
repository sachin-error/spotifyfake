import { useEffect, useState } from "react";

/**
 * Types out a sequence of lines one character at a time, then calls onDone.
 * lines: string[]
 */
function TerminalTyping({
  lines = [],
  speed = 28,
  lineDelay = 350,
  onDone = () => {},
  className = "",
  cursor = true,
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      if (!done) {
        setDone(true);
        onDone();
      }
      return;
    }

    const target = lines[lineIndex];

    if (text.length < target.length) {
      const t = setTimeout(() => {
        setText(target.slice(0, text.length + 1));
      }, speed);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setText("");
    }, lineDelay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, lineIndex, lines]);

  const completedLines = lines.slice(0, lineIndex);

  return (
    <div className={className}>
      {completedLines.map((line, i) => (
        <div key={i} className="text-hkf-green/70">
          {line}
        </div>
      ))}
      {lineIndex < lines.length && (
        <div className="text-hkf-green">
          {text}
          {cursor && <span className="term-cursor ml-0.5" />}
        </div>
      )}
    </div>
  );
}

export default TerminalTyping;
