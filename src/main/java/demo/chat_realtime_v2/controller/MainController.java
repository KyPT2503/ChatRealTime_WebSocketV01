package demo.chat_realtime_v2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {
    @GetMapping("")
    public ModelAndView showChatPage() {
        return new ModelAndView("chat");
    }
}
