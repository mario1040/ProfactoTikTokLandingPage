import { Fragment } from 'react';

const BIDI_LTR_PATTERN = /(tiktok\.com\/@profactoo1|@profactoo1|\+20 11 06365101)/g;

interface BidiTextProps {
  text: string;
}

export function BidiText({ text }: BidiTextProps) {
  const parts = text.split(BIDI_LTR_PATTERN);
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (
          part === '@profactoo1' ||
          part === 'tiktok.com/@profactoo1' ||
          part === '+20 11 06365101'
        ) {
          return (
            <span key={`${part}-${index}`} dir="ltr" className="inline-block font-en-brand">
              {part}
            </span>
          );
        }
        return <Fragment key={`txt-${index}`}>{part}</Fragment>;
      })}
    </>
  );
}
