import { useState } from 'react';
import WritingChattingButton from './writing-chatting-button';
import WritingForm from './writing-form';

export default function WritingChattingContainer() {
    const [isWritingOpen, setIsWritingOpen] = useState(false);

    return (
        <>
            {/* 버튼 */}
            <WritingChattingButton onOpenWriting={() => setIsWritingOpen(true)} />

            {/* 모달 */}
            {isWritingOpen && (
                <WritingForm onClose={() => setIsWritingOpen(false)} />
            )}
        </>
    );
}
