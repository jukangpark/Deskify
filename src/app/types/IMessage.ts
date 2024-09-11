interface IMessage {
    id: string;
    created_at: string;
    chatroom_id: string;
    sender_id: string;
    text: string;
    is_read: boolean;
}

export default IMessage;
