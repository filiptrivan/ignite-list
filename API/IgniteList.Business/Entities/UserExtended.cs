using Microsoft.EntityFrameworkCore;
using Spiderly.Security.Entities;
using Spiderly.Security.Interfaces;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Attributes.EF;
using Spiderly.Shared.Attributes.EF.Translation;
using Spiderly.Shared.Attributes.EF.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace IgniteList.Business.Entities
{
    [Index(nameof(Email), IsUnique = true)]
    [DoNotAuthorize]
    public class UserExtended : BusinessObject<long>, IUser
    {
        [UIDoNotGenerate]
        [UIControlWidth("col-12")]
        [DisplayName]
        [CustomValidator("EmailAddress()")]
        [StringLength(70, MinimumLength = 5)]
        [Required]
        public string Email { get; set; }

        [StringLength(75, MinimumLength = 1)]
        public string Name { get; set; }

        [GreaterThanOrEqualTo(0)]
        public int Age { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.TextArea))]
        [StringLength(500, MinimumLength = 1)]

        public string Description { get; set; }

        public bool? HasLoggedInWithExternalProvider { get; set; }

        public bool? IsDisabled { get; set; }

        [ExcludeServiceMethodsFromGeneration]
        public virtual List<Role> Roles { get; } = new();

        public virtual List<Notification> Notifications { get; } = new();

        public virtual List<Project> Projects { get; } = new();

        public virtual List<Project> UpvotedProjects{ get; } = new();


    }
}
