package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Candidate;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.NewCandidateDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class NewCandidateDtoMapperTest {

    @InjectMocks
    NewCandidateDtoMapper newCandidateDtoMapper = new NewCandidateDtoMapperImpl();

    @Test
    public void shouldReturnNewCandidateDtoWhenSendCandidate() {
        Program mockProgram = new Program();
        mockProgram.setId(1L);
        mockProgram.setName("DEV-30");

        Candidate mockCandidate = new Candidate();
        mockCandidate.setId(1L);
        mockCandidate.setFirstName("Test");
        mockCandidate.setLastName("Test");
        mockCandidate.setBirthdate(LocalDate.parse("1996-04-08"));
        mockCandidate.setCity(org.fjala.resoft.datatypes.CandidateCityType.COCHABAMBA);
        mockCandidate.setEmail("test.test@fundacion-jala.org");
        mockCandidate.setDocumentValue("6545345 CBA");
        mockCandidate.setCellphone("72243215");
        mockCandidate.setCareer("Computer Engineering");
        mockCandidate.setUniversity("UMSS");
        mockCandidate.setSemester("7");
        mockCandidate.setProgram(mockProgram);

        NewCandidateDto newCandidateDto = new NewCandidateDto();
        newCandidateDto.setFullName("Test Test");
        newCandidateDto.setCity(org.fjala.resoft.datatypes.CandidateCityType.COCHABAMBA);
        newCandidateDto.setBirthdate(LocalDate.parse("1996-04-08"));
        newCandidateDto.setEmail("test.test@fundacion-jala.org");
        newCandidateDto.setDocumentValue("6545345 CBA");
        newCandidateDto.setUniversity("UMSS");
        newCandidateDto.setCellphone("72243215");
        newCandidateDto.setCareer("Computer Engineering");
        newCandidateDto.setSemester("7");
        newCandidateDto.setProgram("DEV-30");

        assertThat(newCandidateDto.getProgram()).isEqualTo(newCandidateDtoMapper.newCandidateDto(mockCandidate).getProgram());
    }
}

