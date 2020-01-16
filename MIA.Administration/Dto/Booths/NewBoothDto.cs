using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api
{
    public class NewBoothsDto
    { 
        public string Description { get; set; }
        public string Code { get; set; }
        public decimal Price { get; set; }
    }

}