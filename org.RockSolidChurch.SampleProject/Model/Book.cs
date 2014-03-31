using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Runtime.Serialization;

using org.RockSolidChurch.Data;

using Rock.Data;
using Rock.Model;

namespace org.RockSolidChurch.SampleProject.Model
{
    /// <summary>
    /// An book
    /// </summary>
    [Table( "_org_RockSolidChurch_SampleProject_Book" )]
    [DataContract]
    public class Book : org.RockSolidChurch.Data.Model<Book>
    {
    }

    #region Entity Configuration

    /// <summary>
    /// 
    /// </summary>
    public partial class BookConfiguration : EntityTypeConfiguration<Book>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BookConfiguration"/> class.
        /// </summary>
        public BookConfiguration()
        {
        }
    }

    #endregion

}
