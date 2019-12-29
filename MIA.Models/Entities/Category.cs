namespace MIA.Models.Entities
{
    public class Category : BaseEntity<string>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public CategoryImage Image { get; set; }

    }
}