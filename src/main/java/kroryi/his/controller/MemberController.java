package kroryi.his.controller;

import kroryi.his.dto.MemberJoinDTO;
import kroryi.his.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Service
@Controller
@RequestMapping("/member")
@Log4j2
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/login")
    public String loginGET(String error, String logout) {
        log.info("로그인 컨트롤러");
        log.info("로그아웃 : {}", logout);
        if(logout != null) {
            log.info("회원 로그아웃");
        }

        return "member/login";
    }

    @GetMapping("/join")
    public String joinGET() {
        log.info("회원가입....");
        return "member/join";
    }

    @PostMapping("/join")
    public String joinPOST(MemberJoinDTO memberJoinDTO, RedirectAttributes redirectAttributes) {

        log.info("회원가입 POST->>>");
        log.info("memberJoinDTO: {}", memberJoinDTO);
        try {
            memberService.join(memberJoinDTO);
        }catch (MemberService.MidExistException e) {

            redirectAttributes.addFlashAttribute("error", "mid");
            return "redirect:/member/join";
        }

        return "redirect:/home";
    }
}