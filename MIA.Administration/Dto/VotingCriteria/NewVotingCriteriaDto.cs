 
namespace MIA.Administration.Api
{
    public class NewVotingCriteriasDto
    {
        public string Name { get; set; }
        public decimal Weight { get; set; }
        public int Order { get; set; }
        public string Code { get; set; }
    }

}