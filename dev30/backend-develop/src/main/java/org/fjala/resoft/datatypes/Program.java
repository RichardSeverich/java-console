package org.fjala.resoft.datatypes;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.fjala.resoft.datatypes.CandidateStatusProgram;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Program {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(nullable = false, unique = true, updatable = false)
    private Long id;

    @Column
    private int programOrder;

    @Enumerated(EnumType.STRING)
    private ProgramType programType;

    private String description;

    @OneToMany(fetch = LAZY, mappedBy = "program", cascade = CascadeType.REMOVE)
    private List<Stage> stages;

    @OneToMany(fetch = LAZY, mappedBy = "program", cascade = CascadeType.REMOVE)
    private List<Candidate> candidates;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @Column
    private boolean startAutomatically;

    private Date createdAt;

    @OneToMany(fetch = LAZY, mappedBy = "program", cascade = CascadeType.REMOVE)
    private List<CandidateStatusProgram> candidateStatusPrograms;
}
