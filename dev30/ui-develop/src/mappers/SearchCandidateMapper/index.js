/**
 * Mapper Search Candidate used to manage responses and API search candidates
 */
export default class SearchCandidateMapper {
  constructor(response) {
    this.code = response.status;
    this.result = response.data;
  }

  getCandidates() {
    if (this.result.length) {
      return this.result.map((candidate) => {
        return {
          id: candidate.id,
          name: `${candidate.firstName} ${candidate.lastName}`,
        };
      });
    }
    return [];
  }
}
