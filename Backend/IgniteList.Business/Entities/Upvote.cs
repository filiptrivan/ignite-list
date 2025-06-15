using Spiderly.Security.Entities;
using Spiderly.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IgniteList.Business.Entities
{
    public class Upvote
    {
        [M2MMaintanceEntity(nameof(User.UpvotedProjects))]
        public virtual UserExtended User { get; set; }

        [M2MEntity(nameof(Project.UpvotedUsers))]
        public virtual Project Project { get; set; }
    }
}
