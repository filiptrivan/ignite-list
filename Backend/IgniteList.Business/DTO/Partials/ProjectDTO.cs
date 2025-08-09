using Spiderly.Shared.Attributes.Entity.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IgniteList.Business.DTO
{
    public partial class ProjectDTO
    {
        [UIDoNotGenerate]
        public bool? HasUpvoted { get; set; }
    }
}
