package kroryi.his.controller;

import jakarta.servlet.http.HttpSession;
import kroryi.his.domain.Member;
import kroryi.his.dto.MemberJoinDTO;
import kroryi.his.dto.MemberSecurityDTO;
import kroryi.his.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/member")
@Log4j2
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
//    private final AuthenticationManager authenticationManager;

    @GetMapping("/login")
    public String loginGET(@RequestParam(required = false) String error, @RequestParam(required = false) String logout) {
        log.info("로그인 컨트롤러");
        if (logout != null) {
            log.info("회원 로그아웃");
        }
        if (error != null) {
            log.error("로그인 실패: {}", error);
        }
        return "user/login"; // 로그인 페이지로 리턴
    }

//    @PostMapping("/login-proc")
//    public String loginProc(@RequestParam String username, @RequestParam String password, HttpSession session) {
//        try {
//            // Create authentication token
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
//
//            // Authenticate the user
//            Authentication authentication = authenticationManager.authenticate(authenticationToken);
//
//            // Store the authentication in the SecurityContext
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            log.info("Authenticated user: {}", authentication.getPrincipal());
//
//            // Optionally store user information in the session
//            MemberSecurityDTO memberSecurityDTO = (MemberSecurityDTO) authentication.getPrincipal();
//            session.setAttribute("user", memberSecurityDTO);
//            log.info("Current Authentication: {}", SecurityContextHolder.getContext().getAuthentication());
//
//            // Redirect to home or dashboard after successful login
//            return "redirect:/home";
//        } catch (Exception e) {
//            log.error("Authentication failed: {}", e.getMessage());
//            return "redirect:/member/login?error"; // Redirect back to login with error
//        }
//    }

    // 사용자 목록을 채팅에서 사용하기 위해 추가
    @GetMapping("/list")
    @ResponseBody
    public List<MemberJoinDTO> getAllMembers() {
        return memberService.getAllUserIdAndName();
    }

}
