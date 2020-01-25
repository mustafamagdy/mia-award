using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.Api.Base;
using MIA.Models.Entities;
using MIA.ORMContext;
using Microsoft.AspNetCore.Mvc;
using MIA.ORMContext.Uow;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using MIA.Constants;

namespace MIA.Administration.Api.Base
{
    /// <summary>
    /// User account operations controller
    /// </summary>
#if (Versioning)
    [ApiVersion("1.0")]
#endif
    [Route("api/[controller]")]

    public class BaseCrudController<TEntity, TDataDto, TNewDto, TUpdateDto>
               : BaseApiController<BaseCrudController<TEntity, TDataDto, TNewDto, TUpdateDto>>
                    where TEntity : BaseEntity<string>
                    where TUpdateDto : IUpdateDto
    {

        protected readonly IStringLocalizer _localizer;

        public BaseCrudController(
          IMapper mapper,
          ILogger<BaseCrudController<TEntity, TDataDto, TNewDto, TUpdateDto>> logger,
          IStringLocalizer localizer
        ) : base(logger, mapper)
        {
            this._localizer = localizer;
        }

        [HttpPost("search")]
        public virtual async Task<IActionResult> Search(
          [FromBody] BaseSearchDto dto,
          [FromServices] IAppUnitOfWork db
          )
        {
            var result = db.Set<TEntity>()
                           .ProjectTo<TDataDto>(_mapper.ConfigurationProvider)
                           .ToPagedList(dto);

            return IfFound(result);
        }

        [HttpPost("list-all")]
        public virtual async Task<IActionResult> ListAllNoPagination(
          [FromBody] BaseSearchDto dto,
          [FromServices] IAppUnitOfWork db
          )
        {
            var result = db.Set<TEntity>()
                           .ProjectTo<TDataDto>(_mapper.ConfigurationProvider)
                           .ToList();

            return IfFound(result);
        }

        [HttpPost()]
        public virtual async Task<IActionResult> SaveNewAsync(
          [FromBody] TNewDto dto,
          [FromServices] IAppUnitOfWork db
          )
        {

            var savedEntity = await db.Set<TEntity>()
                                 .AddAsync(_mapper.Map<TEntity>(dto));

            return IfFound(_mapper.Map<TDataDto>(savedEntity.Entity));
        }

        [HttpPut()]
        public virtual async Task<IActionResult> UpdateAsync(
          [FromBody] TUpdateDto dto,
          [FromServices] IAppUnitOfWork db
          )
        {
            var entity = db.Set<TEntity>()
                           .AsNoTracking()
                           .FirstOrDefault(a => a.Id == dto.Id);

            if (entity == null)
                return NotFound404("record not found");

            entity = (TEntity)_mapper.Map(dto, entity, typeof(TUpdateDto), typeof(TEntity));
            //_mapper.Map<TEntity>(dto);
            var entry = db.Set<TEntity>().Attach(entity);
            entry.State = EntityState.Modified;

            return IfFound(_mapper.Map<TDataDto>(entity));
        }


        [HttpDelete()]
        public virtual async Task<IActionResult> DeleteAsync(
            [FromQuery(Name="id")] string id,
            [FromServices] IAppUnitOfWork db
            )
        {
            var entity = db.Set<TEntity>().FirstOrDefault(a => a.Id == id);
            if (entity == null)
                return NotFound404("record not found");

            db.Set<TEntity>().Remove(entity);

            return Ok();
        }

        [HttpGet()]
        public virtual async Task<IActionResult> GetAsync(
            [FromQuery(Name="id")] string id,
            [FromServices] IAppUnitOfWork db
            )
        {
            var entity = db.Set<TEntity>().FirstOrDefault(a => a.Id == id);
            if (entity == null)
                return NotFound404("record not found");

            return IfFound(_mapper.Map<TDataDto>(entity));

        }

        //[HttpPut("{id},{status}")]
        //public virtual async Task<IActionResult> ChangeStatusAsync(
        //    [FromRoute] string id,
        //    [FromServices] IAppUnitOfWork db
        //    )
        //{
        //    var entity = db.Set<TEntity>()
        //                    .AsNoTracking()
        //                    .FirstOrDefault(a => a.Id == id);
        //    if (entity == null)
        //        return NotFound404("record not found");

        //    entity = (TEntity)_mapper.Map(dto, entity, typeof(TUpdateDto), typeof(TEntity));
        //    _mapper.Map<TEntity>(dto);
        //    var entry = db.Set<TEntity>().Attach(entity);
        //    entry.State = EntityState.Modified;


        //    return IfFound(_mapper.Map<TDataDto>(entity));

        //}
    }
}
