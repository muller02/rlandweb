package kr.co.rland.web.config.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import kr.co.rland.web.entity.Member;
import kr.co.rland.web.entity.MemberRole;
import kr.co.rland.web.repository.MemberRepository;
import kr.co.rland.web.repository.MemberRoleRepository;

@Service
public class WebUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        Member member = repository.findByUserName(username);
        List<MemberRole> roles = memberRoleRepository.findAllByMemberId(member.getId());
 
        List<GrantedAuthority> authorities = new ArrayList<>();
        
        for(MemberRole role : roles){
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
        }

        WebUserDetails userDatails = new WebUserDetails();
        userDatails.setId(member.getId());
        userDatails.setUsername(member.getUsername());
        userDatails.setPassword(member.getPwd());
        userDatails.setEmail(member.getEmail());
        userDatails.setAuthorities(authorities);


        return userDatails;
    }
}
