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

      await SeedRole_Admin_Permissions(roleManager, db);
      await SeedRole_BoothAgent_Permissions(roleManager, userManager, db);
      await SeedRole_Filter_Permissions(roleManager, userManager, db);
      await SeedRole_Judge_Permissions(roleManager, userManager, db);
      await SeedRole_JudgeManager_Permissions(roleManager, userManager, db);
      await SeedRole_Nominee_Permissions(roleManager, userManager, db);
      
      await SeedAdminUserAsync(userManager, db);

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
        await SeedVotingCriterias(db);
      }

      await db.CommitTransactionAsync();
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

    private static async Task SeedRole_Admin_Permissions(RoleManager<AppRole> roleManager, IAppUnitOfWork db) {

      var adminRole = await roleManager.FindByNameAsync(PredefinedRoles.Administrator.ToString());
      adminRole.Permissions = "";

      var allPermissions = Enum.GetValues(typeof(Permissions));
      foreach (var p in allPermissions) {
        adminRole.Permissions += (char)((Permissions)p);
      }
    }

    private static async Task SeedRole_Judge_Permissions(RoleManager<AppRole> roleManager, UserManager<AppUser> userManager, IAppUnitOfWork db) {

      var role = await roleManager.FindByNameAsync(PredefinedRoles.Judge.ToString());
      if (role.Permissions == null) {
        role.Permissions = "";
      }

      Permissions[] roleDefaultPermissions = new[]
      {
        Permissions.ReadAward,
        Permissions.ReadArtwork,
        Permissions.ViewJudgedArtworks,
        Permissions.UpdateArtworkVote,
        Permissions.UpdateArtworkFinalThoughts,
        Permissions.AddCommentToArtworkVideo,
        Permissions.RemoveCommentToArtworkVideo,
        Permissions.ReadArtworkWithAllFiles,
        Permissions.ViewAssignedArtworks,
        Permissions.ViewArtworkScore,
        Permissions.ViewMyArtworkStatistics,
        Permissions.ViewArtworkJudgeDetails,

      };

      roleDefaultPermissions.ForEach(m => {
        if (!role.Permissions.Contains((char)m)) {
          role.Permissions += (char)m;
        }
      });
    }

    private static async Task SeedRole_JudgeManager_Permissions(RoleManager<AppRole> roleManager, UserManager<AppUser> userManager, IAppUnitOfWork db) {

      var role = await roleManager.FindByNameAsync(PredefinedRoles.JudgeManager.ToString());
      if (role.Permissions == null) {
        role.Permissions = "";
      }

      Permissions[] roleDefaultPermissions = new[]
      {
        Permissions.ReadAward,
        Permissions.ReadArtwork,
        Permissions.ManageJudges,
        Permissions.ViewMyJudges,
        Permissions.ViewArtworkScore,
        Permissions.ViewAllArtworkStatistics,
        Permissions.ViewArtworkJudgeDetails,
      };

      roleDefaultPermissions.ForEach(m => {
        if (!role.Permissions.Contains((char)m)) {
          role.Permissions += (char)m;
        }
      });
    }

    private static async Task SeedRole_BoothAgent_Permissions(RoleManager<AppRole> roleManager, UserManager<AppUser> userManager, IAppUnitOfWork db) {

      var boothRole = await roleManager.FindByNameAsync(PredefinedRoles.BoothAgent.ToString());
      if (boothRole.Permissions == null) {
        boothRole.Permissions = "";
      }

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
    }

    private static async Task SeedRole_Filter_Permissions(RoleManager<AppRole> roleManager, UserManager<AppUser> userManager, IAppUnitOfWork db) {

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
    }

    private static async Task SeedRole_Nominee_Permissions(RoleManager<AppRole> roleManager, UserManager<AppUser> userManager, IAppUnitOfWork db) {

      var filterAndUploadRole = await roleManager.FindByNameAsync(PredefinedRoles.Nominee.ToString());
      if (filterAndUploadRole.Permissions == null) {
        filterAndUploadRole.Permissions = "";
      }

      Permissions[] permissions = new Permissions[]
      {
        Permissions.NomineeAccess,
      };

      permissions.ForEach(m => {
        if (!filterAndUploadRole.Permissions.Contains((char)m)) {
          filterAndUploadRole.Permissions += (char)m;
        }
      });
    }


    private static async Task SeedAdminUserAsync(UserManager<AppUser> userManager, IAppUnitOfWork db) {
      if (await userManager.FindByNameAsync(Constants.ADMIN_USERNAME) == null) {
        AppUser admin = new AppUser {
          FullName = "System admin",
          Email = Constants.ADMIN_EMAIL,
          UserName = Constants.ADMIN_USERNAME,
          NormalizedEmail = Constants.ADMIN_EMAIL.ToUpper(),
          NormalizedUserName = Constants.ADMIN_USERNAME.ToUpper(),
          ProfileImage = S3File.FromKeyAndUrl("", ""),
          LockoutEnabled = false
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

    #region Content

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

    #endregion

  }
}