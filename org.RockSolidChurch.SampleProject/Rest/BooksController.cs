using System.Linq;
using System.Net;
using System.Web.Http;

using org.RockSolidChurch.SampleProject.Model;

using Rock.Rest;
using Rock.Rest.Filters;

namespace org.RockSolidChurch.SampleProject.Rest
{
    /// <summary>
    /// 
    /// </summary>
    public class BooksController : ApiController<Book>
    {
        public BooksController() : base( new BookService( new Data.SampleProjectContext() ) ) { }
    }
}
