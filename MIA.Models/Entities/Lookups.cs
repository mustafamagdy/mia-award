using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class ContactUsSubject : Lookup { }
  public class Country : Lookup { }
  public class ProductionYear : Lookup { }
  public class Genre : Lookup {
    /*
      - برنامج مسابقات 
      - البرنامج جماهيري 
      - برامج مناظرات 
      - برامج مقابلات 
      - برامج شخصية 
      - حديث مباشر 
      - برامج تغطية ميدانية 
      - عمل درامي 
      - انتاج وثائقي 
      - مجلة تلفزيونية 
      - ندوة تلفزيونية 
    */
    public HashSet<Artwork> Artworks { get; set; }

  }

  public class ArtworkSubject : Lookup {
    /*
    1.	مذيع 
    2.	مخرج
    3.	معد ومنتج
    4.	كاتب سينارو
    5.	مصور
    6.	مبتكر قوالب 
    7.	موسيقى
    8.	مصمم برومو
    */

    public HashSet<Artwork> Artworks { get; set; }
  }
}