using System.Linq;
using System.Net;
using System.Web.Http;

using org.rocksolidchurch.SampleProject.Model;

using Rock.Rest;
using Rock.Rest.Filters;

namespace org.rocksolidchurch.SampleProject.Rest
{
    /// <summary>
    /// REST API for Referral Agencies
    /// </summary>
    public class ReferralAgenciesController : ApiController<ReferralAgency>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ReferralAgenciesController"/> class.
        /// </summary>
        public ReferralAgenciesController() : base( new ReferralAgencyService( new Rock.Data.RockContext() ) ) { }
    }
}
