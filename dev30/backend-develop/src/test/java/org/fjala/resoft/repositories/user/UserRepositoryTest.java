package org.fjala.resoft.repositories.user;

import org.fjala.resoft.datatypes.User;
import org.fjala.resoft.repositories.UserRepository;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    UserRepository userRepository;

    @Test
    public void should_find_no_users_if_repository_is_empty() throws Exception {
        Iterable<User> tutorials = userRepository.findAll();
        assertThat(tutorials).isEmpty();
    }

    @Test
    public void should_store_a_user() throws Exception {
        User registerUser = new User();
        registerUser.setUsername("New User");
        registerUser.setEmail("new.user@fundation-jala.org");
        registerUser.setPassword("NewUser123");

        User user = userRepository.save(registerUser);
        assertThat(user).hasFieldOrPropertyWithValue("email", "new.user@fundation-jala.org");
        assertThat(user).hasFieldOrPropertyWithValue("username", "New User");
        assertThat(user).hasFieldOrPropertyWithValue("password", "NewUser123");
    }

    @Test
    public void should_find_user_by_email() throws Exception {
        User registerUser = new User();
        registerUser.setUsername("New User");
        registerUser.setEmail("new.user@fundation-jala.org");
        registerUser.setPassword("NewUser123");
        entityManager.persist(registerUser);

        User user = userRepository.findByEmail("new.user@fundation-jala.org").get();
        assertThat(user).isEqualTo(registerUser);
    }

}
