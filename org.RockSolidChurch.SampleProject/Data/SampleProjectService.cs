using Rock.Data;

namespace org.RockSolidChurch.SampleProject.Data
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class SampleProjectService<T> : Rock.Data.Service<T> where T : Rock.Data.Entity<T>, new()
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DocumentationService{T}"/> class.
        /// </summary>
        public SampleProjectService()
            : base( new EFRepository<T>( new SampleProjectContext() ) )
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="DocumentationService{T}"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        public SampleProjectService( SampleProjectContext context )
            : base( new EFRepository<T>( context ) )
        {

        }
    }
}
