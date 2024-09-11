import React, { useState, useEffect, useCallback, useMemo } from 'react';

const TYPING_INTERVAL = 50;

const Typewriter = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');

    const memoizedText = useMemo(() => String(text), [text]);

    const typeNextCharacter = useCallback((currentText, targetText) => {
        if (currentText.length < targetText.length) {
            return currentText + targetText[currentText.length];
        }
        return currentText;
    }, []);

    useEffect(() => {
        setDisplayedText('');
        let isMounted = true;

        const typeText = () => {
            if (!isMounted) return;

            setDisplayedText(currentText => {
                const newText = typeNextCharacter(currentText, memoizedText);
                if (newText === memoizedText && onComplete) {
                    onComplete();
                }
                return newText;
            });
        };

        const intervalId = setInterval(typeText, TYPING_INTERVAL);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [memoizedText, typeNextCharacter, onComplete]);

    return (
        <div className="typewriter overflow-hidden whitespace-pre-wrap break-words inline-block">
            {displayedText}
            {/* <span className="animate-blink font-extrabold">|</span> */}
        </div>
    );
};

export default Typewriter;
 