package org.fjala.resoft.datatypes;

import static javax.persistence.FetchType.LAZY;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.fjala.resoft.datatypes.CandidateStatusProgram;

@Entity
@Setter
@Getter
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private CandidateCityType city;

    private LocalDate birthdate;

    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CandidateDocumentType documentType;

    @Column(nullable = false)
    private String documentValue;

    private String cellphone;

    private String university;

    private String career;

    private String semester;

    private boolean workExperience;

    private boolean autodidact;

    private boolean extended;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    private Program program;

    private LocalDateTime createdAt;

    @OneToMany(fetch = LAZY, mappedBy = "candidate", cascade = CascadeType.REMOVE)
    private List<ResultEvaluation> resultEvaluations;

    @Enumerated(value = EnumType.STRING)
    private CandidateStatusType status;

    @OneToMany(fetch = LAZY, mappedBy = "candidate", cascade = CascadeType.REMOVE)
    private List<CandidateStatusProgram> candidateStatusPrograms;
}
