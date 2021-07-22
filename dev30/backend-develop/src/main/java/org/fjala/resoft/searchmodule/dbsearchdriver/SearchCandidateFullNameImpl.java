package org.fjala.resoft.searchmodule.dbsearchdriver;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.fjala.resoft.dtos.CandidateSearchDto;
import org.fjala.resoft.searchmodule.searchmanager.SearchManager;
import org.fjala.resoft.services.mappers.CandidateDtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SearchCandidateFullNameImpl implements SearchManager<CandidateSearchDto> {

    @Autowired
    private SearchCandidatesDB searchCandidatesDB;

    @Autowired
    CandidateDtoMapper candidateDtoMapper;

    @Override
    public Collection<CandidateSearchDto> search(String keyword) {
        List<String> keyWords = List.of(keyword.split("\\+"));

        Boolean isHaveLastName = keyWords.size() > 1;

        String firstName = isHaveLastName ? keyWords.get(0) : keyWords.get(0);

        String lastName = isHaveLastName ? keyWords.get(1) : keyWords.get(0);

        String fullName = isHaveLastName ? keyword.replaceAll("\\+"," ") : keyWords.get(0);

        return searchCandidatesDB
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrFullNameContainingIgnoreCase(
                        firstName, lastName, fullName)
                .stream()
                .map(candidateDtoMapper::mapToCandidateSearchDto)
                .collect(Collectors.toList());
    }
}
