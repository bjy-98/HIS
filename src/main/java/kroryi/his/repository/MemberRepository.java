package kroryi.his.repository;

import kroryi.his.domain.Member;
import kroryi.his.domain.MemberRole;
import kroryi.his.service.MemberSearch;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
public interface MemberRepository extends JpaRepository<Member, String>, MemberSearch {

    @EntityGraph(attributePaths = "roleSet")
    @Query("select m from Member m where m.mid= :mid")
    Optional<Member> getWithRoles(String mid);

    List<Member> findByRoleSet(MemberRole role);

    @Query("SELECT m FROM Member m JOIN m.roleSet r WHERE " +
            "(m.mid = :mid OR m.name = :username OR m.email = :email) " +
            "OR r.roleSet IN :roles")
    List<Member> findByIdOrUsernameOrEmailAndRolesIn(
            @Param("mid") String id,
            @Param("username") String username,
            @Param("email") String email,
            @Param("roles") String roles);

    boolean existsByMid(String mid);

    // 사용자 ID와 비밀번호로 사용자 검색
    Optional<Member> findByMidAndPassword(String mid, String password);

}
