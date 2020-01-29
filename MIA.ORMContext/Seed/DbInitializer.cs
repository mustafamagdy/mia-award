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

namespace MIA.ORMContext.Seed {
  public class DbInitializer {

    /// <summary>
    /// Seed database with default required data
    /// </summary>
    /// <param name="userManager">Usermanager instance to create default users</param>
    /// <param name="roleManager">Rolemanager instance to create default roles</param>
    /// <returns></returns>
    public static async Task SeedDbAsync(
      UserManager<AppUser> userManager,
      RoleManager<AppRole> roleManager,
      IS3FileManager s3FileManager,
      IAppUnitOfWork db) {

      await SeedAdminRoleAndPermissions(roleManager, db);
      await SeedAdminUserAsync(userManager);
      await SeedCategoriesAsync(db);
      
      //await SeedAwards(db, s3FileManager);
      //await SeedDemoNews(db, s3FileManager);
      //await SeedDemoGallery(db, s3FileManager);
      //await SeedDemoArtworks(db, s3FileManager);

      await SeedDemoUserAndRoleAsync(roleManager, userManager, db);
      await db.CommitTransactionAsync();
    }

    private static async Task SeedAwards(IAppUnitOfWork db, IS3FileManager fileManager) {
      var awards = new Dictionary<string, LocalizedData> {
        { "drama", LocalizedData.FromBoth("دراما","Drama") },
        { "sports", LocalizedData.FromBoth("رياضة","Sports") },
        { "comedy", LocalizedData.FromBoth("كوميدي","comedy") },
        { "political", LocalizedData.FromBoth("سياسة","Political") },
        { "economic", LocalizedData.FromBoth("اقتصادي","Economic") },
        { "talkshow", LocalizedData.FromBoth("حواري","Talkshow") },
        { "competition", LocalizedData.FromBoth("تنافسي","Competition") },
        { "human", LocalizedData.FromBoth("انساني","Human") }
      };
      var client = new HttpClient();
      var _faker_en = new Faker("en");

      foreach (var _award in awards) {
        var award = db.Awards.FirstOrDefault(a => a.Code.ToLower() == _award.Key.ToLower());
        if (award == null) {
          award = new Award {
            Code = _award.Key.ToLower(),
            Title = _award.Value,
            Description = _award.Value,
            TrophyImageKey = "",
            TrophyImageUrl = ""
          };

          await db.Awards.AddAsync(award);
          var file = await client.GetAsync(_faker_en.Image.PicsumUrl(400, 600));
          var fileStream = await file.Content.ReadAsStreamAsync();

          var imageKey = fileManager.GenerateFileKeyForResource(ResourceType.Awards, award.Id, award.Code + ".jpg");
          var imageUrl = await fileManager.UploadFileAsync(fileStream, imageKey);

          award.TrophyImageUrl = imageUrl;
          award.TrophyImageKey = imageKey;

          db.Awards.Update(award);
        }
      }
    }

    private static async Task SeedDemoArtworks(IAppUnitOfWork db, IS3FileManager fileManager) {
      var artworksCount = db.ArtWorks.Count();
      if (artworksCount >= 30) return;

      var _faker_en = new Faker("en");
      var _faker_ar = new Faker("ar");
      var awards = db.Awards.ToArray();
      var client = new HttpClient();

      for (int i = 0; i < 30; i++) {
        var artwork = new ArtWork {
          AwardId = _faker_en.Random.ArrayElement(awards).Id,
          FileCount = 3,
          UploadComplete = true,
        };

        await db.ArtWorks.AddAsync(artwork);
        var file = await client.GetAsync(_faker_en.Image.PicsumUrl(400, 600));
        var fileStream = await file.Content.ReadAsStreamAsync();

        var posterKey = fileManager.GenerateFileKeyForResource(ResourceType.Artwork, artwork.Id, artwork.Id + ".jpg");
        var posterUrl = await fileManager.UploadFileAsync(fileStream, posterKey);

        //artwork.PosterUrl = posterUrl;
        //artwork.PosterKey = posterKey;

        var trailerKey = fileManager.GenerateFileKeyForResource(ResourceType.Artwork, artwork.Id, artwork.Id + ".mp4");
        var trailerUrl = await fileManager.UploadFileAsync(fileStream, posterKey);

        //artwork.TrailerUrl = trailerUrl;
        //artwork.TrailerKey = trailerKey;

        db.ArtWorks.Update(artwork);
      }

    }

    private static async Task SeedDemoNews(IAppUnitOfWork db, IS3FileManager fileManager) {
      var _faker_en = new Faker("en");
      var _faker_ar = new Faker("ar");
      string[] keywords = _faker_en.Random.WordsArray(10);

      string[] categories = Enum.GetNames(typeof(NewsCategory)).Select(a => a.ToLower()).ToArray();

      //TODO remove in production
      var newsCount = db.News.Count();
      if (newsCount >= 20) return;

      for (int i = 0; i < 20; i++) {

        var news = new News {
          Keywords = string.Join(" ", _faker_ar.Random.ArrayElements(keywords, 4)),
          Title = LocalizedData.FromBoth(_faker_ar.Lorem.Sentence(), _faker_en.Lorem.Sentence()),
          Body = LocalizedData.FromBoth(_faker_ar.Lorem.Paragraph(), _faker_en.Lorem.Paragraph()),
          Date = _faker_en.Date.Past().ToUnixTimeSeconds(),
          Category = _faker_en.Random.ArrayElement(categories),
          Outdated = _faker_en.Random.Bool(),
          PosterUrl = "",
          Featured = _faker_ar.Random.Bool(),
          Comments = Enumerable.Range(0, _faker_en.Random.Number(10)).Select(a => new NewsComment {
            Comments = _faker_ar.Lorem.Paragraph(),
            Date = _faker_ar.Date.Past().ToUnixTimeSeconds(),
            Name = _faker_ar.Internet.UserName(),
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

        news.PosterUrl = imageUrl;
        news.PosterId = imageKey;

        db.News.Update(news);
      }
    }
    private static async Task SeedDemoGallery(IAppUnitOfWork db, IS3FileManager fileManager) {
      var _faker_en = new Faker("en");

      //TODO remove in production
      var mainAlbum = db.Albums.FirstOrDefault(a => a.MainGallery);
      if (mainAlbum == null) {
        mainAlbum = new Album {
          MainGallery = true,
          Title = "MAIN ALBUM"
        };

        await db.Albums.AddAsync(mainAlbum);
      }

      var itemsCount = db.AlbumItems.Where(a => a.Album.MainGallery).Count();
      if (itemsCount >= 30) return;
      string[] random_videos = new string[] {
        "https://mia-temp-files.s3.amazonaws.com/v1.mp4",
        "https://mia-temp-files.s3.amazonaws.com/v2.mp4",
        "https://mia-temp-files.s3.amazonaws.com/v3.mp4",
        "https://mia-temp-files.s3.amazonaws.com/v4.mp4",
        "https://mia-temp-files.s3.amazonaws.com/v5.mp4",
        "https://mia-temp-files.s3.amazonaws.com/v6.mp4",
      };

      for (int i = 0; i < 30; i++) {

        var type = _faker_en.Random.Enum<MediaType>();
        var url = "";
        var posterUrl = "";
        if (type == MediaType.Image) {
          url = _faker_en.Image.PicsumUrl(600, 400);
        } else {
          url = _faker_en.Random.ArrayElement(random_videos);
          posterUrl = _faker_en.Image.PicsumUrl(600, 400);
        }

        var item = new AlbumItem {
          AlbumId = mainAlbum.Id,
          Featured = _faker_en.Random.Bool(),
          Order = i + 1,
          DateCreated = DateTime.Now.ToUnixTimeSeconds(),
          MediaType = type,
          FileKey = "",
          FileUrl = "",
          PosterKey = "",
          PosterUrl = ""
        };

        await db.AlbumItems.AddAsync(item);
        await db.CommitTransactionAsync();

        var client = new HttpClient();
        client.Timeout = TimeSpan.FromMinutes(5);
        if (type == MediaType.Image) {
          var file = await client.GetAsync(url);
          var fileStream = await file.Content.ReadAsStreamAsync();

          var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.Album, mainAlbum.Id, item.Id + ".jpg");
          var fileUrl = await fileManager.UploadFileAsync(fileStream, fileKey);

          item.FileUrl = fileUrl;
          item.FileKey = fileKey;
        } else if (type == MediaType.Video) {

          //var sour
          //var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.Album, mainAlbum.Id, item.Id + ".mp4");
          //var fileUrl = await fileManager.UploadFileAsync(fileStream, fileKey);

          //item.FileUrl = fileUrl;
          //item.FileKey = fileKey;

         

          var posterFile = await client.GetAsync(posterUrl);
          var posterFileStream = await posterFile.Content.ReadAsStreamAsync();
          var posterFileKey = fileManager.GenerateFileKeyForResource(ResourceType.Album, mainAlbum.Id, item.Id + ".jpg");
          var posterFileUrl = await fileManager.UploadFileAsync(posterFileStream, posterFileKey);

          item.PosterUrl = posterFileUrl;
          item.PosterKey = posterFileKey;
        }



        db.AlbumItems.Update(item);
      }

    }

    private static async Task SeedDemoUserAndRoleAsync(
      RoleManager<AppRole> roleManager,
      UserManager<AppUser> userManager,
      IAppUnitOfWork db) {

      if (await roleManager.FindByNameAsync(Constants.DEMO_ROLE) == null) {
        await roleManager.CreateAsync(
          new AppRole {
            Name = Constants.DEMO_ROLE,
            NormalizedName = Constants.DEMO_ROLE.ToUpper()
          });

        var demoRole = await roleManager.FindByNameAsync(Constants.DEMO_ROLE);
        if (demoRole.Permissions == null) {
          demoRole.Permissions = "";
        }

        //(this is an example only)
        Permissions[] demoPermissions = new Permissions[] {
          Permissions.NewsRead,
          Permissions.NewsAddNew,
          Permissions.NewsRemove,
          Permissions.AddUserToRole,
          Permissions.ReadRolePermissions,
          Permissions.RemoveUserFromRole,
          Permissions.RemoveUserFromRole,
        };

        demoPermissions.ForEach(m => {
          if (!demoRole.Permissions.Contains((char)m)) {
            demoRole.Permissions += (char)m;
          }
        });
      }


      if (await userManager.FindByNameAsync(Constants.DEMO_USERNAME) == null) {
        AppUser demoUser = new AppUser {
          FirstName = "Demo",
          LastName = "User",
          Email = Constants.DEMO_EMAIL,
          UserName = Constants.DEMO_USERNAME,
          NormalizedEmail = Constants.DEMO_EMAIL.ToUpper(),
          NormalizedUserName = Constants.DEMO_USERNAME.ToUpper(),
        };

        IdentityResult result = await userManager.CreateAsync(demoUser, Constants.DEMO_PASSWORD);
        if (result.Succeeded) {
          await userManager.AddToRoleAsync(demoUser, Constants.DEMO_ROLE);

          //add allowed modules (this is an example only)
          var allowedModules = new SystemModules[] { SystemModules.News, SystemModules.Adminstration };
          var modules = allowedModules[0];
          for (int i = 1; i < allowedModules.Length; i++) {
            modules |= allowedModules[i];
          }

          //adds allowed modules for user
          await db.UserModules.AddAsync(new UserModule(demoUser.Id, modules));
        }
      }

    }


    /// <summary>
    /// Seed db with default admin role
    /// </summary>
    /// <param name="roleManager">Rolemanager instance to create default roles</param>
    /// <returns></returns>
    private static async Task SeedAdminRoleAndPermissions(RoleManager<AppRole> roleManager, IAppUnitOfWork db) {
      if (await roleManager.FindByNameAsync(Constants.ADMIN_ROLE) == null) {
        await roleManager.CreateAsync(
          new AppRole {
            Name = Constants.ADMIN_ROLE,
            NormalizedName = Constants.ADMIN_ROLE.ToUpper()
          });

        var adminRole = await roleManager.FindByNameAsync(Constants.ADMIN_ROLE);
        if (adminRole.Permissions == null) {
          adminRole.Permissions = "";
        }

        if (!adminRole.Permissions.Contains((char)Permissions.AccessAll)) {
          adminRole.Permissions += (char)Permissions.AccessAll;
        }

      }
    }

    /// <summary>
    /// Seed db with default admin user
    /// </summary>
    /// <param name="userManager">Usermanager instance to create default users</param>
    /// <returns></returns>
    private static async Task SeedAdminUserAsync(UserManager<AppUser> userManager) {
      if (await userManager.FindByNameAsync(Constants.ADMIN_USERNAME) == null) {
        AppUser admin = new AppUser {
          FirstName = "System",
          LastName = "Admin",
          Email = Constants.ADMIN_EMAIL,
          UserName = Constants.ADMIN_USERNAME,
          NormalizedEmail = Constants.ADMIN_EMAIL.ToUpper(),
          NormalizedUserName = Constants.ADMIN_USERNAME.ToUpper(),
        };

        IdentityResult result = await userManager.CreateAsync(admin, Constants.ADMIN_PASSWORD);
        if (result.Succeeded) {
          await userManager.AddToRoleAsync(admin, Constants.ADMIN_ROLE);
        }
      }
    }

    private static async Task SeedCategoriesAsync(IAppUnitOfWork db) {
      List<Award> awards = db.Awards.ToList();
      if (awards.Any())
        return;
      var filename = "all_awards.json";
      if (File.Exists("./" + filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          var newCategories = new List<Award>();
          string json = r.ReadToEnd();
          var listCountries = JsonConvert.DeserializeObject<List<Award>>(json);


          foreach (var c in listCountries) {
            var country = awards.FirstOrDefault(a => a.Title == c.Title);
            if (country != null) continue;
            newCategories.Add(c);
          }
          if (newCategories.Any()) {
            await db.Awards.AddRangeAsync(newCategories);
          }
        }
      }
    }

  }
}