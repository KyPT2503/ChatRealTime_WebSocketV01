package demo.chat_realtime_v2.controller;

import demo.chat_realtime_v2.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/chat")
    @SendTo("/topic/publicRoom")
    public Message send(@Payload Message message) {
        return message;
    }
}
