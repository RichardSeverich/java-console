package org.fjala.resoft.datatypes;

import static javax.persistence.GenerationType.IDENTITY;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.fjala.resoft.datatypes.Candidate;
import org.fjala.resoft.datatypes.CandidateStatusType;
import org.fjala.resoft.datatypes.Program;

@Getter
@Setter
@Entity
public class CandidateStatusProgram {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(nullable = false, unique = true, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "program_id")
    private Program program;

    private LocalDateTime createdAt;

    @Enumerated(value = EnumType.STRING)
    private CandidateStatusType status;

    @Column(nullable = false)
    private String documentValue;
}
