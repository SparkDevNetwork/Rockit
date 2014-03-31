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
        public BookService() : base() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="BookService"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        public BookService( SampleProjectContext context ) : base( context ) { }

        /// <summary>
        /// Determines whether this instance can delete the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns>
        ///   <c>true</c> if this instance can delete the specified item; otherwise, <c>false</c>.
        /// </returns>
        public bool CanDelete( Book item, out string errorMessage )
        {
            errorMessage = string.Empty;
            return true;
        }

    }
}
