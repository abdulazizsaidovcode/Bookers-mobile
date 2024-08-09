import React from 'react';
import ChatSupport from '../../(chat)';
import { PinCodeProvider, usePinCode } from '@/context/PinContext';
import CheckPinCode from '@/app/(auth)/(checkPinCode)/checkPinCodeAbsolute';

function ChatScreen() {

    return (
            <ChatSupport />
    );
}

export default ChatScreen;
