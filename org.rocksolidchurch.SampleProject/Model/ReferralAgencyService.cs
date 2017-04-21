using System;
using System.Linq;

using Rock.Data;

namespace org.rocksolidchurch.SampleProject.Model
{
    /// <summary>
    /// ReferralAgency Service class.
    /// </summary>
    public class ReferralAgencyService : Service<ReferralAgency>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ReferralAgencyService"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        public ReferralAgencyService( RockContext context ) : base( context ) { }

        /// <summary>
        /// Determines whether this instance can delete the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns>
        ///   <c>true</c> if this instance can delete the specified item; otherwise, <c>false</c>.
        /// </returns>
        public bool CanDelete( ReferralAgency item, out string errorMessage )
        {
            errorMessage = string.Empty;
            return true;
        }

    }
}
