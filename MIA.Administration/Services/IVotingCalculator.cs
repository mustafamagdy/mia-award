using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MIA.Models.Entities;

namespace MIA.Administration.Services {
  public interface IVotingCalculator {
    VotingCalculationResult CalculateTotalsFor(IEnumerable<JudgeVoteValues> votes);
  }

  public class VotingCalculator : IVotingCalculator {
    public VotingCalculationResult CalculateTotalsFor(IEnumerable<JudgeVoteValues> votes) {
      var score = votes.Sum(a => a.Weight * ((decimal)a.VotingValue) / 10.0M);
      var totalScore = Math.Round(votes.Sum(a => a.Weight), 0);
      return new VotingCalculationResult {
        Score = score,
        ScoreTotal = totalScore,
        Percentage = score / totalScore
      };
    }
  }

  public class VotingCalculationResult {
    public decimal Score { get; set; }
    public decimal ScoreTotal { get; set; }
    public decimal Percentage { get; set; }
  }

  public class JudgeVoteValues {
    public string CriteriaId { get; set; }
    public decimal Weight { get; set; }
    public int VotingValue { get; set; }

  }
}
