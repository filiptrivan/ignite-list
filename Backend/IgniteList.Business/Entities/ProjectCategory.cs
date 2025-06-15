using Spiderly.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IgniteList.Business.Entities
{
    public class ProjectCategory
    {
        [M2MMaintanceEntity(nameof(Project.Categories))]
        public virtual Project Project { get; set; }

        [M2MEntity(nameof(Category.Projects))]
        public virtual Category Category { get; set; }
    }
}
