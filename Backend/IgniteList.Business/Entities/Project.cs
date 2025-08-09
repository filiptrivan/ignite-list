using Microsoft.AspNetCore.Builder;
using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.Attributes.Entity.Translation;
using Spiderly.Shared.Attributes.Entity.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IgniteList.Business.Entities
{
    [DoNotAuthorize]
    public class Project : BusinessObject<long>
    {
        [BlobName]
        [TranslateEn("Logo")]
        public string LogoBlobName { get; set; }

        [StringLength(75, MinimumLength = 1)]
        [Required]
        [TranslateEn("Project Name")]
        public string ProjectName { get; set; }

        [StringLength(100, MinimumLength = 1)]
        public string Link { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.TextArea))]
        [StringLength(500, MinimumLength = 1)]
        public string Description { get; set; }

        [Required]
        public int UpvoteCount { get; set; }

        [Required]
        [WithMany(nameof(User.Projects))]
        [UIControlType(nameof(UIControlTypeCodes.Dropdown))]
        [UIDoNotGenerate] 
        public virtual User User { get; set; }

        public virtual List<User> UpvotedUsers { get; } = new();

        [UIControlType(nameof(UIControlTypeCodes.MultiSelect))]
        [TranslateEn("Select your categories")]
        public virtual List<Category> Categories { get; } = new();
    }
}
