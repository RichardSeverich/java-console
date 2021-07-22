package org.fjala.resoft.services.mappers;

import org.fjala.resoft.datatypes.Candidate;
import org.fjala.resoft.datatypes.CandidateStatusProgram;
import org.fjala.resoft.datatypes.Program;
import org.fjala.resoft.dtos.CandidateProgramsDto;
import org.fjala.resoft.services.mappers.CandidateProgramsDtoMapper;
import org.fjala.resoft.services.mappers.CandidateProgramsDtoMapperImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class CandidateProgramsDtoMapperTest {

    @InjectMocks
    CandidateProgramsDtoMapper candidateProgramsDtoMapper = new CandidateProgramsDtoMapperImpl();

    @Test
    public void shouldReturnCandidateProgramsDtoWhenSendCandidateStatusProgram() {
        Candidate mockCandidate = new Candidate();
        mockCandidate.setId(10L);
        mockCandidate.setDocumentValue("6452871 CBA");

        Program mockProgram = new Program();
        mockProgram.setId(2L);
        mockProgram.setName("DEV-30");

        CandidateStatusProgram mockCandidateStatusProgram = new CandidateStatusProgram();
        mockCandidateStatusProgram.setId(1L);
        mockCandidateStatusProgram.setCandidate(mockCandidate);
        mockCandidateStatusProgram.setProgram(mockProgram);
        mockCandidateStatusProgram.setStatus(org.fjala.resoft.datatypes.CandidateStatusType.DISMISSED);

        CandidateProgramsDto expected = new CandidateProgramsDto();
        expected.setId(1L);
        expected.setProgram("DEV-30");
        expected.setStatus("DISMISSED");

        assertThat(expected.getStatus()).isEqualTo(candidateProgramsDtoMapper
                .mapToCandidateProgramsDto(mockCandidateStatusProgram).getStatus());
    }
}
