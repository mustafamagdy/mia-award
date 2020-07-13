using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using Bogus;
using MIA.Models.Entities.Enums;
using MIA.Infrastructure;
using System.Net.Http;
using System.Text.Encodings.Web;
using Newtonsoft.Json.Linq;

namespace MIA.ORMContext.Seed {
  public class DbInitializer {
    /// <summary>
    /// Seed database with default required data
    /// </summary>
    /// <param name="userManager">Usermanager instance to create default users</param>
    /// <param name="roleManager">Rolemanager instance to create default roles</param>
    /// <param name="s3FileManager"></param>
    /// <param name="db"></param>
    /// <param name="encoder"></param>
    /// <returns></returns>
    public static async Task SeedDbAsync(
      UserManager<AppUser> userManager,
      RoleManager<AppRole> roleManager,
      IS3FileManager s3FileManager,
      IAppUnitOfWork db,
      HtmlEncoder encoder) {

      await SeedDefaultSystemOptions(db);
      await SeedDefaultRoles(roleManager, db);
      await SeedAdminRoleAndPermissions(roleManager, db);
      await SeedAdminUserAsync(userManager, db);
      //await SeedDemoNews(db, s3FileManager);
      //await SeedDemoArtworks(db, s3FileManager);

      await SeedBoothUserAndRoleAsync(roleManager, userManager, db);
      await SeedFilterAndUploadUserAndRoleAsync(roleManager, userManager, db);
      await SeedDemoUsers(roleManager, userManager, db);

      if (Directory.Exists("./seed")) {
        await SeedContactUsMessageSubjectsAsync(db);
        await SeedAwards(db, encoder);
        await SeedGenres(db);
        await SeedArtowrkSubjectRole(db);
        await SeedBooths(db);
        await SeedNews(db, encoder, s3FileManager);
        await SeedDemoGallery(db, s3FileManager);
        await SeedTimeLine(db);
        await SeedSponsers(db);
        //await SeedJudgeUsers(roleManager, userManager, db);
        await SeedVotingCriterias(db);

      }

      await db.CommitTransactionAsync();
    }

    private static async Task SeedTimeLine(IAppUnitOfWork db) {
      var filename = "./seed/timeline.json";
      if (File.Exists(filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          var programContent = db.Contents.FirstOrDefault(a => a.ContentType == ContentType.Program);
          if (programContent == null) {
            programContent = new Content();
            programContent.ContentType = ContentType.Program;
          }

          programContent.Data = r.ReadToEnd();
          if (programContent.Id == null) {
            await db.Contents.AddAsync(programContent);
          }
        }
      }
    }

    private static async Task SeedSponsers(IAppUnitOfWork db) {
      var filename = "./seed/sponsers.json";
      if (File.Exists(filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          var sponserContent = db.Contents.FirstOrDefault(a => a.ContentType == ContentType.Sponsers);
          if (sponserContent == null) {
            sponserContent = new Content();
            sponserContent.ContentType = ContentType.Sponsers;
          }

          sponserContent.Data = r.ReadToEnd();
          if (sponserContent.Id == null) {
            await db.Contents.AddAsync(sponserContent);
          }
        }
      }
    }

    private static async Task SeedBooths(IAppUnitOfWork db) {
      List<Booth> booths = db.Booths.ToList();
      var filename = "./seed/booths.json";
      if (File.Exists(filename)) {
        var listBooths = new List<Booth>();

        using (StreamReader r = new StreamReader(filename)) {
          string json = r.ReadToEnd();
          JArray array = JArray.Parse(json);
          foreach (JToken j in array) {
            var boothType = new {
              Code = ((JValue)j["Code"]).Value<string>(),
              Start = ((JValue)j["Start"]).Value<int>(),
              End = ((JValue)j["End"]).Value<int>(),
              Area = ((JValue)j["Area"]).Value<string>(),
              Price = ((JValue)j["Price"]).Value<decimal>(),
              Currency = ((JValue)j["Currency"]).Value<string>(),
              Sellable = ((JValue)j["Sellable"]).Value<bool>(),
              Description = LocalizedData.FromDictionary((JObject)j["Description"]),
            };

            var countOfBooths = db.Booths.Count(a => a.Code.StartsWith(boothType.Code));
            if (countOfBooths == 0) {
              for (int i = boothType.Start; i <= boothType.End; i++) {
                listBooths.Add(new Booth {
                  Code = $"{boothType.Code}{i.ToString("#000")}",
                  Area = boothType.Area,
                  Price = boothType.Price,
                  Description = boothType.Description,
                  Sellable = boothType.Sellable
                });
              }
            }
          }

          await db.Booths.AddRangeAsync(listBooths);
        }
      }
    }

    private static async Task SeedDemoUsers(RoleManager<AppRole> roleManager, UserManager<AppUser> userManager,
      IAppUnitOfWork db) {
      if (await roleManager.FindByNameAsync(PredefinedRoles.Nominee.ToString()) == null) {
        await roleManager.CreateAsync(
          new AppRole(PredefinedRoles.Nominee.ToString()) {
            Name = PredefinedRoles.Nominee.ToString(),
            NormalizedName = PredefinedRoles.Nominee.ToString().ToUpper()
          });

      }

      Permissions[] nomineePermissions = new Permissions[]
      {
        Permissions.NomineeAccess,
      };

      var nomineeRole = await roleManager.FindByNameAsync(PredefinedRoles.Nominee.ToString());
      nomineePermissions.ForEach(m => {
        if (nomineeRole.Permissions == null)
          nomineeRole.Permissions = "";

        if (!nomineeRole.Permissions.Contains((char)m)) {
          nomineeRole.Permissions += (char)m;
        }
      });

      if (await userManager.FindByNameAsync(Constants.NOMINEE_USERNAME) == null) {
        Nominee nomineeUser = new Nominee {
          FullName = "nominee user",
          Email = Constants.NOMINEE_EMAIL,
          UserName = Constants.NOMINEE_USERNAME,
          NormalizedEmail = Constants.NOMINEE_EMAIL.ToUpper(),
          NormalizedUserName = Constants.NOMINEE_USERNAME.ToUpper(),
          ProfileImage = S3File.FromKeyAndUrl("", "")
        };

        IdentityResult result = await userManager.CreateAsync(nomineeUser, Constants.NOMINEE_PASSWORD);
        if (result.Succeeded) {
          await userManager.AddToRoleAsync(nomineeUser, PredefinedRoles.Nominee.ToString());
        }

        var allowedModules = new SystemModules[] { SystemModules.Nominee };
        var modules = allowedModules[0];
        for (int i = 1; i < allowedModules.Length; i++) {
          modules |= allowedModules[i];
        }

        //adds allowed modules for user
        await db.UserModules.AddAsync(new UserModule(nomineeUser.Id, modules));
      }
    }

    private static async Task SeedJudgeUsers(RoleManager<AppRole> roleManager, UserManager<AppUser> userManager,
      IAppUnitOfWork db) {
      if (await roleManager.FindByNameAsync(PredefinedRoles.Judge.ToString()) == null) {
        await roleManager.CreateAsync(
          new AppRole(PredefinedRoles.Judge.ToString()) {
            Name = PredefinedRoles.Judge.ToString(),
            NormalizedName = PredefinedRoles.Judge.ToString().ToUpper()
          });

      }

      Permissions[] judgePermissions = new Permissions[]
      {
        Permissions.ViewJudgedArtworks,
        Permissions.UpdateArtworkVote,
        Permissions.UpdateArtworkFinalThoughts,
        Permissions.AddCommentToArtworkVideo,
        Permissions.RemoveCommentToArtworkVideo,
      };

      var judgeRole = await roleManager.FindByNameAsync(PredefinedRoles.Judge.ToString());
      judgePermissions.ForEach(m => {
        if (judgeRole.Permissions == null)
          judgeRole.Permissions = "";

        if (!judgeRole.Permissions.Contains((char)m)) {
          judgeRole.Permissions += (char)m;
        }
      });
      for (int j = 2; j < 5; j++) {
        if (await userManager.FindByNameAsync(Constants.JUDGE_USERNAME + j) == null) {
          Judge judgeUser = new Judge {
            FullName = "judge user " + j,
            Email = Constants.JUDGE_EMAIL + j,
            UserName = Constants.JUDGE_USERNAME + j,
            NormalizedEmail = Constants.JUDGE_EMAIL.ToUpper() + j,
            NormalizedUserName = Constants.JUDGE_USERNAME.ToUpper() + j,
            ProfileImage = S3File.FromKeyAndUrl("", "")
          };

          IdentityResult result = await userManager.CreateAsync(judgeUser, Constants.JUDGE_PASSWORD);
          if (result.Succeeded) {
            await userManager.AddToRoleAsync(judgeUser, PredefinedRoles.Judge.ToString());
          }

          var allowedModules = new SystemModules[] { SystemModules.Judge };
          var modules = allowedModules[0];
          for (int i = 1; i < allowedModules.Length; i++) {
            modules |= allowedModules[i];
          }

          //adds allowed modules for user
          await db.UserModules.AddAsync(new UserModule(judgeUser.Id, modules));
        }

      }
    }

    private static async Task SeedContactUsMessageSubjectsAsync(IAppUnitOfWork db) {
      List<ContactUsSubject> dbItems = db.ContactUsSubjects.ToList();
      if (dbItems.Any())
        return;
      var filename = "./seed/contact_us_subjects.json";
      if (File.Exists(filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          var items = new List<ContactUsSubject>();
          string json = r.ReadToEnd();
          var deserializedItems = JsonConvert.DeserializeObject<List<ContactUsSubject>>(json);

          foreach (var c in deserializedItems) {
            var country = dbItems.FirstOrDefault(a => a.Name == c.Name);
            if (country != null) continue;
            items.Add(c);
          }

          if (items.Any()) {
            await db.ContactUsSubjects.AddRangeAsync(items);
          }
        }
      }
    }

    private static async Task SeedDemoArtworks(IAppUnitOfWork db, IS3FileManager fileManager) {
      var artworksCount = db.Artworks.Count();
      if (artworksCount >= 30) return;

      var _faker_en = new Faker("en");
      var _faker_ar = new Faker("ar");
      var awards = db.Awards.ToArray();
      var client = new HttpClient();

      for (int i = 0; i < 30; i++) {
        var artwork = new Artwork {
          AwardId = _faker_en.Random.ArrayElement(awards).Id,
          //FileCount = 3,
          UploadComplete = true,
        };

        await db.Artworks.AddAsync(artwork);
        var file = await client.GetAsync(_faker_en.Image.PicsumUrl(400, 600));
        var fileStream = await file.Content.ReadAsStreamAsync();

        var posterKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, artwork.Id, artwork.Id + ".jpg");
        var posterUrl = await fileManager.UploadFileAsync(fileStream, posterKey);

        //artwork.PosterUrl = posterUrl;
        //artwork.PosterKey = posterKey;

        var trailerKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, artwork.Id, artwork.Id + ".mp4");
        var trailerUrl = await fileManager.UploadFileAsync(fileStream, posterKey);

        //artwork.TrailerUrl = trailerUrl;
        //artwork.TrailerKey = trailerKey;

        db.Artworks.Update(artwork);
      }

    }

    private static async Task SeedDemoNews(IAppUnitOfWork db, IS3FileManager fileManager) {
      var _faker_en = new Faker("en");
      var _faker_ar = new Faker("ar");
      string[] keywords = _faker_en.Random.WordsArray(10);

      //TODO remove in production
      var newsCount = db.News.Count();
      if (newsCount >= 20) return;

      for (int i = 0; i < 20; i++) {

        var news = new News {
          Keywords = string.Join(" ", _faker_ar.Random.ArrayElements(keywords, 4)),
          Title = LocalizedData.FromBoth(_faker_ar.Lorem.Sentence(), _faker_en.Lorem.Sentence()),
          Body = LocalizedData.FromBoth(_faker_ar.Lorem.Paragraph(), _faker_en.Lorem.Paragraph()),
          Date = _faker_en.Date.Past().ToUnixTimeSeconds(),
          Category = _faker_en.Random.Word(),
          Outdated = _faker_en.Random.Bool(),
          Poster = S3File.FromKeyAndUrl("", ""),
          Featured = _faker_ar.Random.Bool(),
          Comments = Enumerable.Range(0, _faker_en.Random.Number(10)).Select(a => new NewsComment {
            Comments = _faker_ar.Lorem.Paragraph(),
            Date = _faker_ar.Date.Past().ToUnixTimeSeconds(),
            Name = _faker_ar.Internet.UserName(),
            Email = _faker_ar.Internet.Email(),
            IsApproved = _faker_ar.Random.Bool(),
            Title = _faker_ar.Lorem.Sentence(),
          }).ToHashSet()
        };

        await db.News.AddAsync(news);
        await db.CommitTransactionAsync();

        var client = new HttpClient();
        var file = await client.GetAsync(_faker_en.Image.PicsumUrl(400, 600));
        var fileStream = await file.Content.ReadAsStreamAsync();

        var imageKey = fileManager.GenerateFileKeyForResource(ResourceType.News, news.Id, news.Id + ".jpg");
        var imageUrl = await fileManager.UploadFileAsync(fileStream, imageKey);

        news.Poster = S3File.FromKeyAndUrl(imageKey, imageUrl);

        db.News.Update(news);
      }
    }

    private static async Task SeedDemoGallery(IAppUnitOfWork db, IS3FileManager fileManager) {
      var galleryDir = "./seed/gallery";
      if (!Directory.Exists(galleryDir)) return;

      var mainAlbum = db.Albums.FirstOrDefault(a => a.MainGallery);
      if (mainAlbum == null) {
        mainAlbum = new Album {
          MainGallery = true,
          Title = LocalizedData.FromBoth("البوم صور جوائز ميا", "Mia Award photo album"),
        };

        await db.Albums.AddAsync(mainAlbum);
      }

      var allFiles = Directory.GetFiles(galleryDir);
      var vidFiles = allFiles.Where(a => a.GetFileExt() == ".mp4").ToArray();
      var vidFilesWithoutExt = vidFiles.Select(a => a.GetFileNameWithoutExt()).ToArray();
      //skip video posters
      var otherFiles = allFiles.Where(a => !vidFilesWithoutExt.Contains(a.GetFileNameWithoutExt())).ToArray();
      var _listFiles = vidFiles.Concat(otherFiles).ToArray();
      var allItems = db.AlbumItems.Count();
      if (allItems == _listFiles.Length) return;


      foreach (var file in _listFiles) {
        var type = file.GetFileExt() == ".mp4" ? MediaType.Video : MediaType.Image;
        var url = "";
        var posterUrl = "";
        if (type == MediaType.Image) {
          url = file;
        } else {
          url = file;
          posterUrl = allFiles.FirstOrDefault(a =>
            a.GetFileNameWithoutExt() == file.GetFileNameWithoutExt() && a.GetFileExt() != ".mp4");
        }

        var item = new AlbumItem {
          Title = LocalizedData.FromBoth("اعلام جديد", "New Media"),
          AlbumId = mainAlbum.Id,
          Featured = true,
          DateCreated = DateTime.Now.ToUnixTimeSeconds(),
          MediaType = type,
          File = S3File.FromKeyAndUrl("", ""),
          Poster = S3File.FromKeyAndUrl("", "")
        };

        //just some items
        if (db.AlbumItems.Count() > 15) break;

        await db.AlbumItems.AddAsync(item);
        await db.CommitTransactionAsync();

        var client = new HttpClient();
        client.Timeout = TimeSpan.FromMinutes(5);
        using (var sFile = new FileStream(url, FileMode.Open)) {
          var fileKey =
            fileManager.GenerateFileKeyForResource(ResourceType.Album, mainAlbum.Id, item.Id + url.GetFileExt());
          var fileUrl = await fileManager.UploadFileAsync(sFile, fileKey);

          item.File = S3File.FromKeyAndUrl(fileKey, fileUrl);
        }

        if (type == MediaType.Video) {
          using (var sFile = new FileStream(posterUrl, FileMode.Open)) {
            var posterFileKey =
              fileManager.GenerateFileKeyForResource(ResourceType.Album, mainAlbum.Id,
                item.Id + posterUrl.GetFileExt());
            var posterFileUrl = await fileManager.UploadFileAsync(sFile, posterFileKey);

            item.Poster = S3File.FromKeyAndUrl(posterFileKey, posterFileUrl);
          }
        }

        db.AlbumItems.Update(item);
      }

    }

    /// <summary>
    /// Seed db with default admin role
    /// </summary>
    /// <param name="roleManager">Rolemanager instance to create default roles</param>
    /// <returns></returns>
    private static async Task SeedAdminRoleAndPermissions(RoleManager<AppRole> roleManager, IAppUnitOfWork db) {

      var adminRole = await roleManager.FindByNameAsync(PredefinedRoles.Administrator.ToString());
      adminRole.Permissions = "";

      var allPermissions = Enum.GetValues(typeof(Permissions));
      foreach (var p in allPermissions) {
        adminRole.Permissions += (char)((Permissions)p);
      }
    }

    private static async Task SeedDefaultSystemOptions(IAppUnitOfWork db) {
      var options = db.SystemOptions.FirstOrDefault();
      if (options == null) {
        options = new SystemOptions();
        await db.SystemOptions.AddAsync(options);
      }
    }

    private static async Task SeedDefaultRoles(RoleManager<AppRole> roleManager, IAppUnitOfWork db) {
      var roles = Enum.GetNames(typeof(PredefinedRoles));
      foreach (var role in roles) {
        if (await roleManager.FindByNameAsync(role.ToString().ToLower()) == null) {
          await roleManager.CreateAsync(
            new AppRole(role) {
              Name = role.ToString().ToLower(),
              NormalizedName = role.ToString().ToUpper(),
              Permissions = ""
            });
        }
      }
    }

    /// <summary>
    /// Seed db with default admin user
    /// </summary>
    /// <param name="userManager">Usermanager instance to create default users</param>
    /// <returns></returns>
    private static async Task SeedAdminUserAsync(UserManager<AppUser> userManager, IAppUnitOfWork db) {
      if (await userManager.FindByNameAsync(Constants.ADMIN_USERNAME) == null) {
        AppUser admin = new AppUser {
          FullName = "System admin",
          Email = Constants.ADMIN_EMAIL,
          UserName = Constants.ADMIN_USERNAME,
          NormalizedEmail = Constants.ADMIN_EMAIL.ToUpper(),
          NormalizedUserName = Constants.ADMIN_USERNAME.ToUpper(),
          ProfileImage = S3File.FromKeyAndUrl("", "")
        };

        IdentityResult result = await userManager.CreateAsync(admin, Constants.ADMIN_PASSWORD);
        if (result.Succeeded) {
          var addUserToRoleResult = await userManager.AddToRoleAsync(admin, PredefinedRoles.Administrator.ToString());
          if (addUserToRoleResult.Succeeded) {
            var allowedModules = new SystemModules[]
            {
              SystemModules.Dashboard,
              SystemModules.Booths,
              SystemModules.Admin,
              SystemModules.Judge
            };
            var modules = allowedModules[0];
            for (int i = 1; i < allowedModules.Length; i++) {
              modules |= allowedModules[i];
            }

            //adds allowed modules for user
            await db.UserModules.AddAsync(new UserModule(admin.Id, modules));
          }
        }
      }
    }

    private static async Task SeedGenres(IAppUnitOfWork db) {
      List<Genre> genres = db.Genres.ToList();
      var filename = "./seed/genres.json";
      if (File.Exists(filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          var newGenre = new List<Genre>();
          string json = r.ReadToEnd();
          var listGenres = new List<Genre>();
          JArray array = JArray.Parse(json);
          foreach (JToken j in array) {
            listGenres.Add(new Genre {
              Code = ((JValue)j["Code"]).Value<string>(),
              Name = LocalizedData.FromDictionary((JObject)j["Name"]),
            });
          }

          foreach (var genre in listGenres) {
            var _genre = genres.FirstOrDefault(a => a.Code == genre.Code);
            if (_genre != null) continue;
            newGenre.Add(genre);
          }

          if (newGenre.Any()) {
            await db.Genres.AddRangeAsync(newGenre);
          }
        }
      }
    }

    private static async Task SeedArtowrkSubjectRole(IAppUnitOfWork db) {
      List<ArtworkSubject> genres = db.ArtworkSubjects.ToList();
      var filename = "./seed/artworkSubjectRoles.json";
      if (File.Exists(filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          var newGenre = new List<ArtworkSubject>();
          string json = r.ReadToEnd();
          var listGenres = new List<ArtworkSubject>();
          JArray array = JArray.Parse(json);
          foreach (JToken j in array) {
            listGenres.Add(new ArtworkSubject {
              Code = ((JValue)j["Code"]).Value<string>(),
              Name = LocalizedData.FromDictionary((JObject)j["Name"]),
            });
          }

          foreach (var genre in listGenres) {
            var _subject = genres.FirstOrDefault(a => a.Code == genre.Code);
            if (_subject != null) continue;
            newGenre.Add(genre);
          }

          if (newGenre.Any()) {
            await db.ArtworkSubjects.AddRangeAsync(newGenre);
          }
        }
      }
    }

    private static async Task SeedAwards(IAppUnitOfWork db, HtmlEncoder encoder) {
      List<Award> awards = db.Awards.ToList();
      var filename = "./seed/awards.json";
      if (File.Exists(filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          var newAwards = new List<Award>();
          string json = r.ReadToEnd();
          var listAwards = new List<Award>();
          JArray array = JArray.Parse(json);
          foreach (JToken j in array) {
            listAwards.Add(new Award {
              Code = ((JValue)j["Code"]).Value<string>(),
              AwardType = (AwardType)Enum.Parse(typeof(AwardType), ((JValue)j["AwardType"]).Value<string>()),
              ArtworkFee = ((JValue)j["ArtworkFee"]).Value<decimal>(),
              Trophy = S3File.FromKeyAndUrl(((JValue)j["TrophyImageKey"]).Value<string>(),
                ((JValue)j["TrophyImageUrl"]).Value<string>()),
              Order = ((JValue)j["Order"]).Value<int>(),
              Title = LocalizedData.FromDictionary((JObject)j["Title"]),
              Description = LocalizedData.FromDictionary((JObject)j["Description"]),
            });
          }

          foreach (var award in listAwards) {
            var _award = awards.FirstOrDefault(a => a.Code == award.Code);
            if (_award != null) continue;
            newAwards.Add(award);
          }

          if (newAwards.Any()) {
            await db.Awards.AddRangeAsync(newAwards);
          }
        }
      }
    }

    private static async Task SeedNews(IAppUnitOfWork db, HtmlEncoder encoder, IS3FileManager fileManager) {
      List<News> allNews = db.News.ToList();
      var filename = "./seed/news/news.json";
      if (File.Exists(filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          var newNews = new List<News>();
          string json = r.ReadToEnd();
          var listNews = new List<News>();
          JArray array = JArray.Parse(json);
          foreach (JToken j in array) {
            listNews.Add(new News {
              Date = ((JValue)j["Date"]).Value<long>(),
              Outdated = ((JValue)j["Outdated"]).Value<bool>(),
              Poster = S3File.FromKeyAndUrl(((JValue)j["PosterId"]).Value<string>(),
                ((JValue)j["PosterUrl"]).Value<string>()),
              Featured = ((JValue)j["Featured"]).Value<bool>(),
              Category = ((JValue)j["Category"]).Value<string>(),
              Keywords = ((JValue)j["Keywords"]).Value<string>(),
              Title = LocalizedData.FromDictionary((JObject)j["Title"]),
              Body = LocalizedData.FromDictionary((JObject)j["Body"]),
            });
          }

          foreach (var news in listNews) {
            var _news = allNews.FirstOrDefault(a => a.Title.InEnglish() == news.Title.InEnglish());
            if (_news != null) continue;

            var imageFile = "";
            if (File.Exists($"./seed/news/{news.Poster.FileKey}.jpg")) {
              imageFile = $"./seed/news/{news.Poster.FileKey}.jpg";
            }

            await db.News.AddAsync(news);

            using (var placeholder_image = new MemoryStream(File.ReadAllBytes(imageFile))) {
              var imageKey = fileManager.GenerateFileKeyForResource(ResourceType.News, news.Id, news.Id + ".jpg");
              var imageUrl = await fileManager.UploadFileAsync(placeholder_image, imageKey);
              news.Poster = S3File.FromKeyAndUrl(imageKey, imageUrl);
            }
          }

        }
      }
    }


    private static async Task SeedBoothUserAndRoleAsync(
      RoleManager<AppRole> roleManager,
      UserManager<AppUser> userManager,
      IAppUnitOfWork db) {

      var boothRole = await roleManager.FindByNameAsync(PredefinedRoles.BoothAgent.ToString());
      if (boothRole.Permissions == null) {
        boothRole.Permissions = "";
      }

      //(this is an example only)
      Permissions[] boothPermissions = new Permissions[]
      {
        Permissions.BoothRead,
        Permissions.BoothAddNew,
        Permissions.BoothRemove,
        Permissions.BoothPayment,
      };

      boothPermissions.ForEach(m => {
        if (!boothRole.Permissions.Contains((char)m)) {
          boothRole.Permissions += (char)m;
        }
      });

      if (await userManager.FindByNameAsync(Constants.BOOTH_USERNAME) == null) {
        AppUser boothUser = new AppUser {
          FullName = "booth user",
          Email = Constants.BOOTH_EMAIL,
          UserName = Constants.BOOTH_USERNAME,
          NormalizedEmail = Constants.BOOTH_EMAIL.ToUpper(),
          NormalizedUserName = Constants.BOOTH_USERNAME.ToUpper(),
          ProfileImage = S3File.FromKeyAndUrl("", "")
        };

        IdentityResult result = await userManager.CreateAsync(boothUser, Constants.BOOTH_PASSWORD);
        if (result.Succeeded) {
          await userManager.AddToRoleAsync(boothUser, PredefinedRoles.BoothAgent.ToString());

          //add allowed modules (this is an example only)
          var allowedModules = new SystemModules[] { SystemModules.Booths };
          var modules = allowedModules[0];
          for (int i = 1; i < allowedModules.Length; i++) {
            modules |= allowedModules[i];
          }

          //adds allowed modules for user
          await db.UserModules.AddAsync(new UserModule(boothUser.Id, modules));
        }
      }

    }


    private static async Task SeedFilterAndUploadUserAndRoleAsync(
      RoleManager<AppRole> roleManager,
      UserManager<AppUser> userManager,
      IAppUnitOfWork db) {

      var filterAndUploadRole = await roleManager.FindByNameAsync(PredefinedRoles.FilterUploads.ToString());
      if (filterAndUploadRole.Permissions == null) {
        filterAndUploadRole.Permissions = "";
      }

      Permissions[] permissions = new Permissions[]
      {
        Permissions.ArtworkApprove,
        Permissions.ArtworkListBasicData,
      };

      permissions.ForEach(m => {
        if (!filterAndUploadRole.Permissions.Contains((char)m)) {
          filterAndUploadRole.Permissions += (char)m;
        }
      });

      if (await userManager.FindByNameAsync(Constants.FILTER_AGENT_USERNAME) == null) {
        AppUser filterUser = new AppUser {
          FullName = "filter user",
          Email = Constants.FILTER_AGENT_EMAIL,
          UserName = Constants.FILTER_AGENT_USERNAME,
          NormalizedEmail = Constants.FILTER_AGENT_EMAIL.ToUpper(),
          NormalizedUserName = Constants.FILTER_AGENT_USERNAME.ToUpper(),
          ProfileImage = S3File.FromKeyAndUrl("", "")
        };

        IdentityResult result = await userManager.CreateAsync(filterUser, Constants.FILTER_AGENT_PASSWORD);
        if (result.Succeeded) {
          await userManager.AddToRoleAsync(filterUser, PredefinedRoles.FilterUploads.ToString());

          //add allowed modules (this is an example only)
          var allowedModules = new SystemModules[] { SystemModules.Admin };
          var modules = allowedModules[0];
          for (int i = 1; i < allowedModules.Length; i++) {
            modules |= allowedModules[i];
          }

          //adds allowed modules for user
          await db.UserModules.AddAsync(new UserModule(filterUser.Id, modules));
        }
      }
    }

    private static async Task SeedVotingCriterias(IAppUnitOfWork db) {
      List<VotingCriteria> criterias = db.VotingCriterias.ToList();
      var listAwards = db.Awards.ToList();

      var filename = "./seed/voting_criteria.json";
      if (File.Exists(filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          var newItem = new List<VotingCriteria>();
          string json = r.ReadToEnd();
          var listCriterias = new List<VotingCriteria>();
          JArray array = JArray.Parse(json);
          foreach (JToken j in array) {
            var item = new VotingCriteria {
              Code = ((JValue)j["Code"]).Value<string>(),
              Name = ((JValue)j["Name"]).Value<string>(),
              Level = (JudgeLevel)((JValue)j["Level"]).Value<int>(),
              Weight = ((JValue)j["Weight"]).Value<decimal>(),
              Order = ((JValue)j["Order"]).Value<int>()
            };

            //AwardCode
            var awardCode = ((JValue)j["AwardCode"]).Value<string>();
            if (awardCode != "") {
              var _award = listAwards.FirstOrDefault(a => a.Code == awardCode);
              if (_award != null) {
                item.AwardId = _award.Id;
              }
            }

            listCriterias.Add(item);
          }

          foreach (var item in listCriterias) {
            var _item = criterias.FirstOrDefault(a => a.Code == item.Code);
            if (_item != null) continue;
            newItem.Add(item);
          }

          if (newItem.Any()) {
            await db.VotingCriterias.AddRangeAsync(newItem);
          }
        }
      }
    }
  }
}