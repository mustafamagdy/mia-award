using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Constants;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIA.Administration.Api
{

  //[Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  [Route("api/judgeVote")]
  public class JudgeVoteController : BaseCrudController<JudgeVote, JudgeVoteDto, NewJudgeVoteDto, UpdateJudgeVoteDto>
  {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;

    public JudgeVoteController(
          IMapper mapper,
          ILogger<JudgeVoteController> logger,
          IStringLocalizer<JudgeVoteController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions
        ) : base(mapper, logger, localize)
    {
      this.env = env;
      this.limitOptions = limitOptions;
    }

    public override async Task<IActionResult> SaveNewAsync([FromForm] NewJudgeVoteDto dto, [FromServices] IAppUnitOfWork db)
    {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((JudgeVoteDto)(result as OkObjectResult)?.Value);
      var JudgeVoteItem = await db.JudgeVotes.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<JudgeVoteDto>(JudgeVoteItem));

      //var result = await db.Set<JudgeVote>().AddAsync(_mapper.Map<ArtWorkPayment>(dto)); 
      //var PaymentItem = await db.ArtWorkPayments.FindAsync(result.Entity.Id);
      //return IfFound(_mapper.Map<ArtWorkPaymentDto>(PaymentItem));

    }

    [HttpPost("submitJudgeVote")]
    public async Task<IActionResult> SubmitJudgeVote([FromBody] UpdateJudgeVoteDto dto, [FromServices] IAppUnitOfWork db)
    {
      var insertList = new List<JudgeVote>();

      var judgeVoteItems = db.JudgeVotes.Where(a => a.ArtWorkId == dto.ArtWorkId).ToList();
      if (judgeVoteItems.Any())
      {
        foreach (var objJudges in judgeVoteItems)
        {
          var entity = objJudges;// db.Set<JudgeVote>().FirstOrDefault(a => a.ArtWorkId == dto.ArtWorkId);
          if (entity != null)
            db.Set<JudgeVote>().Remove(entity);
        }
        foreach (var value in dto.CriteriaValues)
        {
          var judgeObj = new JudgeVote();
          judgeObj.JudgeId = dto.JudgeId;
          judgeObj.ArtWorkId = dto.ArtWorkId;
          judgeObj.CriteriaId = value.Id;
          judgeObj.VotingValue = Convert.ToInt32(value.Value);
          judgeObj.JudgeComplete = dto.JudgeComplete;
          insertList.Add(judgeObj);
        }


      }
      else
      {
        foreach (var value in dto.CriteriaValues)
        {
          var judgeObj = new JudgeVote();
          judgeObj.JudgeId = dto.JudgeId;
          judgeObj.ArtWorkId = dto.ArtWorkId;
          judgeObj.CriteriaId = value.Id;
          judgeObj.VotingValue = Convert.ToInt32(value.Value);
          judgeObj.JudgeComplete = dto.JudgeComplete;
          insertList.Add(judgeObj);
        }
      }
      await db.Set<JudgeVote>().AddRangeAsync(_mapper.Map<List<JudgeVote>>(insertList));
      await db.CommitTransactionAsync();

      return IfFound(_mapper.Map<JudgeVoteDto>(judgeVoteItems));
    }
    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db)
    {
      var result = await base.GetAsync(id, db);
      var resultDto = ((JudgeVoteDto)(result as OkObjectResult)?.Value);
      var boothItem = await db.JudgeVotes.FirstOrDefaultAsync(a => a.Id == resultDto.Id);
      return IfFound(_mapper.Map<JudgeVoteDto>(boothItem));
    }
    [HttpGet("getJudgeVoteCriteriaValues")]
    public async Task<IActionResult> GetJudgeVoteCriteriaValuesAsync(string id, [FromServices] IAppUnitOfWork db)
    {
      List<JudgeVoteDto> returnVotingCriteriaVoteDto = null;
      var judgeVoting = db.JudgeVotes.Include(c => c.Criteria).Where(a => a.ArtWorkId == id).ToList();
      returnVotingCriteriaVoteDto = _mapper.Map<List<JudgeVoteDto>>(judgeVoting);
      return IfFound(returnVotingCriteriaVoteDto);

    }

  }

}