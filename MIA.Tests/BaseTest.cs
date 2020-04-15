using System.Net.Http;
using AutoMapper;
using Bogus;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using NUnit.Framework;

namespace MIA.Tests
{
  public class BaseTest {
    private WebApplicationFactory<Startup> _factory;
    private TestServer _server;
    private HttpClient _client;
    protected Faker _faker;
    protected IRuntimeMapper _mapper = null;
    protected IAppUnitOfWork db;
    protected JsonSerializerSettings _jsonSettings = new JsonSerializerSettings {
      NullValueHandling = NullValueHandling.Ignore,
    };

    [SetUp]
    public void Setup() {
      _factory = new WebApplicationFactory<Startup>();
      _client = _factory.CreateClient();
      _server = _factory.Server;

      _faker = new Faker("en");


      _jsonSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
      _jsonSettings.Converters.Add(new StringEnumConverter {
        NamingStrategy = new DefaultNamingStrategy { }
      });


      var configuration = new MapperConfiguration(cfg => {
        //cfg.AddProfile(sejelProfile);
      });

      var mapper = new Mapper(configuration);
      _mapper = mapper.DefaultContext.Mapper;

      db = Get<IAppUnitOfWork>();
    }

    protected T Get<T>() {
      return (T)_server.Host.Services.GetService(typeof(T));
    }

    [TearDown]
    public void Teardown() {
      _server.Dispose();
      _factory.Dispose();
      _client.Dispose();
    }
  }
}