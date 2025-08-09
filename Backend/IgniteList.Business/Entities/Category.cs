using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.Attributes.Entity.UI;
using Spiderly.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IgniteList.Business.Entities
{
    public class Category : BusinessObject<long>
    {
        [StringLength(75, MinimumLength = 1)]
        [DisplayName]
        public string Name { get; set; }

        public virtual List<Project> Projects { get; } = new();
    }
}
