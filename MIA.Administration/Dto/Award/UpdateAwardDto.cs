using MIA.Administration.Api.Base;
using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api
{
    public class UpdateAwardDto : IUpdateDto
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public decimal Price { get; set; }
    }

}