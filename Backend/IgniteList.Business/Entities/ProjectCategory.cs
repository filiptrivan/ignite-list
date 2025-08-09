using Spiderly.Shared.Attributes.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IgniteList.Business.Entities
{
    [M2M]
    public class ProjectCategory
    {
        [M2MWithMany(nameof(Project.Categories))]
        public virtual Project Project { get; set; }

        [M2MWithMany(nameof(Category.Projects))]
        public virtual Category Category { get; set; }
    }
}
