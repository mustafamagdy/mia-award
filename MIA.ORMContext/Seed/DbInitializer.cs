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

namespace MIA.ORMContext.Seed
{
    public class DbInitializer
    {

        /// <summary>
        /// Seed database with default required data
        /// </summary>
        /// <param name="userManager">Usermanager instance to create default users</param>
        /// <param name="roleManager">Rolemanager instance to create default roles</param>
        /// <returns></returns>
        public static async Task SeedDbAsync(
          UserManager<AppUser> userManager,
          RoleManager<AppRole> roleManager,
          IAppUnitOfWork db)
        {

            await SeedAdminRoleAndPermissions(roleManager, db);
            await SeedAdminUserAsync(userManager);
            await SeedCategoriesAsync(db);
            await db.CommitTransactionAsync();
        }


        /// <summary>
        /// Seed db with default admin role
        /// </summary>
        /// <param name="roleManager">Rolemanager instance to create default roles</param>
        /// <returns></returns>
        private static async Task SeedAdminRoleAndPermissions(RoleManager<AppRole> roleManager, IAppUnitOfWork db)
        {
            if (await roleManager.FindByNameAsync(Constants.ADMIN_ROLE) == null)
            {
                await roleManager.CreateAsync(
                  new AppRole
                  {
                      Name = Constants.ADMIN_ROLE,
                      NormalizedName = Constants.ADMIN_ROLE.ToUpper()
                  });

                var adminRole = await roleManager.FindByNameAsync(Constants.ADMIN_ROLE);
                if (adminRole.Permissions == null)
                {
                    adminRole.Permissions = "";
                }

                if (!adminRole.Permissions.Contains((char)Permissions.AccessAll))
                {
                    adminRole.Permissions += (char)Permissions.AccessAll;
                }

            }
        }

        /// <summary>
        /// Seed db with default admin user
        /// </summary>
        /// <param name="userManager">Usermanager instance to create default users</param>
        /// <returns></returns>
        private static async Task SeedAdminUserAsync(UserManager<AppUser> userManager)
        {
            if (await userManager.FindByNameAsync(Constants.ADMIN_USERNAME) == null)
            {
                AppUser admin = new AppUser
                {
                    FirstName = "System",
                    LastName = "Admin",
                    Email = Constants.ADMIN_EMAIL,
                    UserName = Constants.ADMIN_USERNAME,
                    NormalizedEmail = Constants.ADMIN_EMAIL.ToUpper(),
                    NormalizedUserName = Constants.ADMIN_USERNAME.ToUpper(),
                };

                IdentityResult result = await userManager.CreateAsync(admin, Constants.ADMIN_PASSWORD);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, Constants.ADMIN_ROLE);
                }
            }
        }

        private static async Task SeedCategoriesAsync(IAppUnitOfWork db)
        {
            List<Category> categorires = db.Categories.ToList();
            if (categorires.Any())
                return; 
            var filename = "categories_all.json";
            if (File.Exists("./" + filename))
            {
                using (StreamReader r = new StreamReader(filename))
                {
                    var newCategories = new List<Category>();
                    string json = r.ReadToEnd();
                    var listCountries = JsonConvert.DeserializeObject<List<Category>>(json);


                    foreach (var c in listCountries)
                    {
                        var country = categorires.FirstOrDefault(a => a.Title == c.Title);
                        if (country != null) continue;
                        newCategories.Add(c);
                    }
                    if (newCategories.Any())
                    {
                        await db.Categories.AddRangeAsync(newCategories);
                    }
                }
            }
        }

    }
}