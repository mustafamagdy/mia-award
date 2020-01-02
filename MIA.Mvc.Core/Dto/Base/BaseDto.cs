using System.Collections;
using System.Collections.Generic;
using AutoMapper;
using MIA.Models.Entities;

namespace MIA {
  /// <summary>
  /// abstract class for all kind of dtos (request, and response)
  /// </summary>
  public abstract class BaseDto { }

  /// <summary>
  /// Base dto extension for automapper
  /// </summary>
  public static class BaseDtoExtensions {
    private static IMapper _mapper;

    /// <summary>
    /// This method should be called from Startup class to pass the IMapper instance built from AutoMapper
    /// </summary>
    /// <param name="mapper"></param>
    public static void Configure (IMapper mapper) {
      _mapper = mapper;
    }

    /// <summary>
    /// Map dto to T type
    /// </summary>
    /// <param name="dto"></param>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    public static T MapTo<T> (this BaseDto dto) {
      return _mapper.Map<T> (dto);
    }

    /// <summary>
    /// Map dto to T type using IMapper configuration
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="mapper"></param>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    public static T MapTo<T> (this BaseDto dto, IMapper mapper = null) {
      mapper = mapper ?? _mapper;
      return mapper.Map<T> (dto);
    }

    /// <summary>
    /// Map IEnumerable of dtos using IMapper configuration
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="mapper"></param>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    public static IEnumerable<T> MapTo<T> (this IEnumerable<BaseDto> dto, IMapper mapper = null) {
      mapper = mapper ?? _mapper;
      return mapper.Map<IEnumerable<T>> (dto);
    }

    /// <summary>
    /// Map array of dtos using IMapper configuration
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="mapper"></param>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    public static IEnumerable<T> MapTo<T> (this BaseDto[] dto, IMapper mapper = null) {
      mapper = mapper ?? _mapper;
      return mapper.Map<IEnumerable<T>> (dto);
    }

    /// <summary>
    /// Map any IEnumerable to IEnumerable
    /// </summary>
    /// <param name="dto"></param>
    /// <typeparam name="U"></typeparam>
    /// <returns></returns>
    public static IEnumerable<U> MapTo<U> (this IEnumerable dto) {
      return _mapper.Map<IEnumerable<U>> (dto);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="target"></param>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="U"></typeparam>
    /// <returns></returns>
    public static void MapTo<T, U> (this T dto, out U target) {
      target = _mapper.Map<U> (dto);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="dto"></param>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    public static T MapTo<T> (this BaseEntity dto) {
      return _mapper.Map<T> (dto);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="dto"></param>
    /// <param name="mapper"></param>
    /// <typeparam name="T"></typeparam>
    /// <returns></returns>
    public static T MapTo<T> (this BaseEntity dto, IMapper mapper) {
      return mapper.Map<T> (dto);
    }
  }
}