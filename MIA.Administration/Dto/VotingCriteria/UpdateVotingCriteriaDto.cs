using MIA.Administration.Api.Base; 
namespace MIA.Administration.Api
{
    public class UpdateVotingCriteriasDto : IUpdateDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Weight { get; set; }
        public int Order { get; set; }
        public string Code { get; set; }
    }

}