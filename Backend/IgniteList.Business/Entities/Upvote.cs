using Spiderly.Security.Entities;
using Spiderly.Shared.Attributes.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IgniteList.Business.Entities
{
    [M2M]
    public class Upvote
    {
        [M2MWithMany(nameof(User.UpvotedProjects))]
        public virtual User User { get; set; }

        [M2MWithMany(nameof(Project.UpvotedUsers))]
        public virtual Project Project { get; set; }
    }
}
