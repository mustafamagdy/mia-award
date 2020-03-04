using MIA.Authorization.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MIA.ORMContext
{
  public class Constants
  {
    internal const string ADMIN_USERNAME = "admin";
    internal const string ADMIN_EMAIL = "admin@email.com";
    internal const string ADMIN_PASSWORD = "admin@123456.com";
    public static readonly string ADMIN_ROLE = PredefinedRoles.Administrator.ToString();

    internal const string DEMO_USERNAME = "demo";
    internal const string DEMO_EMAIL = "demo@email.com";
    internal const string DEMO_PASSWORD = "demo@123456.com";
    public static readonly string DEMO_ROLE = PredefinedRoles.Demo.ToString();

    internal const string NOMINEE_USERNAME = "nominee1";
    internal const string NOMINEE_EMAIL = "nominee1@email.com";
    internal const string NOMINEE_PASSWORD = "nominee@123456.com";
    public static readonly string NOMINEE_ROLE = PredefinedRoles.Nominee.ToString();

    internal const string JUDGE_USERNAME = "judge";
    internal const string JUDGE_EMAIL = "judge@email.com";
    internal const string JUDGE_PASSWORD = "judge@123456.com";
    public const string JUDGE_ROLE = "judge";

    internal const int MAX_50 = 50;
    internal const int MAX_100 = 100;
    internal const int MAX_500 = 500;
    internal const int MAX_1000 = 1000;
    internal const int MAX_2000 = 2000;
  }
}
