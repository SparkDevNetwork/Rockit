using org.RockSolidChurch.SampleProject.Data;
using Rock.Model;

namespace org.RockSolidChurch.SampleProject.Model
{
    /// <summary>
    /// 
    /// </summary>
    public class BookService : SampleProjectService<Book>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BookService"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        public BookService( SampleProjectContext context ) : base( context ) { }

    }
}
